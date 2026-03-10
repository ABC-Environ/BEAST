import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ImportsController } from './imports.controller';
import { CustomersImporterService } from './customers/customers-importer.service';

@Module({
  imports: [AuthModule],
  controllers: [ImportsController],
  providers: [CustomersImporterService],
})
export class ImportsModule {}
