import { Controller, Get, Res, Param, Post, Body, HttpStatus, Put, Delete } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './local/user.entity';

import { validate } from 'class-validator';

@Controller('users')
export class UserController {

    /**
     *
     */
    constructor(
        private readonly _userService: UserService
    ) { }

    @Get()
    async getUsers( @Res() res ) {

        const users = await this._userService.getAll();

        res.status(HttpStatus.OK).json({
            users
        });

    }

    @Get('/:id')
    async getUser( @Res() res, @Param('id') id: string ) {

        const user = await this._userService.get(id);

        res.status(HttpStatus.OK).json({
            user
        });
    }

    // TODO: Luego se realizará refactor para crear el registro de usuarios en el modulo auth
    @Post()
    async create( @Res() res, @Body() user: User ) {

        // validate(user).then(errors => { // errors is an array of validation errors
        //     if (errors.length > 0) {

        //         console.log('Validate errors', errors);

        //         return res.status(HttpStatus.BAD_REQUEST).json({
        //             message: 'error',
        //             errors
        //         });
        //     } else {
        //         console.log('No ingrese al IF de errors');
        //     }
        // });

        const userCreated = await this._userService.create(user);

        res.status(HttpStatus.CREATED).json({
            message: 'User successfully created',
            userCreated
        });
    }

    @Put('/:id')
    async update( @Res() res, @Param('id') id: string, @Body() user: User ) {

        const userUpdated = await this._userService.update(id, user);

        res.status(HttpStatus.OK).json({
            message: 'User successfully updated',
            userUpdated
        });
    }

    @Delete('/:id')
    async delete( @Res() res, @Param('id') id: string ) {

        const userDeleted = await this._userService.delete(id);

        res.status(HttpStatus.OK).json({
            message: 'User successfully deleted',
            userDeleted
        });
    }
}