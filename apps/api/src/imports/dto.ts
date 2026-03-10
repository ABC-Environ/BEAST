import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CustomerImportRequestDto {
  @IsString()
  path!: string;

  @IsOptional()
  @IsBoolean()
  dryRun?: boolean;
}
