import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
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

    async get(id: string): Promise<Material> {

        const material = await this.materialRepository.findOne(id, {
            where: { status: Status.ACTIVE }
        });

        return material;
    }
}
