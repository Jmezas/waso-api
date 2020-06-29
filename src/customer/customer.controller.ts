import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';

// Services
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {

    /**
     *
     */
    constructor(
        private readonly _customerService: CustomerService
    ) { }

    @Get()
    async getCustomers( @Res() res ) {

        const customers = await this._customerService.getAll();

        res.status(HttpStatus.OK).json({
            customers
        });

    }

    @Get('/select')
    async getCustomersSelect(@Res() res) {

        const customers = await this._customerService.getCustomerSelect();

        res.status(HttpStatus.OK).json({
            customers
        });

    }

    @Get('/:id')
    async get( @Res() res,  @Param('id') id: string ) {

        const customer = await this._customerService.get(id);

        res.status(HttpStatus.OK).json({
            customer
        });
    }

}
