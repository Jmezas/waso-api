import { Connection } from 'typeorm';
import { Technical } from './local/technical.entity';

export const technicalProviders = [
    {
        provide: 'TECHNICAL_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Technical),
        inject: ['A_LOCAL_CONNECTION'],
    },
];