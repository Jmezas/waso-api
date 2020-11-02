import { QuotationDetail } from 'src/core/quotation-detail/local/quotation-detail.entity';
import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Entity, OneToMany } from 'typeorm';
import { Status } from '../../../common/status.enum';
import { Order } from '../../order/local/order.entity';

@Entity('quotations')
export class Quotation {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'int'})
    quotation_number: number;

    @Column({type: 'varchar', length: 500})
    description: string;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(
        type => Order,
        order => order.quotations,
        {
            nullable: true
        }
    )
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @OneToMany(
        type => QuotationDetail,
        quotation_detail => quotation_detail.quotation
    )
    quotation_details: QuotationDetail

}