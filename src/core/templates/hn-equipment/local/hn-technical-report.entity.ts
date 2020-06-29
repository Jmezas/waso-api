import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Status } from '../../../../common/status.enum';
import { HnEquipment } from './hn-equipment.entity';

@Entity('hn_technical_report')
export class HnTechnicalReport {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'boolean', default: false })
    manometer: boolean;

    @Column({ type: 'int', nullable: true })
    pressure_range: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    pressure_type: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    starter_platinum: string;

    @Column({ type: 'boolean', default: false })
    start_capacitor: boolean;

    @Column({ type: 'varchar', length: 100, nullable: true })
    capacity_capacitor: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    hydropneumatic: string;
    
    @Column({ type: 'varchar', length: 100, nullable: true })
    brand: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    model: string;

    @Column({ type: 'int', nullable: true })
    gallon_capacity: number;

    @Column({ type: 'int', nullable: true })
    calibration: number;

    @Column({ type: 'boolean', default: false })
    board_flipon: boolean;

    @Column({ type: 'varchar', length: 100, nullable: true })
    flipon_capacity: string;

    @Column({ type: 'boolean', default: false })
    voltage_protector: boolean;

    @Column({ type: 'boolean', default: false })
    spring_check: boolean;

    @Column({ type: 'boolean', default: false })
    ball_valve: boolean;

    @Column({ type: 'boolean', default: false })
    levelguard: boolean;

    @Column({ type: 'boolean', default: false })
    float: boolean;

    @Column({ type: 'int', nullable: true })
    float_measure: number;

    @Column({ type: 'boolean', default: false })
    float_valve: boolean;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(
        type => HnEquipment,
        hn_equipment => hn_equipment.hn_technical_report,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'hn_equipment_id' })
    hn_equipment: HnEquipment;

}