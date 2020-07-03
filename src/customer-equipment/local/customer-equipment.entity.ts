import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Status } from '../../common/status.enum';
import { Equipment } from '../../equipment/local/equipment.entity';

@Entity('customer_equipments')
export class CustomerEquipment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Atributo consumido desde la DB Client
    @Column({ type: 'varchar', length: 50 })
    customer_id: string;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(
        type => Equipment,
        equipment => equipment.customer_equipments,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'equipment_id' })
    equipment: Equipment

}