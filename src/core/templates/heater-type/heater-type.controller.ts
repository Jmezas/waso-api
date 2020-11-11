import { Controller, Get, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { HeaterTypeService } from './heater-type.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('heater-types')
export class HeaterTypeController {

    /**
     *
     */
    constructor(
        private readonly _heaterTypeService: HeaterTypeService
    ) { }

    @Get()
    async getHeaterTypes( @Res() res ) {

        const heaterTypes = await this._heaterTypeService.getAll();

        res.status(HttpStatus.OK).json({
            heaterTypes
        });
    }
}
