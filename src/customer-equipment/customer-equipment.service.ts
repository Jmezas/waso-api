import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomerEquipment } from './local/customer-equipment.entity';
import { Status } from '../common/status.enum';

@Injectable()
export class CustomerEquipmentService {

    /**
     *
     */
    constructor(
        @Inject('CUSTOMER_EQUIPMENT_REPOSITORY')
        private customerEquipmentRepository: Repository<CustomerEquipment>
    ) { }

    async getCustomerEquipments( customer_id: string ): Promise<CustomerEquipment[]> {

        const customerEquipments = await this.customerEquipmentRepository.find({
            where: { customer: customer_id, status: Status.ACTIVE },
            relations: ['customer', 'equipment']
        });

        return customerEquipments;
    }

    async createCustomerEquipment( customerEquipment: CustomerEquipment ): Promise<CustomerEquipment> {

        const custEquipmentDb: CustomerEquipment[] = await this.customerEquipmentRepository.find({
            where: {
                customer: customerEquipment.customer,
                equipment: customerEquipment.equipment
            },
            relations: ['customer', 'equipment'],
            order: { equipment_number: 'DESC' },
            take: 1
        });

        if (custEquipmentDb.length > 0 ) {

            customerEquipment.equipment_number = (custEquipmentDb[0].equipment_number) + 1;

            const customerEquipmentCreated = await this.customerEquipmentRepository.save(customerEquipment);

            return customerEquipmentCreated;

        } else {

            customerEquipment.equipment_number = 1;

            const customerEquipmentCreated = await this.customerEquipmentRepository.save(customerEquipment);

            return customerEquipmentCreated;
        }

    }

    async deleteCustomerEquipment( id: string ): Promise<CustomerEquipment> {

        if (!id) {
            throw new BadRequestException('The resource ID was not sent')
        }

        const customerEquipmentDb: CustomerEquipment = await this.customerEquipmentRepository.findOne(id, {
            where: { status: Status.ACTIVE }
        });

        if (!customerEquipmentDb) {
            throw new NotFoundException('The requested resource was not found')
        }

        await this.customerEquipmentRepository.update(id, {
            status: Status.INACTIVE
        });

        const customerEquipmentDeleted = await this.customerEquipmentRepository.findOne(id);

        return customerEquipmentDeleted;

    }

}
