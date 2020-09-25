import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Status } from '../common/status.enum';

import { Technical } from './local/technical.entity';

@Injectable()
export class TechnicalService {

    /**
     *
     */
    constructor(
        @Inject('TECHNICAL_REPOSITORY')
        private technicalRepository: Repository<Technical>
    ) { }

    async getAll( skip: number, all: string, take: number ): Promise<[Technical[], Number]> {

        if (!take) {

            const [technicians, totalRecords] = await this.technicalRepository.findAndCount({
                where: { status: Status.ACTIVE },
                relations: ['user']
            });

            return [technicians, totalRecords];
        }

        else {

            if (!all) {
    
                const [technicians, totalRecords] = await this.technicalRepository.findAndCount({
                    where: { status: Status.ACTIVE },
                    relations: ['user'],
                    skip,
                    take
                });
        
                return [technicians, totalRecords];
    
            } else {
    
                if (all === 'true') {
    
                    const [technicians, totalRecords] = await this.technicalRepository.findAndCount({
                        relations: ['user'],
                        skip,
                        take
                    });
    
                    return [technicians, totalRecords];
    
                } else {
    
                    const [technicians, totalRecords] = await this.technicalRepository.findAndCount({
                        where: { status: Status.ACTIVE },
                        relations: ['user'],
                        skip,
                        take
                    });
    
                    return [technicians, totalRecords];
                    
                }
            }

        }

    }

    // TODO: Servicio para selectAll

    async get(id: string): Promise<Technical> {

        const technical: Technical = await this.technicalRepository.findOne(id, {
            where: { status: Status.ACTIVE },
            relations: ['user'],
        });

        return technical;
    }

    async create(technical: Technical): Promise<Technical> {

        const technicalCreated = await this.technicalRepository.save(technical);

        return technicalCreated;
    }

    async update(id: string, technical: Technical): Promise<Technical> {

        if (!id) {
            throw new BadRequestException('The resource ID was not sent')
        }

        const technicalDb: Technical = await this.technicalRepository.findOne(id, {
            where: { status: Status.ACTIVE }
        });

        if (!technicalDb) {
            throw new NotFoundException('The requested resource was not found')
        }

        await this.technicalRepository.update(id, technical);

        const technicalUpdated = await this.technicalRepository.findOne(id);

        return technicalUpdated;
    }

    async delete(id: string): Promise<Technical> {

        if (!id) {
            throw new BadRequestException('The resource ID was not sent')
        }

        const technicalDb: Technical = await this.technicalRepository.findOne(id, {
            where: { status: Status.ACTIVE }
        });

        if (!technicalDb) {
            throw new NotFoundException('The requested resource was not found')
        }

        await this.technicalRepository.update(id, {
            status: Status.INACTIVE
        });

        const technicalDeleted = await this.technicalRepository.findOne(id);
        
        return technicalDeleted;
    }
}
