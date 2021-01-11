import { Connection } from 'typeorm';
import { Customer } from './local/customer.entity';
import { CustomerExt } from './external/customer.entity';
import { CustomerTemp } from './local/customer_temp.entity';

export const customerProviders = [
  {
    provide: 'CUSTOMER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Customer),
    inject: ['A_LOCAL_CONNECTION'],
  },
  {
    provide: 'CUSTOMER_TEMP_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(CustomerTemp),
    inject: ['A_LOCAL_CONNECTION'],
  },
  {
    provide: 'CUSTOMER_EXT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(CustomerExt),
    inject: ['EXTERNAL_CONNECTION'],
  },
];
