import { Connection } from 'typeorm';

// Entities
import { MpEquipment } from './local/mp-equipment.entity';
import { MpTechnicalReport } from './local/mp-technical-report.entity';
import { MpComplenentaryData } from './local/mp-complementary-data.entity';

export const mpEquipmentProviders = [
    {
        provide: 'MP_EQUIPMENT_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(MpEquipment),
        inject: ['A_LOCAL_CONNECTION'],
    },
    {
        provide: 'MP_TECHNICAL_REPORT_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(MpTechnicalReport),
        inject: ['A_LOCAL_CONNECTION'],
    },
    {
        provide: 'MP_COMPLEMENTARY_DATA_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(MpComplenentaryData),
        inject: ['A_LOCAL_CONNECTION'],
    },
];