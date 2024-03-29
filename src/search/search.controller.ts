import { Controller, Get, Res, Param, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('search')
export class SearchController {

    /**
     *
     */
    constructor(
        private readonly _searchService: SearchService
    ) { }

    @Get('/:collection/:term')
    async getCollection(
        @Res() res, 
        @Param('collection') collection: string, 
        @Param('term') term: string, 
        @Query('skip') skip: number,
        @Query('all') all: string,
        @Query('order_by') order_by: string,
        @Query('order_term') order_term: string
    ) {

        if (!term) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                ok: false,
                message: 'A search term has not been sent'
            });
        }

        switch( collection ) {

            case 'orders':
                const [orders, totalRecordsO] = await this._searchService.getOrders( term, skip, all, order_by, order_term );
                res.status(HttpStatus.OK).json({
                    orders,
                    totalRecords: totalRecordsO
                });
            break;

            case 'materials':
                const [materials, totalRecordsM] = await this._searchService.getMaterials( term, skip );
                res.status(HttpStatus.OK).json({
                    materials,
                    totalRecords: totalRecordsM
                });
            break;

            case 'customers':
                const [customers, totalRecordsC] = await this._searchService.getCustomers( term, skip );
                res.status(HttpStatus.OK).json({
                    customers,
                    totalRecords: totalRecordsC
                });
            break;

            default:
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'The search collection is invalid'
                });
        }

    }
}
