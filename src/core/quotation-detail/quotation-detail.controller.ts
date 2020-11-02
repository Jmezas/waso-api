import { Controller, Get, Param, Res, HttpStatus, Post, Body, Put, Delete } from '@nestjs/common';
import { QuotationDetailService } from './quotation-detail.service';
import { QuotationDetail } from './local/quotation-detail.entity';

@Controller('quotation-details')
export class QuotationDetailController {

    /**
     *
     */
    constructor(
        private readonly _quotationDetailService: QuotationDetailService
    ) { }

    @Get('/:quotation_id')
    async getQuotationDetails( @Res() res, @Param('quotation_id') quotation_id: string ) {

        const quotationDetails = await this._quotationDetailService.getAll(quotation_id);

        res.status(HttpStatus.OK).json({
            quotationDetails
        });
    }

    @Post()
    async createQuotationDetail( @Res() res, @Body() quotation_detail: QuotationDetail ) {

        const quotationDetailCreated = await this._quotationDetailService.create(quotation_detail);

        res.status(HttpStatus.CREATED).json({
            quotationDetailCreated
        });
    }

    @Put('/:id')
    async updateQuotationDetail( @Res() res, @Param('id') id: string, @Body() quotation_detail: QuotationDetail ) {

        const quotationDetailUpdated = await this._quotationDetailService.update(id, quotation_detail);

        res.status(HttpStatus.OK).json({
            quotationDetailUpdated
        });
    }

    @Delete('/:id')
    async deleteQuotationDetail( @Res() res, @Param('id') id: string ) {

        const quotationDetailDeleted = await this._quotationDetailService.delete(id);

        res.status(HttpStatus.OK).json({
            quotationDetailDeleted
        });
    }
}
