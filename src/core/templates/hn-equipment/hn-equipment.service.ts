import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository, Transaction, TransactionManager, EntityManager } from 'typeorm';
import { Status } from '../../../common/status.enum';

import { HnEquipment } from './local/hn-equipment.entity';
import { HnComplementaryData } from './local/hn-complementary-data.entity';
import { HnTechnicalReport } from './local/hn-technical-report.entity';
import { OrderType } from 'src/core/order-type/local/order-type.entity';
import { CustomerEquipment } from '../../../customer-equipment/local/customer-equipment.entity';

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
        private hntrRepository: Repository<HnTechnicalReport>,
        @Inject('CUSTOMER_EQUIPMENT_REPOSITORY')
        private custEquipmentRepository: Repository<CustomerEquipment>
    ) { }

    async get(order_id: string): Promise<HnEquipment[]> {

        const hnEquipment: HnEquipment[] = await this.hneRespository.find({
            where: { order: order_id, status: Status.ACTIVE },
            relations: ['order', 'order.order_type', 'equipment', 'hn_technical_report', 'hn_complementary_data']
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

        // Buscar el tipo de orden y crear en la tabla customer_equipments en caso sea un servicio de instalación
        if (hneDTO.hn_equipment.order.order_type.description === 'Instalación') {

            const customerEquipmentCreated = await this.custEquipmentRepository.save({
                customer_id: hneDTO.hn_equipment.order.customer_id,
                equipment: hneDTO.hn_equipment.equipment
            });

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
            relations: ['order', 'order.order_type', 'equipment', 'hn_technical_report', 'hn_complementary_data']
        });

        if (!hnEquipmentDb) {
            throw new NotFoundException('The requested resource was not found');
        }

        const hncdDeleted = await this.hncdRepository.delete(hnEquipmentDb.hn_complementary_data.id);
        const hntrDeleted = await this.hntrRepository.delete(hnEquipmentDb.hn_technical_report.id);
        const hneDeleted = await this.hneRespository.delete(hnEquipmentDb.id);

        if (hnEquipmentDb.order.order_type.description === 'Instalación') {

            // TODO: obtener la orden que originó la instalación de este equipo al cliente
            const customerEquipment = await this.custEquipmentRepository.find({
                where: {
                    customer_id: hnEquipmentDb.order.customer_id,
                    equipment: hnEquipmentDb.equipment
                }
            });

            const customerEquipmentDeleted = await this.custEquipmentRepository.delete(customerEquipment[0].id);
        }

        return hnEquipmentDb;

    }
}
