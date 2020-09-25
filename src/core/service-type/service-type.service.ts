import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ServiceType } from './local/service-type.entity';
import { Status } from '../../common/status.enum';

@Injectable()
export class ServiceTypeService {

    /**
     *
     */
    constructor(
        @Inject('SERVICE_TYPE_REPOSITORY')
        private serviceTypeRepository: Repository<ServiceType>
    ) { }

    async getAll( skip: number, all: string, take: number ): Promise<[ServiceType[], Number]> {

        if (!take) {

            const [serviceTypes, totalRecords] = await this.serviceTypeRepository.findAndCount({
                where: { status: Status.ACTIVE }
            });

            return [serviceTypes, totalRecords];

        }

        else {

            if (!all) {

                const [serviceTypes, totalRecords] = await this.serviceTypeRepository.findAndCount({
                    where: { status: Status.ACTIVE },
                    skip,
                    take
                });

                return [serviceTypes, totalRecords];

            } else {

                if (all === 'true') {

                    const [serviceTypes, totalRecords] = await this.serviceTypeRepository.findAndCount({
                        skip,
                        take
                    });

                    return [serviceTypes, totalRecords];

                } else {

                    const [serviceTypes, totalRecords] = await this.serviceTypeRepository.findAndCount({
                        where: { status: Status.ACTIVE },
                        skip,
                        take
                    });

                    return [serviceTypes, totalRecords];
                }
            }

        }
        
    }

    async get(id: string): Promise<ServiceType> {
        const serviceType: ServiceType = await this.serviceTypeRepository.findOne(id, {
            where: { status: Status.ACTIVE }
        });

        return serviceType;
    }

    async create(serviceType: ServiceType): Promise<ServiceType> {
        const serviceTypeCreated = await this.serviceTypeRepository.save(serviceType);

        return serviceTypeCreated;
    }

    async update(id: string, serviceType: ServiceType): Promise<ServiceType> {
        if (!id) {
            throw new BadRequestException('The resource ID was not sent');
        }

        const serviceTypeDb: ServiceType = await this.serviceTypeRepository.findOne(id, {
            where: { status: Status.ACTIVE },
        });

        if (!serviceTypeDb) {
            throw new NotFoundException('The requested resource was not found');
        }

        await this.serviceTypeRepository.update(id, serviceType);

        const serviceTypeUpdated = await this.serviceTypeRepository.findOne(id);

        return serviceTypeUpdated;
    }

    async delete(id: string): Promise<ServiceType> {
        if (!id) {
            throw new BadRequestException('The resource ID was not sent');
        }

        const serviceTypeDb: ServiceType = await this.serviceTypeRepository.findOne(id, {
            where: { status: Status.ACTIVE },
        });

        if (!serviceTypeDb) {
            throw new NotFoundException('The requested resource was not found');
        }

        await this.serviceTypeRepository.update(id, {
            status: Status.INACTIVE
        });

        const serviceTypeDeleted = await this.serviceTypeRepository.findOne(id);

        return serviceTypeDeleted;

    }
}
