import { Connection, Repository } from 'typeorm';
import { Customer } from './external/customer.entity';

export const customerProviders = [
  {
    provide: 'CUSTOMER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Customer),
    inject: ['EXTERNAL_CONNECTION'],
  },
];
