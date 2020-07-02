import { Controller, Res, HttpStatus, Param, Get, Query } from '@nestjs/common';
import { MaterialService } from './material.service';

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
}
