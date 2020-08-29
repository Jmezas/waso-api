import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Status } from '../../../../common/status.enum';
import { MpEquipment } from './mp-equipment.entity';

@Entity('mp_technical_report')
export class MpTechnicalReport {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    pool_length: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    pool_width: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    pool_depth_1: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    pool_depth_2: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    pool_volume: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    filter_type: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    filter_model: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    filter_brand: string;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    inlet_pipe_measure: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    outlet_pipe_measure: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    heating: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    heater_type: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    heater_model: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    heater_brand: string;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    solar_colors: number;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(
        type => MpEquipment,
        mp_equipment => mp_equipment.mp_technical_report,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'mp_equipment_id' })
    mp_equipment: MpEquipment;

}