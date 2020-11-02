import { Module } from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { QuotationController } from './quotation.controller';
import { quotationProviders } from './quotation.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...quotationProviders,
    QuotationService
  ],
  controllers: [QuotationController]
})
export class QuotationModule {}
