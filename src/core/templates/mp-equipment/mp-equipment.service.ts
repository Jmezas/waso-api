import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository, Transaction, TransactionManager, EntityManager } from 'typeorm';
import { MpEquipment } from './local/mp-equipment.entity';
import { MpTechnicalReport } from './local/mp-technical-report.entity';
import { MpComplenentaryData } from './local/mp-complementary-data.entity';
import { MpEquipmentDTO } from './dtos/mp-equipment.dto';
import { CustomerEquipment } from '../../../customer-equipment/local/customer-equipment.entity';
import { Status } from '../../../common/status.enum';

@Injectable()
export class MpEquipmentService {

    /**
     *
     */
    constructor(
        @Inject('MP_EQUIPMENT_REPOSITORY')
        private mpeRepository: Repository<MpEquipment>,
        @Inject('MP_TECHNICAL_REPORT_REPOSITORY')
        private mptrRepository: Repository<MpTechnicalReport>,
        @Inject('MP_COMPLEMENTARY_DATA_REPOSITORY')
        private mpcdRepository: Repository<MpComplenentaryData>,
        @Inject('CUSTOMER_EQUIPMENT_REPOSITORY')
        private custEquipmentRepository: Repository<CustomerEquipment>
    ) { }

    async get(order_id: string): Promise<MpEquipment[]> {

        const mpEquipment: MpEquipment[] = await this.mpeRepository.find({
            where: { order: order_id },
            relations: ['order', 'order.order_type', 'equipment', 'mp_technical_report', 'mp_complementary_data']
        });

        return mpEquipment;

    }

    async getByCustomer(customer_id: string, equipment_id: string): Promise<MpEquipment> {

        const mpEquipment: any = await this.mpeRepository
            .createQueryBuilder('mpe')
            .innerJoinAndSelect('mpe.mp_technical_report', 'mptr')
            .innerJoinAndSelect('mpe.mp_complementary_data', 'mpcd')
            .innerJoinAndSelect('mpe.order', 'order')
            .innerJoinAndSelect('mpe.equipment', 'equipment')
            .where('order.customer = :customer_id', { customer_id })
            .andWhere('mpe.equipment = :equipment_id', { equipment_id })
            .orderBy('order.execution_date', 'DESC')
            .getOne();

        return mpEquipment;

    }

    @Transaction() // TODO: desarrollar la transaccionalidad de las operaciones
    async create(mpeDTO: MpEquipmentDTO, @TransactionManager() manager?: EntityManager) {

        // let mpeCreated = await manager.save(mpeDTO.mp_equipment);
        let mpeCreated = await this.mpeRepository.save(mpeDTO.mp_equipment);

        mpeDTO.mp_technical_report.mp_equipment = mpeCreated;
        let mptrCreated = await this.mptrRepository.save(mpeDTO.mp_technical_report);

        mpeDTO.mp_complementary_data.mp_equipment = mpeCreated;
        let mpcdCreated = await this.mpcdRepository.save(mpeDTO.mp_complementary_data);

        // Buscar el tipo de orden y crea en la tabla customer_equipments en caso sea un servicio de instalación
        if (mpeDTO.mp_equipment.order.order_type.description === 'Instalación') {

            const custEquipmentDb: CustomerEquipment[] = await this.custEquipmentRepository.find({
                where: {
                    customer: mpeDTO.mp_equipment.order.customer,
                    equipment: mpeDTO.mp_equipment.equipment
                },
                order: { equipment_number: 'DESC' },
                take: 1
            });

            if (custEquipmentDb.length > 0) {

                const customerEquipmentCreated = await this.custEquipmentRepository.save({
                    customer: mpeDTO.mp_equipment.order.customer,
                    equipment: mpeDTO.mp_equipment.equipment,
                    equipment_number: (custEquipmentDb[0].equipment_number) + 1
                });

            } else {

                const customerEquipmentCreated = await this.custEquipmentRepository.save({
                    customer: mpeDTO.mp_equipment.order.customer,
                    equipment: mpeDTO.mp_equipment.equipment,
                    equipment_number: 1
                });

            }

        }

        return {
            mpeCreated,
            mptrCreated,
            mpcdCreated
        }

    }

    // TODO: desarrollar transaccionalidad de las operaciones
    async update(id: string, mpeDTO: MpEquipmentDTO, @TransactionManager() manager?: EntityManager) {

        if (!id) {
            throw new BadRequestException('The resource ID was not sent');
        }

        const mpEquipmentDb = await this.mpeRepository.findOne(id, {
            where: { status: Status.ACTIVE },
            relations: ['order', 'equipment', 'mp_technical_report', 'mp_complementary_data']
        });

        if (!mpEquipmentDb) {
            throw new NotFoundException('The requested resource was not found');
        }

        await this.mpeRepository.update(id, mpeDTO.mp_equipment);

        if (mpeDTO.mp_technical_report) {
            await this.mptrRepository.update(mpEquipmentDb.mp_technical_report.id, mpeDTO.mp_technical_report);
        }
        if (mpeDTO.mp_complementary_data) {
            await this.mpcdRepository.update(mpEquipmentDb.mp_complementary_data.id, mpeDTO.mp_complementary_data);
        }

        const hnEquipmentUpdated = await this.mpeRepository.findOne(id, {
            relations: ['order', 'equipment', 'mp_technical_report', 'mp_complementary_data']
        });

        return hnEquipmentUpdated;

    }

    // TODO: desarrollar transaccionalidad de las operaciones
    async delete(id: string) {

        if (!id) {
            throw new BadRequestException('The resource ID was not sent');
        }

        const mpEquipmentDb = await this.mpeRepository.findOne(id, {
            where: { status: Status.ACTIVE },
            relations: ['order', 'order.order_type', 'order.customer', 'equipment', 'mp_technical_report', 'mp_complementary_data']
        });

        if (!mpEquipmentDb) {
            throw new NotFoundException('The requested resource was not found');
        }

        const mpcdDeleted = await this.mpcdRepository.delete(mpEquipmentDb.mp_complementary_data.id);
        const mptrDeleted = await this.mptrRepository.delete(mpEquipmentDb.mp_technical_report.id);
        const mpeDeleted = await this.mpeRepository.delete(mpEquipmentDb.id);

        /* TODO: Analizar con el equipo si una orden de serivicio instalación no puede eliminarse
                 Toda vez ya existan más ordenes de servicio asociadas al equipo
                 Esto para no perder el trace de las ordenes de servicio 
        */
        if (mpEquipmentDb.order.order_type.description === 'Instalación') {

            // TODO: obtener la orden que originó la instalación de este equipo al cliente
            const customerEquipment = await this.custEquipmentRepository.find({
                where: {
                    customer: mpEquipmentDb.order.customer,
                    equipment: mpEquipmentDb.equipment,
                    status: Status.ACTIVE
                }
            });

            if (customerEquipment) {
                const customerEquipmentDeleted = await this.custEquipmentRepository.delete(customerEquipment[0].id);
            }

        }

        return mpEquipmentDb;

    }

}
