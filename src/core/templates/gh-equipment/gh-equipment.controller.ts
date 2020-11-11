import { Controller, Get, Param, Res, UseGuards, HttpStatus, Query, Post, Body, Put, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GhEquipmentService } from './gh-equipment.service';
import { GhEquipmentDTO } from './dtos/gh-equipment.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('order/gh-equipment')
export class GhEquipmentController {

    /**
     *
     */
    constructor(
        private readonly _ghEquipmentService: GhEquipmentService
    ) { }

    /**
     * order/gh-equipment/:order_id
     */
    @Get('/:order_id')
    async getGhEquipment( @Res() res, @Param('order_id') order_id: string ) {

        const ghEquipment = await this._ghEquipmentService.get(order_id);

        res.status(HttpStatus.OK).json({
            ghEquipment
        });
    }

    /**
     * order/gh-equipment?customer=4565323652&equipment=5623232665
     */
    @Get()
    async getGhEquipmentCustomer( @Res() res, @Query('customer') customer_id: string, @Query('equipment') equipment_id: string ) {

        const ghEquipment = await this._ghEquipmentService.getByCustomer(customer_id, equipment_id);

        res.status(HttpStatus.OK).json({
            ghEquipment
        });
    }

    @Post()
    async createGhEquipment( @Res() res, @Body() gheDTO: GhEquipmentDTO ) {

        const ghEquipmentCreated = await this._ghEquipmentService.create(gheDTO);

        res.status(HttpStatus.CREATED).json({
            ghEquipmentCreated
        });
    }

    @Put('/:id')
    async updateGhEquipment( @Res() res, @Param('id') id: string, @Body() gheDTO: GhEquipmentDTO ) {

        const ghEquipmentUpdated = await this._ghEquipmentService.update(id, gheDTO);

        res.status(HttpStatus.OK).json({
            ghEquipmentUpdated
        });
    }

    @Delete('/:id')
    async deleteGhEquipment( @Res() res, @Param('id') id: string ) {

        const ghEquipmentDeleted = await this._ghEquipmentService.delete(id);

        res.status(HttpStatus.OK).json({
            ghEquipmentDeleted
        });
    }
}
