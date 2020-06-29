import { Controller, Get, HttpStatus, Res, Param, Post, Body, Put, Delete } from '@nestjs/common';

import { OrderService } from './order.service';
import { Order } from './local/order.entity';

@Controller('orders')
export class OrderController {

    /**
     *
     */
    constructor(
        private readonly _orderService: OrderService
    ) { }

    @Get()
    async getOrders( @Res() res ) {

        const orders = await this._orderService.getAll();

        res.status(HttpStatus.OK).json({
            orders
        });
    }

    @Get('/:id')
    async getOrder( @Res() res, @Param('id') id: string ) {

        const order = await this._orderService.get(id);

        res.status(HttpStatus.OK).json({
            order
        });
    }

    @Post()
    async createOrder( @Res() res, @Body() order: Order ) {

        const orderCreated = await this._orderService.create(order);

        res.status(HttpStatus.OK).json({
            orderCreated
        });
    }

    @Put('/:id')
    async updateOrder( @Res() res, @Param('id') id: string, @Body() order: Order ) {

        const orderUpdated = await this._orderService.update(id, order);

        res.status(HttpStatus.OK).json({
            orderUpdated
        });
    }

    @Delete('/:id')
    async deleteOrder( @Res() res, @Param('id') id: string ) {

        const orderDeleted = await this._orderService.delete(id);

        res.status(HttpStatus.OK).json({
            orderDeleted
        });
    }

}
