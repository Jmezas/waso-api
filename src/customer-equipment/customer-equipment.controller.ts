import { Controller, Get, Res, HttpStatus, Param, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { CustomerEquipmentService } from './customer-equipment.service';
import { CustomerEquipment } from './local/customer-equipment.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
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

    @Post()
    async createCustomerEquipment( @Res() res, @Body() customerEquipment: CustomerEquipment ) {

        const customerEquipmentCreated = await this._customerEquipmentService.createCustomerEquipment(customerEquipment);

        res.status(HttpStatus.CREATED).json({
            customerEquipmentCreated
        });
        
    }

    @Delete('/:id')
    async deleteCustomerEquipment( @Res() res, @Param('id') id: string ) {

        const customerEquipmentDeleted = await this._customerEquipmentService.deleteCustomerEquipment(id);

        res.status(HttpStatus.OK).json({
            customerEquipmentDeleted
        });

    }

}
