import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Status } from '../../common/status.enum';
import { Equipment } from '../../equipment/local/equipment.entity';
import { Customer } from '../../customer/external/customer.entity';

@Entity('customer_equipments')
export class CustomerEquipment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Atributo consumido desde la DB Client
    // @Column({ type: 'varchar', length: 50 })
    // customer_id: string;

    @Column({ type: 'int' })
    equipment_number: number;

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

    // Relación con la DB Propia
    @ManyToOne(
        type => Customer,
        customer => customer.customer_equipments,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

}