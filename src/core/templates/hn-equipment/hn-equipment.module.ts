import { Module } from '@nestjs/common';
import { HnEquipmentService } from './hn-equipment.service';
import { HnEquipmentController } from './hn-equipment.controller';
import { DatabaseModule } from '../../../database/database.module';
import { hnEequipmentProviders } from './hn-equipment.provider';
import { customerEquipmentProviders } from 'src/customer-equipment/customer-equipment.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...hnEequipmentProviders,
    ...customerEquipmentProviders, 
    HnEquipmentService
  ],
  controllers: [HnEquipmentController]
})
export class HnEquipmentModule {}
