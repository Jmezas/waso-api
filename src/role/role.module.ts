import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { DatabaseModule } from '../database/database.module';
import { RoleService } from './role.service';
import { roleProviders } from './role.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...roleProviders, RoleService],
  controllers: [RoleController]
})
export class RoleModule {}
