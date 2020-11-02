import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { OrderTypeModule } from './order-type/order-type.module';
import { ServiceTypeModule } from './service-type/service-type.module';
import { TemplatesModule } from './templates/templates.module';
import { QuotationModule } from './quotation/quotation.module';
import { QuotationDetailModule } from './quotation-detail/quotation-detail.module';

@Module({
  imports: [
      OrderModule, 
      OrderTypeModule, 
      ServiceTypeModule, 
      TemplatesModule, QuotationModule, QuotationDetailModule
    ]
})
export class CoreModule {}
