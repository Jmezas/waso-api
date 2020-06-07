import { Module } from '@nestjs/common';
import { HnEquipmentService } from './hn-equipment.service';
import { HnEquipmentController } from './hn-equipment.controller';
import { hnEequipmentProviders } from './hn-equipment.provider';
import { DatabaseModule } from '../../../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...hnEequipmentProviders, HnEquipmentService],
  controllers: [HnEquipmentController]
})
export class HnEquipmentModule {}
