import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { Status } from '../../common/status.enum';

// Models
import { Order } from './local/order.entity';
import { User } from '../../user/local/user.entity';
import { HnEquipment } from '../templates/hn-equipment/local/hn-equipment.entity';
import { HnComplementaryData } from '../templates/hn-equipment/local/hn-complementary-data.entity';
import { HnTechnicalReport } from '../templates/hn-equipment/local/hn-technical-report.entity';
import { CustomerEquipment } from '../../customer-equipment/local/customer-equipment.entity';

@Injectable()
export class OrderService {

    /**
     *
     */
    constructor(
        @Inject('ORDER_REPOSITORY')
        private orderRepository: Repository<Order>,
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
        @Inject('HN_EQUIPMENT_REPOSITORY')
        private hneRespository: Repository<HnEquipment>,
        @Inject('HN_COMPLEMENTARY_DATA_REPOSITORY')
        private hncdRepository: Repository<HnComplementaryData>,
        @Inject('HN_TECHNICAL_REPORT_REPOSITORY')
        private hntrRepository: Repository<HnTechnicalReport>
    ) { }

    async getAll( skip: number, all: string ): Promise<[Order[], Number]> {

        if (!all) {

            const [orders, totalRecords] = await this.orderRepository.findAndCount({
                where: { status: Status.ACTIVE },
                relations: ['technical', 'user', 'responsable_user', 'order_type', 'service_type'],
                order: { created_at: 'DESC' },
                skip,
                take: 10
            });

            return [orders, totalRecords];

        } else {

            if (all === 'true') {

                const [orders, totalRecords] = await this.orderRepository.findAndCount({
                    relations: ['technical', 'user', 'responsable_user', 'order_type', 'service_type'],
                    order: { created_at: 'DESC' },
                    skip,
                    take: 10
                });

                return [orders, totalRecords];

            } else {

                const [orders, totalRecords] = await this.orderRepository.findAndCount({
                    where: { status: Status.ACTIVE },
                    relations: ['technical', 'user', 'responsable_user', 'order_type', 'service_type'],
                    order: { created_at: 'DESC' },
                    skip,
                    take: 10
                });

                return [orders, totalRecords];
                
            }
        }
        

    }

    async get(id: string): Promise<Order> {

        const order: Order = await this.orderRepository.findOne(id, {
            where: { status: Status.ACTIVE },
            relations: ['technical', 'user', 'responsable_user', 'order_type', 'service_type']
        });

        return order;
    }

    async create(order: Order): Promise<Order> {

        if (!order.responsable_user) {
            order.responsable_user = order.user;
        }

        const orderCreated = await this.orderRepository.save(order);

        return orderCreated;
    }

    async update(id: string, order: Order): Promise<Order> {
        
        if (!id) {
            throw new BadRequestException('The resource ID was not sent');
        }

        const orderDb: Order = await this.orderRepository.findOne(id, {
            where: { status: Status.ACTIVE },
        });

        if (!orderDb) {
            throw new NotFoundException('The requested resource was not found');
        }

        await this.orderRepository.update(id, order);

        const orderUpdated = await this.orderRepository.findOne(id);

        return orderUpdated;
    }

    async delete(id: string): Promise<Order> {

        if (!id) {
            throw new BadRequestException('The resource ID was not sent');
        }

        const orderDb: Order = await this.orderRepository.findOne(id, {
            where: { status: Status.ACTIVE },
        });

        if (!orderDb) {
            throw new NotFoundException('The requested resource was not found');
        }

        await this.orderRepository.update(id, {
            status: Status.INACTIVE
        });

        /**
         * Get HnEquipment/order_id
         */
        const hnEquipmentDb: HnEquipment[] = await this.hneRespository.find({
            where: { order: id, status: Status.ACTIVE },
            relations: ['order', 'order.order_type', 'equipment', 'hn_technical_report', 'hn_complementary_data']
        });


        if (hnEquipmentDb[0]) {
            
            /**
             * Update status HnEquipment = 'INACTIVE'
             */
            await this.hneRespository.update(hnEquipmentDb[0].id, {
                status: Status.INACTIVE
            });

            await this.hntrRepository.update(hnEquipmentDb[0].hn_technical_report.id, {
                status: Status.INACTIVE
            });

            await this.hncdRepository.update(hnEquipmentDb[0].hn_complementary_data.id, {
                status: Status.INACTIVE
            });

        }

        
        /**
         * TODO: Evitar que se pueda inactivar un servicio de instalación, 
         *       toda vez ya exitan ordenes de mantenimientos para el equipo del cliente
         * 
         * Update status Customer Equipment = 'INACTIVE'
         */
        /* if (hnEquipmentDb[0].order.order_type.description === 'Instalación') {

            // TODO: obtener la orden que originó la instalación de este equipo al cliente
            const customerEquipment = await this.custEquipmentRepository.find({
                where: {
                    customer_id: hnEquipmentDb[0].order.customer_id,
                    equipment: hnEquipmentDb[0].equipment
                }
            });

            await this.custEquipmentRepository.update(customerEquipment[0].id, {
                status: Status.INACTIVE
            });
        } */


        /**
         * return OrderDeleted
         */
        const orderDeleted = await this.orderRepository.findOne(id);

        return orderDeleted;
    }
}
