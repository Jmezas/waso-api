import { Connection } from 'typeorm';
import { Equipment } from './local/equipment.entity';

export const equipmentProviders = [
    {
        provide: 'EQUIPMENT_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Equipment),
        inject: ['A_LOCAL_CONNECTION'],
    },
];