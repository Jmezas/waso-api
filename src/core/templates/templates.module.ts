import { Module } from '@nestjs/common';
import { HnEquipmentModule } from './hn-equipment/hn-equipment.module';
import { SmEquipmentModule } from './sm-equipment/sm-equipment.module';
import { MpEquipmentModule } from './mp-equipment/mp-equipment.module';

@Module({
  imports: [
    HnEquipmentModule,
    SmEquipmentModule,
    MpEquipmentModule
  ]
})
export class TemplatesModule {}
