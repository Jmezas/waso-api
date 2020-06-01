import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TechnicalService } from './technical.service';
import { TechnicalController } from './technical.controller';
import { technicalProviders } from './technical.provide';

@Module({
  imports: [DatabaseModule],
  providers: [...technicalProviders, TechnicalService],
  controllers: [TechnicalController]
})
export class TechnicalModule {}
