import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';

// Providers
import { OrderService } from './order.service';
import { orderProviders } from './order.provider';
import { userProviders } from '../../user/user.provider';
import { hnEequipmentProviders } from '../templates/hn-equipment/hn-equipment.provider';
import { customerEquipmentProviders } from '../../customer-equipment/customer-equipment.provider';

// Controllers
import { OrderController } from './order.controller';

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
