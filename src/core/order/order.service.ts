import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Status } from 'src/common/status.enum';
import { Order } from './local/order.entity';
import { User } from '../../user/local/user.entity';
import { plainToClass } from 'class-transformer';
import { ReadOrderDTO } from './dtos/read-order.dto';
import { Customer } from '../../customer/external/customer.entity'

@Injectable()
export class OrderService {

    /**
     *
     */
    constructor(
        @Inject('ORDER_REPOSITORY')
        private orderRepository: Repository<Order>,
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>
    ) { }

    async getAll(): Promise<Order[]> {
        
        const orders: Order[] = await this.orderRepository.find({
            where: { status: Status.ACTIVE },
            relations: [ 'technical', 'user', 'order_type', 'service_type' ]
        });

        return orders;

    }

    async get(id: string): Promise<Order> {

        const order: Order = await this.orderRepository.findOne(id, {
            where: { status: Status.ACTIVE },
            relations: ['technical', 'user', 'order_type', 'service_type']
        });

        return order;
    }

    async create(order: Order): Promise<Order> {

        // TODO: esta asignación debe eliminarse al tener la gestión de usuarios en el frontend
        order.user = await this.userRepository.findOne('7309a463-2eb7-4569-8b80-1913305de8f8');

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
