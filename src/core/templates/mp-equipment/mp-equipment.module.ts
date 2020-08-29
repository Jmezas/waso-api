import { Module } from '@nestjs/common';
import { MpEquipmentService } from './mp-equipment.service';
import { MpEquipmentController } from './mp-equipment.controller';
import { DatabaseModule } from '../../../database/database.module';
import { mpEquipmentProviders } from './mp-equipment.provider';
import { customerEquipmentProviders } from 'src/customer-equipment/customer-equipment.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...mpEquipmentProviders,
    ...customerEquipmentProviders,
    MpEquipmentService
  ],
  controllers: [MpEquipmentController]
})
export class MpEquipmentModule {}
