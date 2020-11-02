import { Connection } from "typeorm";
import { QuotationDetail } from './local/quotation-detail.entity';

export const quotationDetailProviders = [
    {
        provide: 'QUOTATION_DETAIL_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(QuotationDetail),
        inject: ['A_LOCAL_CONNECTION']
    }
];