import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Status } from '../../common/status.enum';
import { HnEquipment } from '../../core/templates/hn-equipment/local/hn-equipment.entity';

@Entity('equipments')
export class Equipment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    type: string;

    @Column({ type: 'varchar', length: 100 })
    brand: string;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(
        type => HnEquipment,
        hn_equipment => hn_equipment.equipment
    )
    hn_equipment: HnEquipment

}