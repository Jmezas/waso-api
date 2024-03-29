import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Equipment } from './local/equipment.entity';
import { Status } from '../common/status.enum';

@Injectable()
export class EquipmentService {

    /**
     *
     */
    constructor(
        @Inject('EQUIPMENT_REPOSITORY')
        private equipmentRepository: Repository<Equipment>
    ) { }

    async getAll( skip: number, all: string, take: number ): Promise<[Equipment[], Number]> {

        if (!take) {

            const [equipments, totalRecords] = await this.equipmentRepository.findAndCount({
                where: { status: Status.ACTIVE },
                relations: ['service_type', 'customer_equipments']
            });

            return [equipments, totalRecords];

        }

        else {

            if (!all) {

                const [equipments, totalRecords] = await this.equipmentRepository.findAndCount({
                    where: { status: Status.ACTIVE },
                    relations: ['service_type', 'customer_equipments'],
                    skip,
                    take
                });

                return [equipments, totalRecords];

            } else {

                if (all === 'true') {

                    const [equipments, totalRecords] = await this.equipmentRepository.findAndCount({
                        relations: ['service_type', 'customer_equipments'],
                        skip,
                        take
                    });

                    return [equipments, totalRecords];

                } else {

                    const [equipments, totalRecords] = await this.equipmentRepository.findAndCount({
                        where: { status: Status.ACTIVE },
                        relations: ['service_type', 'customer_equipments'],
                        skip,
                        take
                    });

                    return [equipments, totalRecords];

                }
            }

        }

    }

    async getByServiceType( service_type_id: string ): Promise<Equipment[]> {

        const equipments = await this.equipmentRepository.find({
            where: { 
                status: Status.ACTIVE,
                service_type: service_type_id
            }
        });

        return equipments;

    }

    async get(id: string): Promise<Equipment> {

        const equipment = await this.equipmentRepository.findOne(id, {
            where: { status: Status.ACTIVE }
        });

        return equipment;
    }

    async create(equipment: Equipment): Promise<Equipment> {

        const equipmentCreated = await this.equipmentRepository.save(equipment);

        return equipmentCreated;
    }

    async update(id: string, equipment: Equipment): Promise<Equipment> {

        if (!id) {
            throw new BadRequestException('The resource ID was not sent')
        }

        const equipmentDb: Equipment = await this.equipmentRepository.findOne(id, {
            where: { status: Status.ACTIVE }
        });

        if (!equipmentDb) {
            throw new NotFoundException('The requested resource was not found')
        }

        await this.equipmentRepository.update(id, equipment);

        const equipmentUpdated = await this.equipmentRepository.findOne(id);

        return equipmentUpdated;
    }

    async delete(id: string): Promise<Equipment> {

        if (!id) {
            throw new BadRequestException('The resource ID was not sent')
        }

        const equipmentDb: Equipment = await this.equipmentRepository.findOne(id, {
            where: { status: Status.ACTIVE }
        });

        if (!equipmentDb) {
            throw new NotFoundException('The requested resource was not found')
        }

        await this.equipmentRepository.update(id, {
            status: Status.INACTIVE
        });

        const equipmentDeleted = await this.equipmentRepository.findOne(id);

        return equipmentDeleted;

    }
}
