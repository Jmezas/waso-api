import { Controller, Get, Res, HttpStatus, Param, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { OrderTypeService } from './order-type.service';
import { OrderType } from './local/order-type.entity';

@Controller('order-types')
export class OrderTypeController {

    /**
     *
     */
    constructor(
        private readonly _orderTypeService: OrderTypeService
    ) { }

    @Get()
    async getOrderTypes( @Res() res, @Query('skip') skip: number ) {

        const [orderTypes, totalRecords] = await this._orderTypeService.getAll(skip);

        res.status(HttpStatus.OK).json({
            orderTypes,
            totalRecords
        });
    }

    @Get('/:id')
    async getOrderType( @Res() res, @Param('id') id: string ) {

        const orderType = await this._orderTypeService.get(id);

        res.status(HttpStatus.OK).json({
            orderType
        });
    }

    @Post()
    async createOrderType( @Res() res, @Body() orderType: OrderType ) {

        const orderTypeCreated = await this._orderTypeService.create(orderType);

        res.status(HttpStatus.CREATED).json({
            orderTypeCreated
        });
    }

    @Put('/:id')
    async updateOrderType( @Res() res, @Param('id') id: string, @Body() orderType: OrderType ) {

        const orderTypeUpdated = await this._orderTypeService.update(id, orderType);

        res.status(HttpStatus.OK).json({
            orderTypeUpdated
        });
    }

    @Delete('/:id')
    async deleteOrderType( @Res() res, @Param('id') id: string ) {

        const orderTypeDeleted = await this._orderTypeService.delete(id);

        res.status(HttpStatus.OK).json({
            orderTypeDeleted
        });
    }
}
