import { Connection } from 'typeorm';
import { CustomerEquipment } from './local/customer-equipment.entity';

export const customerEquipmentProviders = [
    {
        provide: 'CUSTOMER_EQUIPMENT_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(CustomerEquipment),
        inject: ['A_LOCAL_CONNECTION'],
    },
];
