import { Module } from '@nestjs/common';
import { GhEquipmentService } from './gh-equipment.service';
import { GhEquipmentController } from './gh-equipment.controller';
import { DatabaseModule } from '../../../database/database.module';
import { ghEquipmentProviders } from './gh-equipment.provider';
import { customerEquipmentProviders } from '../../../customer-equipment/customer-equipment.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...ghEquipmentProviders,
    ...customerEquipmentProviders,
    GhEquipmentService
  ],
  controllers: [GhEquipmentController]
})
export class GhEquipmentModule {}
