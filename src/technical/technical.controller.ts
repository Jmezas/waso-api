import { Controller, Res, HttpStatus, Param, Get, Post, Body, Put, Delete } from '@nestjs/common';
import { TechnicalService } from './technical.service';
import { Technical } from './local/technical.entity';

@Controller('technicians')
export class TechnicalController {

    /**
     *
     */
    constructor(
        private readonly _technicalService: TechnicalService
    ) { }

    @Get()
    async getTechnicians( @Res() res ) {

        const technicians = await this._technicalService.getAll();

        res.status(HttpStatus.OK).json({
            technicians
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
