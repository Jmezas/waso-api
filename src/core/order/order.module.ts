import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { orderProviders } from './order.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...orderProviders, OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
