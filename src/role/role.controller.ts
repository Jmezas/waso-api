import { Controller, Get, Param, Post, Body, Put, Delete, Res, HttpStatus } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './local/role.entity';

@Controller('roles')
export class RoleController {

    /**
     *
     */
    constructor(
        private readonly _roleService: RoleService
    ) { }

    @Get()
    async getRoles( @Res() res ) {

        const roles = await this._roleService.getAll();

        res.status(HttpStatus.OK).json({
            roles
        });
        
    }

    @Get('/:id')
    async getRole( @Res() res, @Param('id') id: string ) {

        const role = await this._roleService.get(id);

        res.status(HttpStatus.OK).json({
            role
        });
    }

    @Post()
    async createRole( @Res() res, @Body() role: Role ) {

        const roleCreated = await this._roleService.create(role);

        res.status(HttpStatus.CREATED).json({
            message: 'Role successfully created',
            roleCreated
        });
    }

    @Put('/:id')
    async update( @Res() res, @Param('id') id: string, @Body() role: Role ) {

        const roleUpdated = await this._roleService.update(id, role);

        res.status(HttpStatus.OK).json({
            message: 'Role successfully updated',
            roleUpdated
        });

    }

    @Delete('/:id')
    async delete( @Res() res, @Param('id') id: string ) {

        const roleDeleted = await this._roleService.delete(id);

        res.status(HttpStatus.OK).json({
            message: 'Role successfully deleted',
            roleDeleted
        });
    }

}
