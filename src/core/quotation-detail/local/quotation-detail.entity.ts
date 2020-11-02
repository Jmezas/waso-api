import { type } from "os";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Status } from '../../../common/status.enum';
import { Quotation } from '../../quotation/local/quotation.entity';
import { Material } from '../../../material/external/material.entity';

@Entity('quotation-details')
export class QuotationDetail {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @Column({ type: 'varchar', length: 500, nullable: true })
    // material_description: string;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(
        type => Quotation,
        quotation => quotation.quotation_details,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'quotation_id' })
    quotation: Quotation;

    @ManyToOne(
        type => Material,
        material => material.quotation_details,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'material_id' })
    material: Material;
    
}