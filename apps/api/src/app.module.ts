import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { JobsModule } from './jobs/jobs.module';
import { ImportsModule } from './imports/imports.module';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, CustomersModule, JobsModule, ImportsModule, AuditModule],
})
export class AppModule {}
