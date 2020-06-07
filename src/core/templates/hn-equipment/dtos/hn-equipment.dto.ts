import { HnEquipment } from '../local/hn-equipment.entity';
import { HnComplementaryData } from '../local/hn-complementary-data.entity';
import { HnTechnicalReport } from '../local/hn-technical-report.entity';


export class HnEquipmentDTO {

    hn_equipment: HnEquipment;

    hn_complementary_data?: HnComplementaryData;

    hn_technical_report?: HnTechnicalReport;

}