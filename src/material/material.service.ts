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

    async getAll(): Promise<Material[]> {

        const materials = await this.materialRepository.find({
            where: { status: Status.ACTIVE }
        });

        return materials;
    }

    async get(id: string): Promise<Material> {

        const material = await this.materialRepository.findOne(id, {
            where: { status: Status.ACTIVE }
        });

        return material;
    }
}
