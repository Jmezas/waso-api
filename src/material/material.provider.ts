import { Connection } from 'typeorm';
import { Material } from './external/material.entity';

export const materialProviders = [
    {
        provide: 'MATERIAL_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Material),
        inject: ['A_LOCAL_CONNECTION'],
    },
];