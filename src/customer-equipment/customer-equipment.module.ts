import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { customerEquipmentProviders } from './customer-equipment.provider';
import { CustomerEquipmentService } from './customer-equipment.service';
import { CustomerEquipmentController } from './customer-equipment.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...customerEquipmentProviders, CustomerEquipmentService],
  controllers: [CustomerEquipmentController]
})
export class CustomerEquipmentModule {}
