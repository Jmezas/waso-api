import { Connection } from 'typeorm';
import { Material } from './local/material.entity';
import { MaterialExt } from './external/material.entity';
import { MaterialTemp } from './local/material_temp.entity';

export const materialProviders = [
    {
        provide: 'MATERIAL_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Material),
        inject: ['A_LOCAL_CONNECTION'],
    },
    {
        provide: 'MATERIAL_TEMP_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(MaterialTemp),
        inject: ['A_LOCAL_CONNECTION'],
    },
    {
        provide: 'MATERIAL_EXT_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(MaterialExt),
        inject: ['EXTERNAL_CONNECTION'],
    },
];