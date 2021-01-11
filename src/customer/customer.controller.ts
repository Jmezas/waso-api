import { Controller, Get, Param, Res, HttpStatus, Query, UseGuards, Put, Body, Post, Delete } from '@nestjs/common';

// Services
import { CustomerService } from './customer.service';
import { Customer } from './local/customer.entity';

// Guards
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('customers')
export class CustomerController {
  /**
   *
   */
  constructor(private readonly _customerService: CustomerService) {}

  @Get()
  async getCustomers(@Res() res, @Query('skip') skip: number, @Query('take') take: number) {
    const [customers, totalRecords] = await this._customerService.getAll(skip, take);

    res.status(HttpStatus.OK).json({
      customers,
      totalRecords,
    });
  }

  @Get('/external')
  async getCustomerExternal(@Res() res) {

    const customers_inserted = await this._customerService.getCustomerExternal();

    res.status(HttpStatus.OK).json({
      message: 'Datos actualizados',
      customers_inserted
    });
  }

  @Get('/:id')
  async get(@Res() res, @Param('id') id: string) {
    const customer = await this._customerService.get(id);

    res.status(HttpStatus.OK).json({
      customer,
    });
  }

  @Post()
  async createCustomer( @Res() res, @Body() customer: Customer ) {

    const customerCreated = await this._customerService.create(customer);

    res.status(HttpStatus.CREATED).json({
      message: 'Customer successfully created',
      customerCreated
    });

  }

  @Put('/:id')
  async updateCustomer(@Res() res, @Param('id') id: string, @Body() customer: Customer) {

    const customerUpdated = await this._customerService.update(id, customer);

    res.status(HttpStatus.OK).json({
      message: 'Customer successfully updated',
      customerUpdated
    });
  }

  @Delete('/:id')
  async deleteCustomer( @Res() res, @Param('id') id: string ) {

    const customerDeleted = await this._customerService.delete(id);

    res.status(HttpStatus.OK).json({
      message: 'Customer successfully deleted',
      customerDeleted
    });
    
  }

}
