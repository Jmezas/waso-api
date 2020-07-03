import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomerEquipment } from './local/customer-equipment.entity';
import { Status } from 'src/common/status.enum';

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
            where: { customer_id, status: Status.ACTIVE },
            relations: ['equipment']
        });

        return customerEquipments;
    }

}
