import { Injectable, Inject } from '@nestjs/common';
import { Repository, Brackets } from 'typeorm';

// Entities
import { Order } from '../core/order/local/order.entity';
import { Status } from '../common/status.enum';
import { Material } from '../material/external/material.entity';
import { Customer } from '../customer/external/customer.entity';

@Injectable()
export class SearchService {

    /**
     *
     */
    constructor(
        @Inject('ORDER_REPOSITORY')
        private orderRepository: Repository<Order>,
        @Inject('MATERIAL_REPOSITORY')
        private materialRepository: Repository<Material>,
        @Inject('CUSTOMER_REPOSITORY')
        private customerRepository: Repository<Customer>
    ) { }

    async getOrders(term: string, skip: number, all: string, order_by: string, order_term: string ): Promise<[Order[], Number]> {

        const searchTerm: string = '%' + term + '%';
        const status = Status.INACTIVE;

        if (!order_by) {
            order_by = 'order.execution_date';
        }

        if (!order_term) {
            order_term = 'DESC';
        }

        if (!all || all !== 'true') {

            if (order_term === 'DESC') {
                const [orders, totalRecords] = await this.orderRepository
                    .createQueryBuilder('order')
                    .innerJoinAndSelect('order.customer', 'customer')
                    .innerJoinAndSelect('order.technical', 'technical')
                    .innerJoinAndSelect('order.user', 'user')
                    .innerJoinAndSelect('order.responsible_user', 'ruser')
                    .innerJoinAndSelect('order.order_type', 'otype')
                    .innerJoinAndSelect('order.service_type', 'stype')
                    .where('order.status <> :status', { status })
                    .andWhere(new Brackets(qb => {
                        qb.where('order.order_number = :term', { term })
                        // .orWhere('order.execution_date like :searchTerm', { searchTerm })
                        .orWhere('customer.first_name like :searchTerm', { searchTerm })
                        .orWhere('customer.nit = :term', { term })
                        .orWhere('technical.first_name like :searchTerm', { searchTerm })
                        .orWhere('technical.last_name like :searchTerm', { searchTerm })
                    }))
                    .orderBy(order_by, 'DESC')
                    .skip(skip)
                    .take(10)
                    .getManyAndCount();
        
                return [orders, totalRecords];

            } else {
                const [orders, totalRecords] = await this.orderRepository
                    .createQueryBuilder('order')
                    .innerJoinAndSelect('order.customer', 'customer')
                    .innerJoinAndSelect('order.technical', 'technical')
                    .innerJoinAndSelect('order.user', 'user')
                    .innerJoinAndSelect('order.responsible_user', 'ruser')
                    .innerJoinAndSelect('order.order_type', 'otype')
                    .innerJoinAndSelect('order.service_type', 'stype')
                    .where('order.status <> :status', { status })
                    .andWhere(new Brackets(qb => {
                        qb.where('order.order_number = :term', { term })
                            // .orWhere('order.execution_date like :searchTerm', { searchTerm })
                            .orWhere('customer.first_name like :searchTerm', { searchTerm })
                            .orWhere('customer.nit = :term', { term })
                            .orWhere('technical.first_name like :searchTerm', { searchTerm })
                            .orWhere('technical.last_name like :searchTerm', { searchTerm })
                    }))
                    .orderBy(order_by, 'ASC')
                    .skip(skip)
                    .take(10)
                    .getManyAndCount();

                return [orders, totalRecords];
            }

        } else {

            if (order_term === 'DESC') {
                const [orders, totalRecords] = await this.orderRepository
                    .createQueryBuilder('order')
                    .innerJoinAndSelect('order.customer', 'customer')
                    .innerJoinAndSelect('order.technical', 'technical')
                    .innerJoinAndSelect('order.user', 'user')
                    .innerJoinAndSelect('order.responsible_user', 'ruser')
                    .innerJoinAndSelect('order.order_type', 'otype')
                    .innerJoinAndSelect('order.service_type', 'stype')
                    .where('order.order_number = :term', { term })
                    .orWhere('customer.first_name like :searchTerm', { searchTerm })
                    .orWhere('customer.nit = :term', { term })
                    .orWhere('technical.first_name like :searchTerm', { searchTerm })
                    .orWhere('technical.last_name like :searchTerm', { searchTerm })
                    .orderBy(order_by, 'DESC')
                    .skip(skip)
                    .take(10)
                    .getManyAndCount();
    
                return [orders, totalRecords];
                
            } else {
                const [orders, totalRecords] = await this.orderRepository
                    .createQueryBuilder('order')
                    .innerJoinAndSelect('order.customer', 'customer')
                    .innerJoinAndSelect('order.technical', 'technical')
                    .innerJoinAndSelect('order.user', 'user')
                    .innerJoinAndSelect('order.responsible_user', 'ruser')
                    .innerJoinAndSelect('order.order_type', 'otype')
                    .innerJoinAndSelect('order.service_type', 'stype')
                    .where('order.order_number = :term', { term })
                    .orWhere('customer.first_name like :searchTerm', { searchTerm })
                    .orWhere('customer.nit = :term', { term })
                    .orWhere('technical.first_name like :searchTerm', { searchTerm })
                    .orWhere('technical.last_name like :searchTerm', { searchTerm })
                    .orderBy(order_by, 'ASC')
                    .skip(skip)
                    .take(10)
                    .getManyAndCount();

                return [orders, totalRecords];
            }
        }

    }

    async getMaterials(term: string, skip: number): Promise<[Material[], Number]> {

        const searchTerm: string = '%' + term + '%';
        const status = Status.INACTIVE;

        const [materials, totalRecords] = await this.materialRepository
            .createQueryBuilder('material')
            .where('material.status <> :status', { status })
            .andWhere(new Brackets(qb => {
                qb.where('material.code = :term', { term })
                    .orWhere('material.description like :searchTerm', { searchTerm })
            }))
            .skip(skip)
            .take(10)
            .getManyAndCount();

        return [materials, totalRecords];

    }

    async getCustomers(term: string, skip: number): Promise<[Customer[], Number]> {

        const searchTerm: string = '%' + term + '%';
        const status = Status.INACTIVE;

        const [customers, totalRecords] = await this.customerRepository
            .createQueryBuilder('customer')
            .where('customer.status <> :status', { status })
            .andWhere(new Brackets(qb => {
                qb.where('customer.nit = :term', { term })
                    .orWhere('customer.first_name like :searchTerm', { searchTerm })
            }))
            .skip(skip)
            .take(10)
            .getManyAndCount();

        return [customers, totalRecords];

    }

}
