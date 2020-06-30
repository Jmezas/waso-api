import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository, Transaction, TransactionManager, EntityManager, Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { HnEquipment } from './local/hn-equipment.entity';
import { HnComplementaryData } from './local/hn-complementary-data.entity';
import { HnTechnicalReport } from './local/hn-technical-report.entity';
import { Status } from 'src/common/status.enum';

// DTO's
import { HnEquipmentDTO } from './dtos/hn-equipment.dto';

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

    async get(order_id: string): Promise<HnEquipment[]> {

        const hnEquipment: HnEquipment[] = await this.hneRespository.find({
            where: { order: order_id, status: Status.ACTIVE },
            relations: ['order', 'equipment', 'hn_technical_report', 'hn_complementary_data']
        });

        return hnEquipment;

    }

    @Transaction() // TODO: desarrollar la transaccionalidad de las operaciones
    async create( hneDTO: HnEquipmentDTO, @TransactionManager() manager?: EntityManager ) {

        // let hneCreated = await manager.save(hneDTO.hn_equipment);
        let hneCreated = await this.hneRespository.save(hneDTO.hn_equipment);
        let hntrCreated = null;
        let hncdCreated = null

        if (hneDTO.hn_technical_report) {
            hneDTO.hn_technical_report.hn_equipment = hneCreated;
            hntrCreated = await this.hntrRepository.save(hneDTO.hn_technical_report);
        } else {
            let hntr = new HnTechnicalReport();
            hntr.hn_equipment = hneCreated;
            hntrCreated = await this.hntrRepository.save(hntr);
        }

        if (hneDTO.hn_complementary_data) {
            hneDTO.hn_complementary_data.hn_equipment = hneCreated;
            hncdCreated = await this.hncdRepository.save(hneDTO.hn_complementary_data);
        } else {
            let hncd = new HnComplementaryData();
            hncd.hn_equipment = hneCreated;
            hncdCreated = await this.hncdRepository.save(hncd);
        }

        return {
            hneCreated,
            hntrCreated,
            hncdCreated
        }

    }

    // TODO: desarrollar transaccionalidad de las operaciones
    async update( id: string, hnDto: HnEquipmentDTO, @TransactionManager() manager?: EntityManager ) {

        if (!id) {
            throw new BadRequestException('The resource ID was not sent');
        }

        const hnEquipmentDb = await this.hneRespository.findOne(id, {
            where: { status: Status.ACTIVE },
            relations: ['order', 'equipment', 'hn_technical_report', 'hn_complementary_data']
        });

        if (!hnEquipmentDb) {
            throw new NotFoundException('The requested resource was not found');
        }

        await this.hneRespository.update(id, hnDto.hn_equipment);

        if (hnDto.hn_technical_report) {
            await this.hntrRepository.update(hnEquipmentDb.hn_technical_report.id, hnDto.hn_technical_report);
        }
        if (hnDto.hn_complementary_data) {
            await this.hncdRepository.update(hnEquipmentDb.hn_complementary_data.id, hnDto.hn_complementary_data);
        }

        const hnEquipmentUpdated = await this.hneRespository.findOne(id, {
            relations: ['order', 'equipment', 'hn_technical_report', 'hn_complementary_data']
        });

        return hnEquipmentUpdated;

    }

    // TODO: desarrollar transaccionalidad de las operaciones
    async delete( id: string ) {

        if (!id) {
            throw new BadRequestException('The resource ID was not sent');
        }

        const hnEquipmentDb = await this.hneRespository.findOne(id, {
            where: { status: Status.ACTIVE },
            relations: ['order', 'equipment', 'hn_technical_report', 'hn_complementary_data']
        });

        if (!hnEquipmentDb) {
            throw new NotFoundException('The requested resource was not found');
        }

        let hncdDeleted = await this.hncdRepository.delete(hnEquipmentDb.hn_complementary_data.id);
        let hntrDeleted = await this.hntrRepository.delete(hnEquipmentDb.hn_technical_report.id);
        let hneDeleted = await this.hneRespository.delete(hnEquipmentDb.id);

        return hnEquipmentDb;

    }
}
