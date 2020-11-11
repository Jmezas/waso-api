import { Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Quotation } from './local/quotation.entity';
import { Status } from '../../common/status.enum';

@Injectable()
export class QuotationService {
  /**
   *
   */
  constructor(
    @Inject('QUOTATION_REPOSITORY')
    private quotationRepository: Repository<Quotation>,
  ) {}

  async getAll(skip: number, all: string): Promise<[Quotation[], Number]> {
    if (!all || all !== 'true') {
      const [
        quotations,
        totalRecords,
      ] = await this.quotationRepository.findAndCount({
        where: { status: Status.ACTIVE },
        relations: ['order', 'quotation_details'],
        skip
      });

      return [quotations, totalRecords];
    } else {
      const [
        quotations,
        totalRecords,
      ] = await this.quotationRepository.findAndCount({
        relations: ['order', 'quotation_details'],
        skip
      });

      return [quotations, totalRecords];
    }
  }

  async get(id: string): Promise<Quotation> {
    const quotation: Quotation = await this.quotationRepository.findOne(id, {
      relations: ['order', 'quotation_details'],
    });

    return quotation;
  }
  
  async getByOrder(order_id: string):Promise<Quotation> {

    let status = Status.ACTIVE;

    const quotation = await this.quotationRepository
          .createQueryBuilder('quotation')
          // .innerJoinAndSelect('quotation.quotation_details', 'quotation_details')
          // .innerJoinAndSelect('quotation_details.material', 'material')
          .where('quotation.order = :order_id', { order_id })
          .andWhere('quotation.status = :status', { status })
          .getOne();
    
    return quotation;
  }

  async create(quotation: Quotation): Promise<Quotation> {
    /** Instanciar el primer número de orden */
    quotation.quotation_number = 1;

    const quotationDb: Quotation[] = await this.quotationRepository.find({
      take: 1,
    });

    if (quotationDb.length > 0) {
      const quotationMaxDb: Quotation[] = await this.quotationRepository.find({
        order: { quotation_number: 'DESC' },
        take: 1,
      });

      quotation.quotation_number = quotationMaxDb[0].quotation_number + 1;
    }

    const quotationCreated = await this.quotationRepository.save(quotation);

    return quotationCreated;
  }

  async update(id: string, quotation: Quotation): Promise<Quotation> {

    if (!id) {
      throw new BadRequestException('The resource ID was not sent');
    }

    const quotationDb: Quotation = await this.quotationRepository.findOne(id, {
      where: { status: Status.ACTIVE },
    });

    if (!quotationDb) {
      throw new NotFoundException('The requested resource was not found');
    }

    await this.quotationRepository.update(id, quotation);

    const quotationCreated = await this.quotationRepository.findOne(id);

    return quotationCreated;

  }

  async delete(id: string): Promise<Quotation> {

    if (!id) {
      throw new BadRequestException('The resource ID was not sent');
    }

    const quotationDb: Quotation = await this.quotationRepository.findOne(id, {
      where: { status: Status.ACTIVE },
    });

    if (!quotationDb) {
      throw new NotFoundException('The requested resource was not found');
    }

    await this.quotationRepository.update(id, {
        status: Status.INACTIVE
    });

    const quotationDeleted = await this.quotationRepository.findOne(id);

    return quotationDeleted;
    
  }

}
