import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { EhEquipment } from './eh-equipment.entity';

@Entity('eh_review_data')
export class EhReviewData {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    resistance: string;
    
    @Column({ type: 'varchar', length: 100, nullable: true })
    thermostat: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    sensors: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    spike: string;
    
    @Column({ type: 'varchar', length: 100, nullable: true })
    outlet: string;
    
    @Column({ type: 'varchar', length: 100, nullable: true })
    contactor: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    timer: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    breaker_flip_on: string;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    amps_flip_on: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    wire_gauge: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    wiring_distance_flip_on: number;

    @Column({ type: 'boolean', default: false })
    electronic_card: boolean;

    @Column({ type: 'boolean', default: false })
    capacitors: boolean;

    @Column({ type: 'boolean', default: false })
    flow_switch: boolean;

    @Column({ type: 'varchar', length: 100, nullable: true })
    fan: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    serpentine: string;

    @Column({ type: 'boolean', default: false })
    inlet_filter: boolean;

    @Column({ type: 'varchar', length: 100, nullable: true })
    inlet_filter_type: string;

    @Column({ type: 'boolean', default: false })
    outlet_filter: boolean;

    @Column({ type: 'varchar', length: 100, nullable: true })
    outlet_filter_type: string;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    water_pipe_diameter: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    water_pipe_type: string;

    @Column({ type: 'boolean', default: false })
    checks_installation: boolean;

    @Column({ type: 'boolean', default: false })
    valves_pipe: boolean;

    @Column({ type: 'boolean', default: false })
    by_pass_pipe: boolean;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    refrigerant_gas_pressure: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    high_operating_gas_pressure: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    low_operating_gas_pressure: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    sacrificial_anode: string;

    @Column({ type: 'boolean', default: false })
    leak_pipes: boolean;

    @Column({ type: 'boolean', default: false })
    internal_water_leak: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(
        type => EhEquipment,
        eh_equipment => eh_equipment.eh_review_data,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'eh_equipment_id' })
    eh_equipment: EhEquipment;

}