import { Connection } from 'typeorm';

// Entities
import { HnEquipment } from './local/hn-equipment.entity';
import { HnComplementaryData } from './local/hn-complementary-data.entity';
import { HnTechnicalReport } from './local/hn-technical-report.entity';


export const hnEequipmentProviders = [
    {
        provide: 'HN_EQUIPMENT_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(HnEquipment),
        inject: ['A_LOCAL_CONNECTION'],
    },
    {
        provide: 'HN_COMPLEMENTARY_DATA_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(HnComplementaryData),
        inject: ['A_LOCAL_CONNECTION'],
    },
    {
        provide: 'HN_TECHNICAL_REPORT_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(HnTechnicalReport),
        inject: ['A_LOCAL_CONNECTION'],
    },
];