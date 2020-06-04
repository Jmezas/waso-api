import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Status } from '../../../common/status.enum';
import { Order } from '../../order/local/order.entity';

@Entity('service_types')
export class ServiceType {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    description: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    prefix_db: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    name_db: string;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(
        type => Order,
        order => order.service_type
    )
    orders: Order[];

}