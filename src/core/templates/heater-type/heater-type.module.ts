import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../database/database.module';
import { heaterTypeProviders } from './heater-type.provider';
import { HeaterTypeService } from './heater-type.service';
import { HeaterTypeController } from './heater-type.controller';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...heaterTypeProviders,
        HeaterTypeService
    ],
    controllers: [HeaterTypeController]
})
export class HeaterTypeModule {}
