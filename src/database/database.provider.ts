import { createConnection } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'LOCAL_CONNECTION',
    useFactory: async (config: ConfigService) =>
      await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'waso_db',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
  {
    provide: 'EXTERNAL_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mssql',
        host: 'localhost',
        port: 1433,
        username: 'root',
        password: 'root',
        database: 'erp_aquasistemas',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];
