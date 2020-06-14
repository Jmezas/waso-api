import { Injectable, Inject, BadRequestException, NotFoundException, Delete } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './local/user.entity';
import { Status } from '../common/status.enum';

@Injectable()
export class UserService {

    /**
     *
     */
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>
    ) { }

    async getAll(): Promise<User[]> {

        const customers: User[] = await this.userRepository.find({
            where: { status: Status.ACTIVE },
            relations: ['role'],
            skip: 0,
            take: 5
        });

        return customers;
    }

    async get(id: string): Promise<User> {

        if (!id) {
            throw new BadRequestException('The resource ID was not sent')
        }

        const user: User = await this.userRepository.findOne(id);

        if (!user) {
            throw new NotFoundException('The requested resource was not found')
        }

        return user;

    }

    async create(user: User): Promise<User> {

        const userCreated = await this.userRepository.save(user);

        return userCreated;

    }

    async update(id: string, user: User): Promise<User> {

        if (!id) {
            throw new BadRequestException('The resource ID was not sent')
        }

        const userDb: User = await this.userRepository.findOne(id);

        if (!userDb) {
            throw new NotFoundException('The requested resource was not found')
        }

        await this.userRepository.update(id, user);

        const userUpdated = await this.userRepository.findOne(id);

        return userUpdated;

    }

    async delete(id: string): Promise<User> {

        if (!id) {
            throw new BadRequestException('The resource ID was not sent')
        }

        const userDb: User = await this.userRepository.findOne(id, {
            where: { status: Status.ACTIVE }
        });

        if (!userDb) {
            throw new NotFoundException('The requested resource was not found')
        }

        await this.userRepository.update(id, {
            status: Status.INACTIVE
        });

        const userDeleted = await this.userRepository.findOne(id);

        return userDeleted;

        
    }





}
