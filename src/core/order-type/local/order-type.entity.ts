import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Status } from '../../../common/status.enum';

@Entity('order_types')
export class OrderType {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    description: string;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

}