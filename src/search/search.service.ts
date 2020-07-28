import { Injectable, Inject } from '@nestjs/common';
import { Repository, Brackets } from 'typeorm';

// Entities
import { Order } from '../core/order/local/order.entity';
import { Status } from '../common/status.enum';

@Injectable()
export class SearchService {

    /**
     *
     */
    constructor(
        @Inject('ORDER_REPOSITORY')
        private orderRepository: Repository<Order>
    ) { }

    async getOrders(term: string, skip: number, all: string ): Promise<Order[]> {

        const searchTerm: string = '%' + term + '%';
        const status = Status.INACTIVE;

        if (!all) {
            
            const orders: Order[] = await this.orderRepository
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
                    .orWhere('customer.first_name like :searchTerm', { searchTerm })
                    .orWhere('customer.last_name like :searchTerm', { searchTerm })
                    .orWhere('customer.nit = :term', { term })
                    .orWhere('technical.first_name like :searchTerm', { searchTerm })
                    .orWhere('technical.last_name like :searchTerm', { searchTerm })
                }))
                .orderBy('order.created_at', 'DESC')
                .skip(skip)
                .take(10)
                .getMany();
    
            return orders;

        } else {

            const orders: Order[] = await this.orderRepository
                .createQueryBuilder('order')
                .innerJoinAndSelect('order.customer', 'customer')
                .innerJoinAndSelect('order.technical', 'technical')
                .innerJoinAndSelect('order.user', 'user')
                .innerJoinAndSelect('order.responsible_user', 'ruser')
                .innerJoinAndSelect('order.order_type', 'otype')
                .innerJoinAndSelect('order.service_type', 'stype')
                .where('order.order_number = :term', { term })
                .orWhere('customer.first_name like :searchTerm', { searchTerm })
                .orWhere('customer.last_name like :searchTerm', { searchTerm })
                .orWhere('customer.nit = :term', { term })
                .orWhere('technical.first_name like :searchTerm', { searchTerm })
                .orWhere('technical.last_name like :searchTerm', { searchTerm })
                .orderBy('order.created_at', 'DESC')
                .skip(skip)
                .take(10)
                .getMany();

            return orders;

        }

    }
}
