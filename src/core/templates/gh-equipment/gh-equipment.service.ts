import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository, Transaction, TransactionManager, EntityManager } from 'typeorm';
import { GhEquipment } from './local/gh-equipment.entity';
import { GhReviewData } from './local/gh-review-data.entity';
import { GhOperatingData } from './local/gh-operating-data.entity';
import { GhEquipmentDTO } from './dtos/gh-equipment.dto';
import { CustomerEquipment } from '../../../customer-equipment/local/customer-equipment.entity';
import { Status } from '../../../common/status.enum';

@Injectable()
export class GhEquipmentService {

    /**
     *
     */
    constructor(
        @Inject('GH_EQUIPMENT_REPOSITORY')
        private gheRepository: Repository<GhEquipment>,
        @Inject('GH_REVIEW_DATA_REPOSITORY')
        private ghrdRepository: Repository<GhReviewData>,
        @Inject('GH_OPERATING_DATA_REPOSITORY')
        private ghodRepository: Repository<GhOperatingData>,
        @Inject('CUSTOMER_EQUIPMENT_REPOSITORY')
        private custEquipmentRepository: Repository<CustomerEquipment>
    ) { }

    async get(order_id: string): Promise<GhEquipment[]> {

        const ghEquipment: GhEquipment[] = await this.gheRepository.find({
            where: { order: order_id },
            relations: ['order', 'order.order_type', 'equipment', 'heater_type', 'gh_review_data', 'gh_operating_data']
        });

        return ghEquipment;
    }

    async getByCustomer(customer_id: string, equipment_id: string): Promise<GhEquipment> {

        const ghEquipment: any = await this.gheRepository
            .createQueryBuilder('ghe')
            .innerJoinAndSelect('ghe.gh_review_data', 'ghrd')
            .innerJoinAndSelect('ghe.gh_operating_data', 'ghod')
            .innerJoinAndSelect('ghe.order', 'order')
            .innerJoinAndSelect('ghe.equipment', 'equipment')
            .innerJoinAndSelect('ghe.heater_type', 'heater_type')
            .where('order.customer = :customer_id', { customer_id })
            .andWhere('ghe.equipment = :equipment_id', { equipment_id })
            .orderBy('order.execution_date', 'DESC')
            .getOne();
        
        return ghEquipment;
    }

    @Transaction()
    async create( gheDTO: GhEquipmentDTO, @TransactionManager() manager?: EntityManager ) {

        let gheCreated = await this.gheRepository.save(gheDTO.gh_equipment);

        gheDTO.gh_review_data.gh_equipment = gheCreated;
        let ghrdCreated = await this.ghrdRepository.save(gheDTO.gh_review_data);

        gheDTO.gh_operating_data.gh_equipment = gheCreated;
        let ghodCreated = await this.ghodRepository.save(gheDTO.gh_operating_data);

        // Buscar el tipo de orden y crea en la tabla customer_equipments en caso sea un servicio de instalación
        if (gheDTO.gh_equipment.order.order_type.description === 'Instalación') {

            const custEquipmentDb: CustomerEquipment[] = await this.custEquipmentRepository.find({
                where: {
                    customer: gheDTO.gh_equipment.order.customer,
                    equipment: gheDTO.gh_equipment.equipment
                },
                order: { equipment_number: 'DESC' },
                take: 1
            });

            if ( custEquipmentDb.length > 0 ) {

                const customerEquipmentCreated = await this.custEquipmentRepository.save({
                    customer: gheDTO.gh_equipment.order.customer,
                    equipment: gheDTO.gh_equipment.equipment,
                    equipment_number: (custEquipmentDb[0].equipment_number) + 1
                });

            } else {

                const customerEquipmentCreated = await this.custEquipmentRepository.save({
                    customer: gheDTO.gh_equipment.order.customer,
                    equipment: gheDTO.gh_equipment.equipment,
                    equipment_number: 1
                });

            }
            
        }

        return {
            gheCreated,
            ghrdCreated,
            ghodCreated
        }

    }

    // TODO: desarrollar transaccionalidad de las operaciones
    async update( id: string, gheDTO: GhEquipmentDTO, @TransactionManager() manager?: EntityManager ) {

        if (!id) {
            throw new BadRequestException('The resource ID was not sent');
        }

        const ghEquipmentDb = await this.gheRepository.findOne(id, {
            where: { status: Status.ACTIVE },
            relations: ['order', 'equipment', 'heater_type', 'gh_review_data', 'gh_operating_data']
        });

        if (!ghEquipmentDb) {
            throw new NotFoundException('The requested resource was not found');
        }

        await this.gheRepository.update(id, gheDTO.gh_equipment);

        if (gheDTO.gh_review_data) {
            await this.ghrdRepository.update(ghEquipmentDb.gh_review_data.id, gheDTO.gh_review_data);
        }
        if (gheDTO.gh_operating_data) {
            await this.ghodRepository.update(ghEquipmentDb.gh_operating_data.id, gheDTO.gh_operating_data);
        }

        const ghEquipmentUpdated = await this.gheRepository.findOne(id, {
            relations: ['order', 'equipment', 'heater_type', 'gh_review_data', 'gh_operating_data']
        });

        return ghEquipmentUpdated;

    }

    // TODO: desarrollar transaccionalidad de las operaciones
    async delete( id: string ) {

        if (!id) {
            throw new BadRequestException('The resource ID was not sent');
        }

        const ghEquipmentDb = await this.gheRepository.findOne(id, {
            where: { status: Status.ACTIVE },
            relations: ['order', 'order.order_type', 'order.customer', 'equipment', 'heater_type', 'gh_review_data', 'gh_operating_data']
        });

        if (!ghEquipmentDb) {
            throw new NotFoundException('The requested resource was not found');
        }

        const ghodDeleted = await this.ghodRepository.delete(ghEquipmentDb.gh_operating_data.id);
        const ghrdDeleted = await this.ghrdRepository.delete(ghEquipmentDb.gh_review_data.id);
        const gheDeleted = await this.gheRepository.delete(ghEquipmentDb.id);

        /* TODO: Analizar con el equipo si una orden de serivicio instalación no puede eliminarse
                 Toda vez ya existan más ordenes de servicio asociadas al equipo
                 Esto para no perder el trace de las ordenes de servicio 
        */
        if (ghEquipmentDb.order.order_type.description === 'Instalación') {

            // TODO: obtener la orden que originó la instalación de este equipo al cliente
            const customerEquipment = await this.custEquipmentRepository.find({
                where: {
                    customer: ghEquipmentDb.order.customer,
                    equipment: ghEquipmentDb.equipment,
                    status: Status.ACTIVE
                }
            });

            if (customerEquipment) {
                const customerEquipmentDeleted = await this.custEquipmentRepository.delete(customerEquipment[0].id);
            }

        }

        return ghEquipmentDb;

    }
}
