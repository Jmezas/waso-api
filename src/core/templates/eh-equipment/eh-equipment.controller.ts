import { Controller, Get, Res, Param, HttpStatus, Query, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { EhEquipmentService } from './eh-equipment.service';
import { EhEquipmentDTO } from './dtos/eh-equipment.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('order/eh-equipment')
export class EhEquipmentController {

    /**
     *
     */
    constructor(
        private readonly _ehEquipmentService: EhEquipmentService
    ) { }

    /**
     * order/eh-equipment/:order_id
     */
    @Get('/:order_id')
    async getEhEquipment( @Res() res, @Param('order_id') order_id: string ) {

        const ehEquipment = await this._ehEquipmentService.get(order_id);

        res.status(HttpStatus.OK).json({
            ehEquipment
        });
    }

    /**
     * order/eh-equipment?customer=4565323652&equipment=5623232665
     */
    @Get()
    async getEhEquipmentCustomer( @Res() res, @Query('customer') customer_id: string, @Query('equipment') equipment_id: string ) {

        const ehEquipment = await this._ehEquipmentService.getByCustomer(customer_id, equipment_id);

        res.status(HttpStatus.OK).json({
            ehEquipment
        });
    }

    @Post()
    async createEhEquipment( @Res() res, @Body() eheDTO: EhEquipmentDTO ) {

        const ehEquipmentCreated = await this._ehEquipmentService.create(eheDTO);

        res.status(HttpStatus.CREATED).json({
            ehEquipmentCreated
        });
    }

    @Put('/:id')
    async updateEhEquipment( @Res() res, @Param('id') id: string, @Body() eheDTO: EhEquipmentDTO ) {

        const ehEquipmentUpdated = await this._ehEquipmentService.update(id, eheDTO);

        res.status(HttpStatus.OK).json({
            ehEquipmentUpdated
        });
    }

    @Delete('/:id')
    async deleteEhEquipment( @Res() res, @Param('id') id: string ) {

        const ehEquipmentDeleted = await this._ehEquipmentService.delete(id);

        res.status(HttpStatus.OK).json({
            ehEquipmentDeleted
        });
    }
}
