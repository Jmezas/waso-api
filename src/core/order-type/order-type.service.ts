import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderType } from './local/order-type.entity';
import { Status } from '../../common/status.enum';

@Injectable()
export class OrderTypeService {
  /**
   *
   */
  constructor(
    @Inject('ORDER_TYPE_REPOSITORY')
    private orderTypeRepository: Repository<OrderType>
  ) {}

  async getAll( skip: number, all: string, take: number ): Promise<[OrderType[], Number]> {

    if (!take) {

      const [orderTypes, totalRecords] = await this.orderTypeRepository.findAndCount({
        where: { status: Status.ACTIVE }
      });

      return [orderTypes, totalRecords];

    } 
    
    else {

      if (!all) {

        const [orderTypes, totalRecords] = await this.orderTypeRepository.findAndCount({
          where: { status: Status.ACTIVE },
          skip,
          take
        });

        return [orderTypes, totalRecords];
      } else {

        if (all === 'true') {

          const [orderTypes, totalRecords] = await this.orderTypeRepository.findAndCount({
            skip,
            take
          });

          return [orderTypes, totalRecords];

        } else {

          const [orderTypes, totalRecords] = await this.orderTypeRepository.findAndCount({
            where: { status: Status.ACTIVE },
            skip,
            take
          });

          return [orderTypes, totalRecords];

        }

      }

    }
    
  }

  async get(id: string): Promise<OrderType> {
    const orderType: OrderType = await this.orderTypeRepository.findOne(id, {
      where: { status: Status.ACTIVE },
    });

    return orderType;
  }

  async create(orderType: OrderType): Promise<OrderType> {
    const orderTypeCreated = await this.orderTypeRepository.save(orderType);

    return orderTypeCreated;
  }

  async update(id: string, orderType: OrderType): Promise<OrderType> {
    if (!id) {
      throw new BadRequestException('The resource ID was not sent');
    }

    const orderTypeDb: OrderType = await this.orderTypeRepository.findOne(id, {
      where: { status: Status.ACTIVE },
    });

    if (!orderTypeDb) {
      throw new NotFoundException('The requested resource was not found');
    }

    await this.orderTypeRepository.update(id, orderType);

    const orderTypeUpdated = await this.orderTypeRepository.findOne(id);

    return orderTypeUpdated;
  }

  async delete(id: string): Promise<OrderType> {
    if (!id) {
      throw new BadRequestException('The resource ID was not sent');
    }

    const orderTypeDb: OrderType = await this.orderTypeRepository.findOne(id, {
      where: { status: Status.ACTIVE },
    });

    if (!orderTypeDb) {
      throw new NotFoundException('The requested resource was not found');
    }

    await this.orderTypeRepository.update(id, {
      status: Status.INACTIVE,
    });

    const orderTypeDeleted = await this.orderTypeRepository.findOne(id);

    return orderTypeDeleted;
  }
}
