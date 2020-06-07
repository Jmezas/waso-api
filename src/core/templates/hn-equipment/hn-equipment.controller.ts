import { Controller, Get, Res, Param, HttpStatus, Post, Body, Put, Delete } from '@nestjs/common';
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

    @Get('/:order_id')
    async getHnEquipment( @Res() res, @Param('order_id') order_id: string ) {

        const hnEquipment = await this._hnEquipmentService.get(order_id);

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
