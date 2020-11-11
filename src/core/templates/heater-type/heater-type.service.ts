import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HeaterType } from './local/heater-type.entity';

@Injectable()
export class HeaterTypeService {

    /**
     *
     */
    constructor(
        @Inject('HEATER_TYPE_REPOSITORY')
        private htRepository: Repository<HeaterType>
    ) { }

    async getAll(): Promise<HeaterType[]> {

        const heaterTypes: HeaterType[] = await this.htRepository.find();

        return heaterTypes;

    }
}
