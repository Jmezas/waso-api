import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Status } from '../../../../common/status.enum';
import { Order } from '../../../order/local/order.entity';
import { Equipment } from '../../../../equipment/local/equipment.entity';
import { HeaterType } from '../../heater-type/local/heater-type.entity';
import { EhReviewData } from './eh-review-data.entity';
import { EhOperatingData } from './eh-operating-data.entity';

@Entity('eh_equipment')
export class EhEquipment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    model: string;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    capacity: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    power: number;

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
        order => order.eh_equipment,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(
        type => Equipment,
        equipment => equipment.eh_equipments,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'equipment_id' })
    equipment: Equipment;

    @ManyToOne(
        type => HeaterType,
        heater_type => heater_type.eh_equipments,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'heater_type_id' })
    heater_type: HeaterType;

    @OneToOne(
        type => EhReviewData,
        eh_review_data => eh_review_data.eh_equipment
    )
    eh_review_data: EhReviewData;

    @OneToOne(
        type => EhOperatingData,
        eh_operating_data => eh_operating_data.eh_equipment
    )
    eh_operating_data: EhOperatingData;

}