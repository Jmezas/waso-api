import { Connection, Repository } from 'typeorm';
import { Role } from './local/role.entity';

export const roleProviders = [
  {
    provide: 'ROLE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Role),
    inject: ['LOCAL_CONNECTION'],
  },
];
