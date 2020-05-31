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
    async getAll() {
        return await this._roleService.findAll();
    }

    @Get('/:id')
    async get( @Param('id') id: string ) {
        return await this._roleService.find(id);
    }

    @Post()
    async create( @Res() res, @Body() role: Role ) {

        let roleCreated = await this._roleService.create(role);

        res.status(HttpStatus.CREATED).json({
            message: 'Role created successfully',
            roleCreated
        });
    }

    @Put('/:id')
    async update( @Res() res, @Param('id') id: string, @Body() role: Role ) {

        let roleUpdated = await this._roleService.update(id, role);

        res.status(HttpStatus.OK).json({
            message: 'Role updated successfully',
            roleUpdated
        });

    }

    @Delete('/:id')
    async delete( @Res() res, @Param('id') id: string ) {

        let roleDeleted = await this._roleService.delete(id);

        res.status(HttpStatus.OK).json({
            message: 'Role deleted successfully',
            roleDeleted
        });
    }

}
