import { Module } from '@nestjs/common';
import { QuotationDetailService } from './quotation-detail.service';
import { DatabaseModule } from '../../database/database.module';
import { quotationDetailProviders } from './quotation-detail.provider';
import { QuotationDetailController } from './quotation-detail.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...quotationDetailProviders,
    QuotationDetailService
  ],
  controllers: [QuotationDetailController],
})
export class QuotationDetailModule {}
