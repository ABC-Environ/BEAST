import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const role = await prisma.role.upsert({
    where: { name: 'Admin' },
    create: { name: 'Admin', permissions: ['*'] },
    update: {},
  });

  const org = await prisma.organization.upsert({
    where: { externalId: 'org_default' },
    create: { externalId: 'org_default', name: 'Default Org' },
    update: { name: 'Default Org' },
  });

  const passwordHash = await argon2.hash('ChangeMe123!');
  await prisma.user.upsert({
    where: { organizationId_email: { organizationId: org.id, email: 'admin@beast.local' } },
    create: {
      organizationId: org.id,
      roleId: role.id,
      email: 'admin@beast.local',
      passwordHash,
      firstName: 'BEAST',
      lastName: 'Admin',
    },
    update: { passwordHash },
  });
}

main().finally(async () => prisma.$disconnect());
