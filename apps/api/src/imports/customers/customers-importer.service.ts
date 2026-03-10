import { Injectable } from '@nestjs/common';
import { parse } from 'csv-parse/sync';
import { readFileSync } from 'node:fs';
import { PrismaService } from '../../database/prisma.service';

type CustomerCsvRow = {
  external_id: string;
  type: string;
  name: string;
  email?: string;
  phone?: string;
  billing_address_line1?: string;
  billing_address_line2?: string;
  billing_city?: string;
  billing_state?: string;
  billing_postal_code?: string;
  billing_country?: string;
  notes?: string;
};

@Injectable()
export class CustomersImporterService {
  constructor(private readonly prisma: PrismaService) {}

  async importFromCsv(path: string, organizationId?: string, dryRun = false) {
    const csv = readFileSync(path, 'utf8');
    const rows = parse(csv, { columns: true, skip_empty_lines: true, trim: true }) as CustomerCsvRow[];

    const org =
      organizationId ||
      (await this.prisma.organization.findFirst({ select: { id: true } }))?.id;

    if (!org) throw new Error('organizationId is required when no organization exists');

    const rejects: Array<{ line: number; external_id?: string; errors: string[] }> = [];
    let inserted = 0;
    let updated = 0;

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const errors: string[] = [];

      if (!row.external_id) errors.push('external_id is required');
      if (!row.type) errors.push('type is required');
      if (!row.name) errors.push('name is required');

      if (errors.length > 0) {
        rejects.push({ line: i + 2, external_id: row.external_id, errors });
        continue;
      }

      if (dryRun) continue;

      const existing = await this.prisma.customer.findUnique({
        where: { organizationId_externalId: { organizationId: org, externalId: row.external_id } },
        select: { id: true },
      });

      const data = {
        type: row.type,
        name: row.name,
        email: row.email,
        phone: row.phone,
        notes: row.notes,
        billingAddress: {
          line1: row.billing_address_line1,
          line2: row.billing_address_line2,
          city: row.billing_city,
          state: row.billing_state,
          postalCode: row.billing_postal_code,
          country: row.billing_country,
        },
      };

      await this.prisma.customer.upsert({
        where: { organizationId_externalId: { organizationId: org, externalId: row.external_id } },
        create: { organizationId: org, externalId: row.external_id, ...data },
        update: data,
      });

      if (existing) updated += 1;
      else inserted += 1;
    }

    return {
      file: path,
      dryRun,
      totalRows: rows.length,
      inserted,
      updated,
      rejected: rejects.length,
      rejects,
    };
  }
}
