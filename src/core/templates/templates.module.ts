import { Module } from '@nestjs/common';
import { HnEquipmentModule } from './hn-equipment/hn-equipment.module';
import { SmEquipmentModule } from './sm-equipment/sm-equipment.module';
import { MpEquipmentModule } from './mp-equipment/mp-equipment.module';
import { GhEquipmentModule } from './gh-equipment/gh-equipment.module';
import { HeaterTypeModule } from './heater-type/heater-type.module';

@Module({
  imports: [
    HnEquipmentModule,
    SmEquipmentModule,
    MpEquipmentModule,
    GhEquipmentModule,
    HeaterTypeModule
  ]
})
export class TemplatesModule {}
