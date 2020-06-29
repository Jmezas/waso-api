import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { orderProviders } from './order.provider';
import { userProviders } from 'src/user/user.provider';

import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...orderProviders, ...userProviders, OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
