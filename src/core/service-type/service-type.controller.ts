import { Controller, Get, Res, HttpStatus, Param, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { ServiceTypeService } from './service-type.service';
import { ServiceType } from './local/service-type.entity';

@Controller('service-types')
export class ServiceTypeController {

    /**
     *
     */
    constructor(
        private readonly _serviceTypeService: ServiceTypeService
    ) { }

    @Get()
    async getServiceTypes( @Res() res, @Query('skip') skip: number, @Query('all') all: string ) {

        const [serviceTypes, totalRecords] = await this._serviceTypeService.getAll(skip, all);

        res.status(HttpStatus.OK).json({
            serviceTypes,
            totalRecords
        });
    }

    @Get('/:id')
    async getServiceType( @Res() res, @Param('id') id: string ) {

        const serviceType = await this._serviceTypeService.get(id);

        res.status(HttpStatus.OK).json({
            serviceType
        });
    }

    @Post()
    async createServiceType( @Res() res, @Body() serviceType: ServiceType ) {

        const serviceTypeCreated = await this._serviceTypeService.create(serviceType);

        res.status(HttpStatus.CREATED).json({
            serviceTypeCreated
        });
    }

    @Put('/:id')
    async updateServiceType( @Res() res, @Param('id') id: string, @Body() serviceType: ServiceType ) {

        const serviceTypeUpdated = await this._serviceTypeService.update(id, serviceType);

        res.status(HttpStatus.OK).json({
            serviceTypeUpdated
        });
    }

    @Delete('/:id')
    async deleteServiceType( @Res() res, @Param('id') id: string ) {

        const serviceTypeDeleted = await this._serviceTypeService.delete(id);

        res.status(HttpStatus.OK).json({
            serviceTypeDeleted
        });
    }
}
