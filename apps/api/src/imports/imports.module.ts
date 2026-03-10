import { Module } from '@nestjs/common';
import { ImportsController } from './imports.controller';
import { CustomersImporterService } from './customers/customers-importer.service';

@Module({
  controllers: [ImportsController],
  providers: [CustomersImporterService],
})
export class ImportsModule {}
