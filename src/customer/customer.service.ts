import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './local/customer.entity';
import { CustomerExt } from './external/customer.entity';
import { CustomerTemp } from './local/customer_temp.entity';
import { Status } from '../common/status.enum';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private customerRepository: Repository<Customer>,
    @Inject('CUSTOMER_TEMP_REPOSITORY')
    private customerTempRepository: Repository<CustomerTemp>,
    @Inject('CUSTOMER_EXT_REPOSITORY')
    private customerExtRepository: Repository<CustomerExt>,
  ) {}

  async getAll( skip: number, take: number ): Promise<[Customer[], Number]> {

    if (!take) {

      let [customers, totalRecords] = await this.customerRepository.findAndCount({
        where: { status: Status.ACTIVE },
        order: { legacy_code: 'ASC' },
        relations: ['user']
      });

      return [customers, totalRecords];

    } else {
      
      let [customers, totalRecords] = await this.customerRepository.findAndCount({
        where: { status: Status.ACTIVE },
        order: { legacy_code: 'ASC' },
        relations: ['user'],
        skip,
        take
      });

      return [customers, totalRecords];

    }

  }

  async getExternalData() {

    /** Select data external db */
    const customer_ext = await this.customerExtRepository.find();

    if ( customer_ext.length < 0 ) {
        return console.log('No existen datos en la DB externa');
    }

      /** Delete data temporal table */
    await this.customerTempRepository.createQueryBuilder()
                                    .delete()
                                    .from(CustomerTemp)
                                    .execute();
    
    /** Insert new data into temporal table */
    await customer_ext.forEach( ce => {

        this.customerTempRepository.createQueryBuilder()
                                    .insert()
                                    .into(CustomerTemp)
                                    .values({
                                        clave: ce.CLAVE,
                                        full_name: ce.NOMBRE,
                                        nit: ce.RFC,
                                        address: ce.CALLE,
                                        telephone: ce.TELEFONO,
                                        email: ce.PAG_WEB
                                    })
                                    .execute();
    });

  }

  async updateInternalData() {

    const customers_temp = await this.customerTempRepository.createQueryBuilder('customer_temp')
                                                            .innerJoin(Customer, 'customer', 'customer_temp.clave = customer.legacy_code')
                                                            .where('customer_temp.full_name <> customer.full_name')
                                                            .orWhere('customer_temp.nit <> customer.nit')
                                                            .orWhere('customer_temp.address <> customer.address')
                                                            .orWhere('customer_temp.telephone <> customer.telephone')
                                                            .orWhere('customer_temp.email <> customer.email')
                                                            .getMany();

    /** Update data in local table */
    await customers_temp.forEach( ct => {

      this.customerRepository.createQueryBuilder()
                                  .update(Customer)
                                  .set({
                                      full_name: ct.full_name,
                                      nit: ct.nit,
                                      address: ct.address,
                                      telephone: ct.telephone,
                                      email: ct.email
                                  })
                                  .where('legacy_code = :clave', { clave: ct.clave })
                                  .execute();
    });

  }

  async insertInternalData(): Promise<CustomerTemp[]> {

    /** Select data external db */
    const customers_temp = await this.customerTempRepository.createQueryBuilder('customer_temp')
                                                            .leftJoin(Customer, 'customer', 'customer_temp.clave = customer.legacy_code')
                                                            .where('customer.legacy_code is null')
                                                            .getMany();

    /** Insert into diference data */
    await customers_temp.forEach( ct => {

      this.customerRepository.createQueryBuilder()
                              .insert()
                              .into(Customer)
                              .values({
                                  legacy_code: ct.clave,
                                  full_name: ct.full_name,
                                    nit: ct.nit,
                                    address: ct.address,
                                    telephone: ct.telephone,
                                    email: ct.email
                              })
                              .execute();
    });

    return customers_temp;

  }

  async getCustomerExternal() {

    await this.getExternalData();

    await this.updateInternalData();

    return await this.insertInternalData();
    
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

  async create(customer: Customer): Promise<Customer> {

    const customerCreated = await this.customerRepository.save(customer);

    return customerCreated;

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

  async delete(id: string): Promise<Customer> {

    if (!id) {
      throw new BadRequestException('The resource ID was not sent')
    }

    const customerDb: Customer = await this.customerRepository.findOne(id, {
      where: { status: Status.ACTIVE }
    });

    if (!customerDb) {
      throw new NotFoundException('The requested resource was not found')
    }

    await this.customerRepository.update(id, {
      status: Status.INACTIVE
    });

    const customerDeleted = await this.customerRepository.findOne(id);

    return customerDeleted;

  }

}
