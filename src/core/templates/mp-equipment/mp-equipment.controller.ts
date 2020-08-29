import { Controller, UseGuards, Get, Res, Param, HttpStatus, Query, Post, Body, Put, Delete } from '@nestjs/common';
import { MpEquipmentService } from './mp-equipment.service';
import { AuthGuard } from '@nestjs/passport';
import { MpEquipmentDTO } from './dtos/mp-equipment.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('order/mp-equipment')
export class MpEquipmentController {

    /**
     *
     */
    constructor(
        private readonly _mpEquipmentService: MpEquipmentService
    ) { }

    /**
     * order/hn-equipment/:order_id 
     */
    @Get('/:order_id')
    async getMpEquipment(@Res() res, @Param('order_id') order_id: string) {

        const mpEquipment = await this._mpEquipmentService.get(order_id);

        res.status(HttpStatus.OK).json({
            mpEquipment
        });
    }

    /**
     * order/mp-equipment?customer=5659323256213&equipment=56562329523
     */
    @Get()
    async getMpEquipmentCustomer(@Res() res, @Query('customer') customer_id: string, @Query('equipment') equipment_id: string) {

        const mpEquipment = await this._mpEquipmentService.getByCustomer(customer_id, equipment_id);

        res.status(HttpStatus.OK).json({
            mpEquipment
        });
    }

    @Post()
    async createMpEquipment(@Res() res, @Body() mpeDTO: MpEquipmentDTO) {

        const mpEquipmentCreated = await this._mpEquipmentService.create(mpeDTO);

        res.status(HttpStatus.OK).json({
            mpEquipmentCreated
        });
    }

    @Put('/:id')
    async updateMpEquipment(@Res() res, @Param('id') id: string, @Body() mpeDTO: MpEquipmentDTO) {

        const mpEquipmentUpdated = await this._mpEquipmentService.update(id, mpeDTO);

        res.status(HttpStatus.OK).json({
            mpEquipmentUpdated
        });
    }

    @Delete('/:id')
    async deleteMpEquipment(@Res() res, @Param('id') id: string) {

        const mpEquipmentDeleted = await this._mpEquipmentService.delete(id);

        res.status(HttpStatus.OK).json({
            mpEquipmentDeleted
        });
    }

}
