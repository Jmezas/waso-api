import { Connection } from 'typeorm';
import { EhEquipment } from './local/eh-equipment.entity';
import { EhReviewData } from './local/eh-review-data.entity';
import { EhOperatingData } from './local/eh-operating-data.entity';

export const ehEquipmentProviders = [
    {
        provide: 'EH_EQUIPMENT_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(EhEquipment),
        inject: ['A_LOCAL_CONNECTION'],
    },
    {
        provide: 'EH_REVIEW_DATA_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(EhReviewData),
        inject: ['A_LOCAL_CONNECTION'],
    },
    {
        provide: 'EH_OPERATING_DATA_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(EhOperatingData),
        inject: ['A_LOCAL_CONNECTION'],
    },
];