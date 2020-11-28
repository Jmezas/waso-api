import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { EhEquipment } from './eh-equipment.entity';

@Entity('eh_operating_data')
export class EhOperatingData {

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
        type => EhEquipment,
        eh_equipment => eh_equipment.eh_operating_data,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'eh_equipment_id' })
    eh_equipment: EhEquipment;

}