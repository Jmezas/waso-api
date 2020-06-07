import { Connection } from 'typeorm';
import { OrderType } from './local/order-type.entity';

export const orderTypeProviders = [
    {
        provide: 'ORDER_TYPE_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(OrderType),
        inject: ['A_LOCAL_CONNECTION'],
    },
];