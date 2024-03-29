import { Controller, Get, Res, HttpStatus, Param, Post, Body, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { Equipment } from './local/equipment.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('equipments')
export class EquipmentController {

    /**
     *
     */
    constructor(
        private readonly _equipmentService: EquipmentService
    ) { }

    @Get()
    async getEquipments( @Res() res, @Query('skip') skip: number, @Query('all') all: string, @Query('take') take: number ) {

        const [equipments, totalRecords] = await this._equipmentService.getAll(skip, all, take);

        res.status(HttpStatus.OK).json({
            equipments,
            totalRecords
        });
    }

    @Get('/:service_type')
    async getEquipmentsByServiceType(@Res() res, @Param('service_type') service_type: string) {

        const equipments = await this._equipmentService.getByServiceType(service_type);

        res.status(HttpStatus.OK).json({
            equipments
        });
    }

    @Get('/:id')
    async getEquipment( @Res() res, @Param('id') id: string ) {

        const equipment = await this._equipmentService.get(id);

        res.status(HttpStatus.OK).json({
            equipment
        });

    }

    @Post()
    async createEquipment( @Res() res, @Body() equipment: Equipment ) {

        const equipmentCreated = await this._equipmentService.create(equipment);

        res.status(HttpStatus.CREATED).json({
            equipmentCreated
        });
    }

    @Put('/:id')
    async updateEquipment( @Res() res, @Param('id') id: string, @Body() equipment: Equipment ) {

        const equipmentUpdated = await this._equipmentService.update(id, equipment);

        res.status(HttpStatus.OK).json({
            equipmentUpdated
        });
    }

    @Delete('/:id')
    async deleteEquipment( @Res() res, @Param('id') id: string ) {

        const equipmentDeleted = await this._equipmentService.delete(id);

        res.status(HttpStatus.OK).json({
            equipmentDeleted
        });
    }
}
