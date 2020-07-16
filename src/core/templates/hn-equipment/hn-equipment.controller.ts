import { Controller, Get, Res, Param, HttpStatus, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { HnEquipmentService } from './hn-equipment.service';
import { HnEquipmentDTO } from './dtos/hn-equipment.dto';

@Controller('order/hn-equipment')
export class HnEquipmentController {

    /**
     *
     */
    constructor(
        private readonly _hnEquipmentService: HnEquipmentService
    ) { }

    // order/hn-equipment/:order_id
    @Get('/:order_id')
    async getHnEquipment( @Res() res, @Param('order_id') order_id: string ) {

        const hnEquipment = await this._hnEquipmentService.get(order_id);

        res.status(HttpStatus.OK).json({
            hnEquipment
        });
    }

    // order/hn-equipment/customer/:customer_id/equipment/:equipment_id
    // order/hn-equipment/?customer_id=5698962653915&equipment_id=56359812339
    @Get('')
    async getHnEquipmentCustomer(@Res() res, @Query('customer') customer_id: string, @Query('equipment') equipment_id: string) {

        const hnEquipment = await this._hnEquipmentService.getByCustomer(customer_id, equipment_id);

        res.status(HttpStatus.OK).json({
            hnEquipment
        });
    }

    @Post()
    async createHnEquipment( @Res() res, @Body() hneDTO: HnEquipmentDTO ) {

        const hnEquipmentCreated = await this._hnEquipmentService.create(hneDTO);

        res.status(HttpStatus.OK).json({
            hnEquipmentCreated
        });
    }

    @Put('/:id')
    async updateHnEquipment( @Res() res, @Param('id') id: string, @Body() hneDTO: HnEquipmentDTO ) {

        const hnEquipmentUpdated = await this._hnEquipmentService.update(id, hneDTO);

        res.status(HttpStatus.OK).json({
            hnEquipmentUpdated
        });
    }

    @Delete('/:id')
    async deleteHnEquipment( @Res() res, @Param('id') id: string ) {

        const hnEquipmentDeleted = await this._hnEquipmentService.delete(id);

        res.status(HttpStatus.OK).json({
            hnEquipmentDeleted
        });
    }

}
