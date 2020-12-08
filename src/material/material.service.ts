import { Injectable, Inject } from '@nestjs/common';
import { Brackets, QueryBuilder, Repository } from 'typeorm';
import { Material } from './external/material.entity';
import { Status } from '../common/status.enum';

@Injectable()
export class MaterialService {

    /**
     *
     */
    constructor(
        @Inject('MATERIAL_REPOSITORY')
        private materialRepository: Repository<Material>
    ) { }

    async getAll( skip: number ): Promise<[Material[], Number]> {

        const [materials, totalRecords] = await this.materialRepository.findAndCount({
            where: { status: Status.ACTIVE },
            skip,
            take: 10
        });

        return [materials, totalRecords];
    }

    async getByName( searchTerm: string ): Promise<Material[]> {

        const status = Status.INACTIVE;

        const materials = await this.materialRepository
                .createQueryBuilder('material')
                .where('material.status <> :status', { status })
                .andWhere(new Brackets(qb => {
                    qb.where('material.description like :searchTerm', { searchTerm })
                }))
                .getMany();
        
        return materials;

    }

    async get(id: string): Promise<Material> {

        const material = await this.materialRepository.findOne(id, {
            where: { status: Status.ACTIVE }
        });

        return material;
    }
    
    async getByCode(code: string): Promise<Material[]> {

        const material = await this.materialRepository.find({
            where: { code, status: Status.ACTIVE },
        });

        return material;
    }
}
