import { Connection } from 'typeorm';
import { GhEquipment } from './local/gh-equipment.entity';
import { GhReviewData } from './local/gh-review-data.entity';
import { GhOperatingData } from './local/gh-operating-data.entity';

export const ghEquipmentProviders = [
    {
        provide: 'GH_EQUIPMENT_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(GhEquipment),
        inject: ['A_LOCAL_CONNECTION'],
    },
    {
        provide: 'GH_REVIEW_DATA_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(GhReviewData),
        inject: ['A_LOCAL_CONNECTION'],
    },
    {
        provide: 'GH_OPERATING_DATA_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(GhOperatingData),
        inject: ['A_LOCAL_CONNECTION'],
    }
];