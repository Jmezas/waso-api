import { Controller, Res, HttpStatus, Param, Get, Query, UseGuards } from '@nestjs/common';
import { MaterialService } from './material.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('materials')
export class MaterialController {

    /**
     *
     */
    constructor(
        private readonly _materialService: MaterialService
    ) { }

    @Get()
    async getMaterials( @Res() res, @Query('skip') skip: number ) {

        const [materials, totalRecords] = await this._materialService.getAll(skip);

        res.status(HttpStatus.OK).json({
            materials,
            totalRecords
        });
    }

    @Get('/:id')
    async getMaterial( @Res() res, @Param('id') id: string ) {

        const material = await this._materialService.get(id);

        res.status(HttpStatus.OK).json({
            material
        });
    }

    @Get('/code/:code')
    async getMaterialByCode( @Res() res, @Param('code') code: string ) {

        const material = await this._materialService.getByCode(code);

        res.status(HttpStatus.OK).json({
            material
        });
    }
}
