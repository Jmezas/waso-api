import { Controller, Res, HttpStatus, Param, Get } from '@nestjs/common';
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
    async getMaterials( @Res() res ) {

        const materials = await this._materialService.getAll();

        res.status(HttpStatus.OK).json({
            materials
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
