import { Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { TechnicalModule } from './technical/technical.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material/material.module';
import { DatabaseModule } from './database/database.module';
import { EquipmentModule } from './equipment/equipment.module';
import { CustomerEquipmentModule } from './customer-equipment/customer-equipment.module';
import { CoreModule } from './core/core.module';
import configuration from './config/configuration';
// import { Moment } from 'moment';
// import moment = require('moment');
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/'),
      exclude: ['api/v1*'],
    }),
    UserModule,
    CustomerModule,
    TechnicalModule,
    RoleModule,
    AuthModule,
    MaterialModule,
    DatabaseModule,
    EquipmentModule,
    CustomerEquipmentModule,
    CoreModule
  ],
})
export class AppModule {}
