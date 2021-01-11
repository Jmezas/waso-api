import { Injectable, Inject } from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { Material } from './local/material.entity';
import { MaterialExt } from './external/material.entity';
import { MaterialTemp } from './local/material_temp.entity';
import { Status } from '../common/status.enum';

@Injectable()
export class MaterialService {

    /**
     *
     */
    constructor(
        @Inject('MATERIAL_REPOSITORY')
        private materialRepository: Repository<Material>,
        @Inject('MATERIAL_TEMP_REPOSITORY')
        private materialTempRepository: Repository<MaterialTemp>,
        @Inject('MATERIAL_EXT_REPOSITORY')
        private materialExtRepository: Repository<MaterialExt>
    ) { }

    async getAll( skip: number ): Promise<[Material[], Number]> {

        const [materials, totalRecords] = await this.materialRepository.findAndCount({
            where: { status: Status.ACTIVE },
            skip,
            order: { code: 'ASC' },
            take: 10
        });

        return [materials, totalRecords];
    }

    async getExternalData() {

        /** Select data external db */
        const materials_ext = await this.materialExtRepository.find();

        if ( materials_ext.length < 0 ) {
            return console.log('No existen datos en la DB externa');
        }

         /** Delete data temporal table */
        await this.materialTempRepository.createQueryBuilder()
                                        .delete()
                                        .from(MaterialTemp)
                                        .execute();
        
        /** Insert new data into temporal table */
        await materials_ext.forEach( me => {

            this.materialTempRepository.createQueryBuilder()
                                        .insert()
                                        .into(MaterialTemp)
                                        .values({
                                            code: me.CVE_ART,
                                            description: me.DESCR,
                                            price: me.PRECIO
                                        })
                                        .execute();
        });

    }

    async updateInternalData() {

        const materials_temp = await this.materialTempRepository.createQueryBuilder('material_temp')
                                                                .innerJoin(Material, 'material', 'material_temp.code = material.code')
                                                                .where('material_temp.description <> material.description')
                                                                .orWhere('material_temp.price <> material.price')
                                                                .getMany();

        /** Update data in local table */
        await materials_temp.forEach( mt => {

            this.materialRepository.createQueryBuilder()
                                    .update(Material)
                                    .set({
                                        description: mt.description,
                                        price: mt.price
                                    })
                                    .where('code = :code', { code: mt.code })
                                    .execute();

        });
    }

    async insertInternalData(): Promise<MaterialTemp[]> {

        /** Select leftJoin from temporal table */
        const materials_temp = await this.materialTempRepository.createQueryBuilder('material_temp')
                                    .leftJoin(Material, 'material', 'material_temp.code = material.code')
                                    .where('material.code is null')
                                    .getMany();


        /** Insert into diference data */
        await materials_temp.forEach( mt => {

            this.materialRepository.createQueryBuilder()
                                    .insert()
                                    .into(Material)
                                    .values({
                                        code: mt.code,
                                        description: mt.description,
                                        price: mt.price
                                    })
                                    .execute();
        });

        return materials_temp;

    }

    async getMaterialExternal() {

        await this.getExternalData();

        await this.updateInternalData();

        return await this.insertInternalData();
                          
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
