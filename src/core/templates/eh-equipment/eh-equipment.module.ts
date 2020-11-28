import { Module } from '@nestjs/common';
import { EhEquipmentService } from './eh-equipment.service';
import { EhEquipmentController } from './eh-equipment.controller';
import { DatabaseModule } from '../../../database/database.module';
import { ehEquipmentProviders } from './eh-equipment.provider';
import { customerEquipmentProviders } from '../../../customer-equipment/customer-equipment.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...ehEquipmentProviders,
    ...customerEquipmentProviders,
    EhEquipmentService
  ],
  controllers: [EhEquipmentController]
})
export class EhEquipmentModule {}
