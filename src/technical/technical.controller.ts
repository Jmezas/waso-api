import { Controller, Res, HttpStatus, Param, Get, Post, Body, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { TechnicalService } from './technical.service';
import { Technical } from './local/technical.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('technicians')
export class TechnicalController {

    /**
     *
     */
    constructor(
        private readonly _technicalService: TechnicalService
    ) { }

    @Get()
    async getTechnicians( @Res() res, @Query('skip') skip: number, @Query('all') all: string ) {

        const [technicians, totalRecords] = await this._technicalService.getAll(skip, all);

        res.status(HttpStatus.OK).json({
            technicians,
            totalRecords
        });
    }

    @Get('/:id')
    async getTechnical( @Res() res, @Param('id') id: string ) {

        const technical = await this._technicalService.get(id);

        res.status(HttpStatus.OK).json({
            technical
        });
    }

    @Post()
    async createTechnical( @Res() res, @Body() technical: Technical ) {

        const technicalCreated = await this._technicalService.create(technical);

        res.status(HttpStatus.CREATED).json({
            message: 'Technical successfully created',
            technicalCreated
        });
    }

    @Put('/:id')
    async updateTechnical( @Res() res, @Param('id') id: string, @Body() technical: Technical ) {

        const technicalUpdated = await this._technicalService.update(id, technical);

        res.status(HttpStatus.OK).json({
            message: 'Technical successfully updated',
            technicalUpdated
        });
    }

    @Delete('/:id')
    async deleteTechnical( @Res() res, @Param('id') id: string ) {

        const technicalDeleted = await this._technicalService.delete(id);

        res.status(HttpStatus.OK).json({
            message: 'Technical successfully deleted',
            technicalDeleted
        });

    }
}
