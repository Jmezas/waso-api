import { Injectable, Inject } from '@nestjs/common';
import { Repository, Transaction, TransactionManager, EntityManager, Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { HnEquipment } from './local/hn-equipment.entity';
import { HnComplementaryData } from './local/hn-complementary-data.entity';
import { HnTechnicalReport } from './local/hn-technical-report.entity';

// DTO's
import { HnEquipmentDTO } from './dtos/hn-equipment.dto';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class HnEquipmentService {

    /**
     *
     */
    constructor(
        @Inject('HN_EQUIPMENT_REPOSITORY')
        private hneRespository: Repository<HnEquipment>,
        @Inject('HN_COMPLEMENTARY_DATA_REPOSITORY')
        private hncdRepository: Repository<HnComplementaryData>,
        @Inject('HN_TECHNICAL_REPORT_REPOSITORY')
        private hntrRepository: Repository<HnTechnicalReport>
    ) { }

    async get(order_id: string) {

        const hnEquipment = await this.hneRespository.find({
            where: { order: order_id },
            relations: ['hn_complementary_data', 'hn_technical_report']
        });

        return hnEquipment;

    }

    @Transaction() // TODO: desarrollar la transaccionalidad de las operaciones
    async create( hneDTO: HnEquipmentDTO, @TransactionManager() manager?: EntityManager ) {

        // let hneCreated = await manager.save(hneDTO.hn_equipment);
        let hneCreated = await this.hneRespository.save(hneDTO.hn_equipment);
        let hncdCreated = null
        let hntrCreated = null
    
        if (hneDTO.hn_complementary_data) {
            // hncdCreated = await manager.save(hneDTO.hn_complementary_data);
            hneDTO.hn_complementary_data.hn_equipment = hneCreated;
            hncdCreated = await this.hncdRepository.save(hneDTO.hn_complementary_data);
        }
    
        if (hneDTO.hn_technical_report) {
            // hntrCreated = await manager.save(hneDTO.hn_technical_report);
            hneDTO.hn_technical_report.hn_equipment = hneCreated;
            hntrCreated = await this.hntrRepository.save(hneDTO.hn_technical_report);
        }
    
        return {
            hneCreated,
            hncdCreated,
            hntrCreated
        }
    
        // console.log(hneDTO, manager);

    }
}
