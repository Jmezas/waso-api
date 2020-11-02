import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Status } from '../../common/status.enum';
import { QuotationDetail } from '../../core/quotation-detail/local/quotation-detail.entity';

@Entity('materials')
export class Material {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 20})
    code: string;

    @Column({ type: 'varchar', length: 250 })
    name: string;

    @Column({ type: 'varchar', length: 500 })
    description: string;

    @Column({ type: 'varchar', length: 100 })
    category: string;

    // @Column({ type: 'varchar', enum: Status, default: Status.ACTIVE, length: 25 })
    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: string;

    @OneToMany(
        type => QuotationDetail,
        quotation_detail => quotation_detail.material
    )
    quotation_details: QuotationDetail[];

}