import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Status } from '../../../../common/status.enum';
import { Order } from '../../../order/local/order.entity';
import { Equipment } from '../../../../equipment/local/equipment.entity';
import { HnComplementaryData } from './hn-complementary-data.entity';
import { HnTechnicalReport } from './hn-technical-report.entity';

@Entity('hn_equipment')
export class HnEquipment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    model: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    serie: string;
    
    @Column({ type: 'varchar', length: 100, nullable: true })
    hp: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    voltage: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    amperage: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    phase: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    voltage_consumption: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    amperage_consumption: string;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(
        type => Order,
        order => order.hn_equipment,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(
        type => Equipment,
        equipment => equipment.hn_equipments,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'equipment_id' })
    equipment: Equipment

    @OneToOne(
        type => HnComplementaryData,
        hn_complementary_data => hn_complementary_data.hn_equipment
    )
    hn_complementary_data: HnComplementaryData;

    @OneToOne(
        type => HnTechnicalReport,
        hn_technical_report => hn_technical_report.hn_equipment
    )
    hn_technical_report: HnTechnicalReport;

    

}