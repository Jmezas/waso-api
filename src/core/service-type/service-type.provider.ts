import { Connection } from "typeorm";
import { ServiceType } from './local/service-type.entity';

export const serviceTypeProviders = [
    {
        provide: 'SERVICE_TYPE_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(ServiceType),
        inject: ['A_LOCAL_CONNECTION'],
    },
];