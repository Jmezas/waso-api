import { Connection } from 'typeorm';
import { HeaterType } from './local/heater-type.entity';

export const heaterTypeProviders = [
    {
        provide: 'HEATER_TYPE_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(HeaterType),
        inject: ['A_LOCAL_CONNECTION'],
    }
];