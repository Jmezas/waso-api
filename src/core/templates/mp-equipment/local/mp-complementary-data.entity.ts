import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Status } from '../../../../common/status.enum';
import { MpEquipment } from './mp-equipment.entity';

@Entity('mp_complementary_data')
export class MpComplenentaryData {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'boolean', default: false })
    timer: boolean;

    @Column({ type: 'varchar', length: 100, nullable: true })
    timer_description: string;

    @Column({ type: 'boolean', default: false })
    automation: boolean;

    @Column({ type: 'varchar', length: 100, nullable: true })
    automation_description: string;

    @Column({ type: 'boolean', default: false })
    lamps: boolean;

    @Column({ type: 'varchar', length: 100, nullable: true })
    lamps_description: string;

    @Column({ type: 'boolean', default: false })
    laminares: boolean;

    @Column({ type: 'varchar', length: 100, nullable: true })
    laminares_description: string;

    @Column({ type: 'boolean', default: false })
    chlorinator: boolean;

    @Column({ type: 'varchar', length: 100, nullable: true })
    chlorinator_description: string;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    total_hardness: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    total_chlorine: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    free_chlorine: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    ph: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    total_alkalinity: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    salt_water: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    chlorine: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    trichlor: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    algaecide: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    clarifier: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    ph_increaser: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    ph_decreaser: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    pills: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    muriatic_acid: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    salt_stock: string;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(
        type => MpEquipment,
        mp_equipment => mp_equipment.mp_complementary_data,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'mp_equipment_id' })
    mp_equipment: MpEquipment

}