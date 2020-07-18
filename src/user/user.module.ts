import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProviders } from './user.provider';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [...userProviders, UserService],
  controllers: [UserController],
})
export class UserModule {}
