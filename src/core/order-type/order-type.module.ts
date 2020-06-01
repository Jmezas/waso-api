import { Module } from '@nestjs/common';
import { OrderTypeService } from './order-type.service';
import { orderTypeProviders } from './order-type.provider';
import { OrderTypeController } from './order-type.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...orderTypeProviders, OrderTypeService],
  controllers: [OrderTypeController]
})
export class OrderTypeModule {}
