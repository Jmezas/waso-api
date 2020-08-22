import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './external/customer.entity';
import { Status } from '../common/status.enum';
import { CustomerSelectDTO } from './dtos/customer.select.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private customerRepository: Repository<Customer>,
  ) {}

  async getAll( skip: number ): Promise<[Customer[], Number]> {

    const [customers, totalRecords] = await this.customerRepository.findAndCount({
      where: { status: Status.ACTIVE },
      relations: ['user'],
      skip,
      take: 10
    });

    return [customers, totalRecords];
  }

  async get(id: string): Promise<Customer> {

    if (!id) {
      throw new BadRequestException('The resource ID was not sent')
    }

    const customer: Customer = await this.customerRepository.findOne(id, {
      where: { status: Status.ACTIVE },
      relations: ['user'],
    });

    if (!customer) {
      throw new NotFoundException('The requested resource was not found')
    }

    return customer;
  }

  async getCustomerSelect(): Promise<CustomerSelectDTO[]> {

    const customers: Customer[] = await this.customerRepository.find({
      where: { status: Status.ACTIVE },
      relations: ['user'],
    });

    return customers.map((customer: Customer) => plainToClass(CustomerSelectDTO, customer));

  }

  async update(id: string, customer: Customer): Promise<Customer> {

    if (!id) {
        throw new BadRequestException('The resource ID was not sent')
    }

    const customerDb: Customer = await this.customerRepository.findOne(id, {
        where: { status: Status.ACTIVE }
    });

    if (!customerDb) {
        throw new NotFoundException('The requested resource was not found')
    }

    await this.customerRepository.update(id, customer);

    const customerUpdated = await this.customerRepository.findOne(id);

    return customerUpdated;
  }

}
