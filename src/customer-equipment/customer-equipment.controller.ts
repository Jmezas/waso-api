import { Controller, Get, Res, HttpStatus, Param } from '@nestjs/common';
import { CustomerEquipmentService } from './customer-equipment.service';
import { CustomerEquipment } from './local/customer-equipment.entity';

@Controller('customer-equipments')
export class CustomerEquipmentController {

    /**
     *
     */
    constructor(
        private readonly _customerEquipmentService: CustomerEquipmentService
    ) { }

    @Get('/:customer_id')
    async getCustomerEquipments( @Res() res, @Param('customer_id') customer_id: string  ) {

        const customerEquipments = await this._customerEquipmentService.getCustomerEquipments(customer_id);

        res.status(HttpStatus.OK).json({
            customerEquipments
        });
    }

}
