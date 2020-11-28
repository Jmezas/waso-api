import { Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository, Transaction, TransactionManager, EntityManager } from 'typeorm';
import { EhEquipment } from './local/eh-equipment.entity';
import { EhReviewData } from './local/eh-review-data.entity';
import { EhOperatingData } from './local/eh-operating-data.entity';
import { CustomerEquipment } from '../../../customer-equipment/local/customer-equipment.entity';
import { EhEquipmentDTO } from './dtos/eh-equipment.dto';
import { Status } from '../../../common/status.enum';

@Injectable()
export class EhEquipmentService {

    /**
     *
     */
    constructor(
        @Inject('EH_EQUIPMENT_REPOSITORY')
        private eheRepository: Repository<EhEquipment>,
        @Inject('EH_REVIEW_DATA_REPOSITORY')
        private ehrdRepository: Repository<EhReviewData>,
        @Inject('EH_OPERATING_DATA_REPOSITORY')
        private ehodRepository: Repository<EhOperatingData>,
        @Inject('CUSTOMER_EQUIPMENT_REPOSITORY')
        private custEquipmentRepository: Repository<CustomerEquipment>
    ) { }

    async get(order_id: string): Promise<EhEquipment[]> {

        const ehEquipment: EhEquipment[] = await this.eheRepository.find({
            where: { order: order_id },
            relations: ['order', 'order.order_type', 'equipment', 'heater_type', 'eh_review_data', 'eh_operating_data']
        });

        return ehEquipment;
    }

    async getByCustomer(customer_id: string, equipment_id: string): Promise<EhEquipment> {

        const ehEquipment: any = await this.eheRepository
            .createQueryBuilder('ehe')
            .innerJoinAndSelect('ehe.eh_review_data', 'ehrd')
            .innerJoinAndSelect('ehe.eh_operating_data', 'ehod')
            .innerJoinAndSelect('ehe.order', 'order')
            .innerJoinAndSelect('ehe.equipment', 'equipment')
            .innerJoinAndSelect('ehe.heater_type', 'heater_type')
            .where('order.customer = :customer_id', { customer_id })
            .andWhere('ehe.equipment = :equipment_id', { equipment_id })
            .orderBy('order.execution_date', 'DESC')
            .getOne();
        
        return ehEquipment;
    }

    @Transaction()
    async create( eheDTO: EhEquipmentDTO, @TransactionManager() manager?: EntityManager ) {

        let eheCreated = await this.eheRepository.save(eheDTO.eh_equipment);

        eheDTO.eh_review_data.eh_equipment = eheCreated;
        let ehrdCreated = await this.ehrdRepository.save(eheDTO.eh_review_data);

        eheDTO.eh_operating_data.eh_equipment = eheCreated;
        let ehodCreated = await this.ehodRepository.save(eheDTO.eh_operating_data);

        // Buscar el tipo de orden y crea en la tabla customer_equipments en caso sea un servicio de instalación
        if (eheDTO.eh_equipment.order.order_type.description === 'Instalación') {

            const custEquipmentDb: CustomerEquipment[] = await this.custEquipmentRepository.find({
                where: {
                    customer: eheDTO.eh_equipment.order.customer,
                    equipment: eheDTO.eh_equipment.equipment
                },
                order: { equipment_number: 'DESC' },
                take: 1
            });

            if ( custEquipmentDb.length > 0 ) {

                const customerEquipmentCreated = await this.custEquipmentRepository.save({
                    customer: eheDTO.eh_equipment.order.customer,
                    equipment: eheDTO.eh_equipment.equipment,
                    equipment_number: (custEquipmentDb[0].equipment_number) + 1
                });

            } else {

                const customerEquipmentCreated = await this.custEquipmentRepository.save({
                    customer: eheDTO.eh_equipment.order.customer,
                    equipment: eheDTO.eh_equipment.equipment,
                    equipment_number: 1
                });

            }
            
        }

        return {
            eheCreated,
            ehrdCreated,
            ehodCreated
        }

    }

    // TODO: desarrollar transaccionalidad de las operaciones
    async update( id: string, eheDTO: EhEquipmentDTO, @TransactionManager() manager?: EntityManager ) {

        if (!id) {
            throw new BadRequestException('The resource ID was not sent');
        }

        const ehEquipmentDb = await this.eheRepository.findOne(id, {
            where: { status: Status.ACTIVE },
            relations: ['order', 'equipment', 'heater_type', 'eh_review_data', 'eh_operating_data']
        });

        if (!ehEquipmentDb) {
            throw new NotFoundException('The requested resource was not found');
        }

        await this.eheRepository.update(id, eheDTO.eh_equipment);

        if (eheDTO.eh_review_data) {
            await this.ehrdRepository.update(ehEquipmentDb.eh_review_data.id, eheDTO.eh_review_data);
        }
        if (eheDTO.eh_operating_data) {
            await this.ehodRepository.update(ehEquipmentDb.eh_operating_data.id, eheDTO.eh_operating_data);
        }

        const ehEquipmentUpdated = await this.eheRepository.findOne(id, {
            relations: ['order', 'equipment', 'heater_type', 'eh_review_data', 'eh_operating_data']
        });

        return ehEquipmentUpdated;

    }

    // TODO: desarrollar transaccionalidad de las operaciones
    async delete( id: string ) {

        if (!id) {
            throw new BadRequestException('The resource ID was not sent');
        }

        const ehEquipmentDb = await this.eheRepository.findOne(id, {
            where: { status: Status.ACTIVE },
            relations: ['order', 'order.order_type', 'order.customer', 'equipment', 'heater_type', 'eh_review_data', 'eh_operating_data']
        });

        if (!ehEquipmentDb) {
            throw new NotFoundException('The requested resource was not found');
        }

        const ehodDeleted = await this.ehodRepository.delete(ehEquipmentDb.eh_operating_data.id);
        const ehrdDeleted = await this.ehrdRepository.delete(ehEquipmentDb.eh_review_data.id);
        const eheDeleted = await this.eheRepository.delete(ehEquipmentDb.id);

        /* TODO: Analizar con el equipo si una orden de serivicio instalación no puede eliminarse
                 Toda vez ya existan más ordenes de servicio asociadas al equipo
                 Esto para no perder el trace de las ordenes de servicio 
        */
        if (ehEquipmentDb.order.order_type.description === 'Instalación') {

            // TODO: obtener la orden que originó la instalación de este equipo al cliente
            const customerEquipment = await this.custEquipmentRepository.find({
                where: {
                    customer: ehEquipmentDb.order.customer,
                    equipment: ehEquipmentDb.equipment,
                    status: Status.ACTIVE
                }
            });

            if (customerEquipment) {
                const customerEquipmentDeleted = await this.custEquipmentRepository.delete(customerEquipment[0].id);
            }

        }

        return ehEquipmentDb;

    }

}
