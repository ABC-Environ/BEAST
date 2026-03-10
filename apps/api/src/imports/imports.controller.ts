import { Body, Controller, Post } from '@nestjs/common';
import { CustomerImportRequestDto } from './dto';
import { CustomersImporterService } from './customers/customers-importer.service';

@Controller('imports')
export class ImportsController {
  constructor(private readonly customersImporter: CustomersImporterService) {}

  @Post('customers')
  importCustomers(@Body() dto: CustomerImportRequestDto) {
    return this.customersImporter.importFromCsv(dto.path, dto.organizationId, Boolean(dto.dryRun));
  }
}
