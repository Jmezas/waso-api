import { Controller, Query, Res, HttpStatus, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';

import { QuotationService } from './quotation.service';
import { Quotation } from './local/quotation.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('quotations')
export class QuotationController {

    /**
     *
     */
    constructor(
        private readonly _quotationService: QuotationService
    ) { }

    @Get()
    async getQuotations(
        @Res() res,
        @Query('skip') skip: number,
        @Query('all') all: string
    ) {

        const [quotations, totalRecords] = await this._quotationService.getAll(skip, all);

        res.status(HttpStatus.OK).json({
            quotations,
            totalRecords
        });
    }

    @Get('/:id')
    async getQuotation( @Res() res, @Param('id') id: string ) {

        const quotation = await this._quotationService.get(id);

        res.status(HttpStatus.OK).json({
            quotation
        });
    }

    @Get('/order/:order_id')
    async getQuotationByOrder( @Res() res, @Param('order_id') order_id: string ) {

        const quotation = await this._quotationService.getByOrder(order_id);

        res.status(HttpStatus.OK).json({
            quotation
        });
    }

    @Post()
    async createQuotation( @Res() res, @Body() quotation: Quotation ) {

        const quotationCreated = await this._quotationService.create(quotation);

        res.status(HttpStatus.CREATED).json({
            quotationCreated
        });
    }

    @Put('/:id')
    async updateQuotation( @Res() res, @Param('id') id: string, @Body() quotation: Quotation ) {

        const quotationUpdated = await this._quotationService.update(id, quotation);

        res.status(HttpStatus.OK).json({
            quotationUpdated
        });
    }

    @Delete('/:id')
    async deleteQuotation( @Res() res, @Param('id') id: string ) {

        const quotationDeleted = await this._quotationService.delete(id);

        res.status(HttpStatus.OK).json({
            quotationDeleted
        });
    }
}
