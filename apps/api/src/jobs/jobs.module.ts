import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { JobsController } from './jobs.controller';

@Module({ imports: [AuthModule], controllers: [JobsController] })
export class JobsModule {}
