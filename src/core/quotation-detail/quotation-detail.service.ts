import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QuotationDetail } from './local/quotation-detail.entity';

@Injectable()
export class QuotationDetailService {

    /**
     *
     */
    constructor(
        @Inject('QUOTATION_DETAIL_REPOSITORY')
        private quotationDetailRepository: Repository<QuotationDetail>
    ) { }

    async getAll(quotation_id: string): Promise<QuotationDetail[]> {

        const quotationDetails = await this.quotationDetailRepository.find({
            where: { quotation: quotation_id },
            relations: ['quotation', 'material']
        });

        return quotationDetails;
    }

    async create(quotation_detail: QuotationDetail): Promise<QuotationDetail> {

        const quotationDetailCreated = await this.quotationDetailRepository.save(quotation_detail);

        return quotationDetailCreated;

    }

    async update(id: string, quotation_detail: QuotationDetail): Promise<QuotationDetail> {

        if (!id) {
          throw new BadRequestException('The resource ID was not sent');
        }
    
        const quotationDetailDb: QuotationDetail = await this.quotationDetailRepository.findOne(id);
    
        if (!quotationDetailDb) {
          throw new NotFoundException('The requested resource was not found');
        }

        await this.quotationDetailRepository.update(id, quotation_detail);

        const quotationDetailUpdated = await this.quotationDetailRepository.findOne(id);

        return quotationDetailUpdated;
    }

    async delete(id: string): Promise<QuotationDetail> {

        if (!id) {
          throw new BadRequestException('The resource ID was not sent');
        }
    
        const quotationDetailDb: QuotationDetail = await this.quotationDetailRepository.findOne(id);
    
        if (!quotationDetailDb) {
          throw new NotFoundException('The requested resource was not found');
        }

        await this.quotationDetailRepository.delete(id);

        return quotationDetailDb;

    }
}
