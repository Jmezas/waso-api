import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { MinLength, MaxLength } from 'class-validator';
import { Order } from '../../core/order/local/order.entity';
import { CustomerEquipment } from '../../customer-equipment/local/customer-equipment.entity';
import { User } from '../../user/local/user.entity';
import { Status } from '../../common/status.enum';

@Entity('customers')
export class Customer {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 10 })
  legacy_code: string;

  @Column({ type: 'varchar', length: 150 })
  @MinLength(3, {
    message: 'El campo $property debe tener al menos $constraint1 caracteres.',
  })
  @MaxLength(150, {
    message:
      'El campo $property debe tener como máximo $constraint1 caracteres.',
  })
  full_name: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  nit: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  telephone: string;
  
  @Column({ type: 'varchar', length: 150, nullable: true })
  email: string;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: string;

  @ManyToOne(
    type => User,
    user => user.customers,
    {
      nullable: true
    }
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Relación con la DB propia
  @OneToMany(
    type => Order,
    order => order.customer
  )
  orders: Order[];

  // Relación con la DB propia
  @OneToMany(
    type => CustomerEquipment,
    customer_equipment => customer_equipment.customer
  )
  customer_equipments: CustomerEquipment[];

}
