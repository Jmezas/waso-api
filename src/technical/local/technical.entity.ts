import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { MinLength, MaxLength, IsInt, Length, IsEmail } from 'class-validator';
import { Status } from '../../common/status.enum';
import { Expose } from 'class-transformer';

// Model-Relations
import { Order } from '../../core/order/local/order.entity';
import { User } from '../../user/local/user.entity';

@Entity('technicians')
export class Technical {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    // TODO: Probar funcionalidad de Expose en DTO
    // @Expose()
    // get text(): string {
    //     return `${this.first_name} ${this.last_name}`;
    // }

    @Column({ type: 'varchar', length: 75 })
    @MinLength(3, {
        message: 'El campo $property debe tener al menos $constraint1 caracteres.',
    })
    @MaxLength(75, {
        message:
            'El campo $property debe tener como máximo $constraint1 caracteres.',
    })
    first_name: string;

    @Column({ type: 'varchar', length: 100 })
    @MinLength(3, {
        message: 'El campo $property debe tener al menos $constraint1 caracteres.',
    })
    @MaxLength(100, {
        message:
            'El campo $property debe tener como máximo $constraint1 caracteres.',
    })
    last_name: string;

    @Column({ type: 'varchar', length: 25 })
    nit: string;

    @Column({ type: 'varchar', length: 500 })
    address: string;

    @Column({ type: 'integer', nullable: true })
    @IsInt()
    @Length(8, 8)
    phone: number;

    @Column({ type: 'varchar', length: 150, nullable: true })
    @IsEmail()
    email: string;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(
        type => User,
        user => user.technicians,
        {
            nullable: true
        }
    )
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(
        type => Order,
        order => order.technical
    )
    orders: Order[];

}