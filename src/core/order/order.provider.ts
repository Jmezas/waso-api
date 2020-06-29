import { Connection } from 'typeorm';
import { Order } from './local/order.entity';

export const orderProviders = [
    {
        provide: 'ORDER_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Order),
        inject: ['A_LOCAL_CONNECTION'],
    }
];