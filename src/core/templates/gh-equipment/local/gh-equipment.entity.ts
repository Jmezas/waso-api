import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Status } from '../../../../common/status.enum';
import { Order } from '../../../order/local/order.entity';
import { Equipment } from '../../../../equipment/local/equipment.entity';
import { GhReviewData } from './gh-review-data.entity';
import { GhOperatingData } from './gh-operating-data.entity';
import { HeaterType } from '../../heater-type/local/heater-type.entity';

@Entity('gh_equipment')
export class GhEquipment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    btu: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    capacity: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    model: string;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    voltage: number;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(
        type => Order,
        order => order.gh_equipment,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(
        type => Equipment,
        equipment => equipment.gh_equipments,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'equipment_id' })
    equipment: Equipment;

    @ManyToOne(
        type => HeaterType,
        heater_type => heater_type.gh_equipments,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'heater_type_id' })
    heater_type: HeaterType;

    @OneToOne(
        type => GhReviewData,
        gh_review_data => gh_review_data.gh_equipment
    )
    gh_review_data: GhReviewData;

    @OneToOne(
        type => GhOperatingData,
        gh_operating_data => gh_operating_data.gh_equipment
    )
    gh_operating_data: GhOperatingData;

}