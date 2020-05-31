import { Module } from '@nestjs/common';
import { HnEquipmentModule } from './hn-equipment/hn-equipment.module';
import { SmEquipmentModule } from './sm-equipment/sm-equipment.module';

@Module({
  imports: [
    HnEquipmentModule,
    SmEquipmentModule
  ]
})
export class TemplatesModule {}
