import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { GhEquipment } from './gh-equipment.entity';

@Entity('gh_operating_data')
export class GhOperatingData {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    outlet_water_temperature: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    room_temperature: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    amperage_consumption: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    voltage_consumption: number;

    @Column({ type: 'boolean', default: false })
    transfer_equipment_workshop: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(
        type => GhEquipment,
        gh_equipment => gh_equipment.gh_operating_data,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'gh_equipment_id' })
    gh_equipment: GhEquipment;
    
}