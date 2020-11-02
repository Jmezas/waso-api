import { Connection } from 'typeorm';
import { Quotation } from './local/quotation.entity';

export const quotationProviders = [
    {
        provide: 'QUOTATION_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Quotation),
        inject: ['A_LOCAL_CONNECTION']
    }
];