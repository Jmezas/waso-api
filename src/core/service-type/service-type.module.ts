import { Module } from '@nestjs/common';
import { ServiceTypeService } from './service-type.service';
import { ServiceTypeController } from './service-type.controller';
import { serviceTypeProviders } from './service-type.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...serviceTypeProviders, ServiceTypeService],
  controllers: [ServiceTypeController]
})
export class ServiceTypeModule {}
