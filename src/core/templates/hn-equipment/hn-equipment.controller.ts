import { Controller, Get, Res, Param, HttpStatus, Post, Body } from '@nestjs/common';
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

}
