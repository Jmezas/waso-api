import { HnEquipment } from '../local/hn-equipment.entity';
import { HnTechnicalReport } from '../local/hn-technical-report.entity';
import { HnComplementaryData } from '../local/hn-complementary-data.entity';


export class HnEquipmentDTO {

    hn_equipment: HnEquipment;

    hn_technical_report?: HnTechnicalReport;

    hn_complementary_data?: HnComplementaryData;

}