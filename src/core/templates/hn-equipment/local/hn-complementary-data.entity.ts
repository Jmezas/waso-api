import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Status } from '../../../../common/status.enum';
import { HnEquipment } from './hn-equipment.entity';

@Entity('hn_complementary_data')
export class HnComplementaryData {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'boolean', default: false })
    outdoor_equipment: boolean;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    cistern_height: number;

    @Column({ type: 'int', nullable: true })
    cistern_width: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    cistern_length: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    watertank_capacity: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    suction_pipe_size: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    discharge_pipe_size: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    booth_height: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    booth_width: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    booth_depth: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    door_height: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    door_width: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    door_depth: number;

    @Column({ type: 'boolean', default: false })
    underground: boolean;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(
        type => HnEquipment,
        hn_equipment => hn_equipment.hn_complementary_data,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'hn_equipment_id' })
    hn_equipment: HnEquipment

}