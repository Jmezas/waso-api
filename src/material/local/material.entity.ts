import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { QuotationDetail } from '../../core/quotation-detail/local/quotation-detail.entity';
import { Status } from '../../common/status.enum';

@Entity('materials')
export class Material {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 20})
    code: string;

    @Column({ type: 'varchar', length: 500 })
    description: string;

    @Column({type: 'decimal', precision: 16, scale: 2, nullable: true})
    price: number;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: string;

    @OneToMany(
        type => QuotationDetail,
        quotation_detail => quotation_detail.material
    )
    quotation_details: QuotationDetail[];

}