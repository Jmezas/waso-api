import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { materialProviders } from './material.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...materialProviders, MaterialService],
  controllers: [MaterialController]
})
export class MaterialModule {}
