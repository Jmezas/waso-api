import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './local/order.entity';
import { Status } from 'src/common/status.enum';

@Injectable()
export class OrderService {

    /**
     *
     */
    constructor(
        @Inject('ORDER_REPOSITORY')
        private orderRepository: Repository<Order>
    ) { }

    async getAll(): Promise<Order[]> {
        
        const orders: Order[] = await this.orderRepository.find({
            where: { status: Status.ACTIVE }
        });

        return orders;
    }

    async get(id: string): Promise<Order> {

        const order: Order = await this.orderRepository.findOne(id, {
            where: { status: Status.ACTIVE }
        });

        return order;
    }

    async create(order: Order): Promise<Order> {

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

        const orderDeleted = await this.orderRepository.findOne(id);

        return orderDeleted;
    }
}
