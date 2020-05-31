import { Controller, Get, Param } from '@nestjs/common';

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
    async getAll() {
        return await this._customerService.findAll();
    }

    @Get('/:id')
    async get(@Param('id') id: string) {
        return await this._customerService.find(id);
    }

}
