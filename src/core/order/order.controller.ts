import { Controller, Get, HttpStatus, Res, Param, Post, Body, Put, Delete, Query, UseGuards } from '@nestjs/common';

import { OrderService } from './order.service';
import { Order } from './local/order.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('orders')
export class OrderController {

    /**
     *
     */
    constructor(
        private readonly _orderService: OrderService
    ) { }

    @Get()
    async getOrders( 
        @Res() res, 
        @Query('skip') skip: number, 
        @Query('all') all: string, 
        @Query('order_by') order_by: string,
        @Query('order_term') order_term: string
    ) {

        const [orders, totalRecords] = await this._orderService.getAll(skip, all, order_by, order_term);

        res.status(HttpStatus.OK).json({
            orders,
            totalRecords
        });
    }

    @Get('/status/:status')
    async getOrdersByStatus( @Res() res, @Param('status') status: string ) {

        const orders = await this._orderService.getAllByStatus(status);

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
