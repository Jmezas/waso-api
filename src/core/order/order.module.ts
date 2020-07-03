import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { orderProviders } from './order.provider';
import { userProviders } from '../../user/user.provider';
import { hnEequipmentProviders } from '../templates/hn-equipment/hn-equipment.provider';

import { DatabaseModule } from '../../database/database.module';
import { customerEquipmentProviders } from 'src/customer-equipment/customer-equipment.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...orderProviders, 
    ...userProviders, 
    ...hnEequipmentProviders,
    ...customerEquipmentProviders,
    OrderService
  ],
  controllers: [OrderController]
})
export class OrderModule {}
