import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { GhEquipment } from './gh-equipment.entity';

@Entity('gh_review_data')
export class GhReviewData {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    gas_preassure: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    low_preassure_regulator: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    burners: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    flame_sensor: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    pilot: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    batteries: string;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    water_pipe_diameter: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    water_pipe_type: string;

    @Column({ type: 'varchar', precision: 8, scale: 2, nullable: true })
    gas_pipe_diameter: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    gas_pipe_type: string;

    @Column({ type: 'boolean', default: false })
    inlet_filter: boolean;

    @Column({ type: 'varchar', length: 100, nullable: true })
    inlet_filter_type: string;

    @Column({ type: 'boolean', default: false })
    outlet_filter: boolean;

    @Column({ type: 'varchar', length: 100, nullable: true })
    outlet_filter_type: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    gas_valve: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    fireplace: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    sacrificial_anode: string;

    @Column({ type: 'boolean', default: false })
    leak_pipes: boolean;

    @Column({ type: 'boolean', default: false })
    relief_valve: boolean;

    @Column({ type: 'boolean', default: false })
    thermostat: boolean;

    @Column({ type: 'boolean', default: false })
    electronic_card: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(
        type => GhEquipment,
        gh_equipment => gh_equipment.gh_review_data,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'gh_equipment_id' })
    gh_equipment: GhEquipment;
    
}