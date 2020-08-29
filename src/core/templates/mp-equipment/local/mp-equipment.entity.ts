import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Status } from '../../../../common/status.enum';
import { Order } from '../../../order/local/order.entity';
import { Equipment } from '../../../../equipment/local/equipment.entity';
import { MpTechnicalReport } from './mp-technical-report.entity';
import { MpComplenentaryData } from './mp-complementary-data.entity';

@Entity('mp_equipment')
export class MpEquipment {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ type: 'varchar', length: 100, nullable: true })
    model: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    hp: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    voltage: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    ampereage: string;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    suction_measure: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    discharge_measure: number;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(
        type => Order,
        order => order.mp_equipment,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(
        type => Equipment,
        equipment => equipment.mp_equipments,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'equipment_id' })
    equipment: Equipment;

    @OneToOne(
        type => MpTechnicalReport,
        mp_technical_report => mp_technical_report.mp_equipment
    )
    mp_technical_report: MpTechnicalReport;

    @OneToOne(
        type => MpComplenentaryData,
        mp_complementary_data => mp_complementary_data.mp_equipment
    )
    mp_complementary_data: MpComplenentaryData;

}