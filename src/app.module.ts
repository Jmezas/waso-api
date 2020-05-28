import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { TechnicalModule } from './technical/technical.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material/material.module';
import { OrderModule } from './order/order.module';
import { DatabaseModule } from './database/database.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UserModule,
    CustomerModule,
    TechnicalModule,
    RoleModule,
    AuthModule,
    MaterialModule,
    OrderModule,
    DatabaseModule,
  ],
})
export class AppModule {}
