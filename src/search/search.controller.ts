import { Controller, Get, Res, Param, HttpStatus, Query } from '@nestjs/common';
import { SearchService } from './search.service';

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
        @Query('all') all: string
    ) {

        if (!term) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                ok: false,
                message: 'A search term has not been sent'
            });
        }

        let promise: any;

        switch( collection ) {

            case 'orders':
                promise = this._searchService.getOrders( term, skip, all );
            break;

            default:
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'The search collection is invalid'
                });
        }

        promise.then( (data: any) => {
            res.status(HttpStatus.OK).json({
                [collection]: data 
            });
        });

    }
}
