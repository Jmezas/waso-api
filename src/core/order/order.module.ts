import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { orderProviders } from './order.provider';
import { userProviders } from '../../user/user.provider';
import { hnEequipmentProviders } from '../templates/hn-equipment/hn-equipment.provider';

import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...orderProviders, 
    ...userProviders, 
    ...hnEequipmentProviders,
    OrderService
  ],
  controllers: [OrderController]
})
export class OrderModule {}
