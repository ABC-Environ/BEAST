import { Body, Controller, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CustomerImportRequestDto } from './dto';
import { CustomersImporterService } from './customers/customers-importer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

type AuthenticatedRequest = {
  user?: {
    orgId?: string;
  };
};

@Controller('imports')
@UseGuards(JwtAuthGuard)
export class ImportsController {
  constructor(private readonly customersImporter: CustomersImporterService) {}

  @Post('customers')
  importCustomers(@Req() req: AuthenticatedRequest, @Body() dto: CustomerImportRequestDto) {
    const organizationId = req.user?.orgId;
    if (!organizationId) throw new UnauthorizedException('Missing organization context');

    return this.customersImporter.importFromCsv(dto.path, organizationId, Boolean(dto.dryRun));
  }
}
