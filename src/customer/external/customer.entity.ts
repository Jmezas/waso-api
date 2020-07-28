import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MinLength, MaxLength, IsEmail, IsInt, Length } from 'class-validator';
import { Status } from '../../common/status.enum';
import { Order } from '../../core/order/local/order.entity';
import { CustomerEquipment } from '../../customer-equipment/local/customer-equipment.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({ type: 'integer' })
  @IsInt()
  @Length(8, 8)
  phone: number;
  
  @Column({ type: 'varchar', length: 150 })
  @IsEmail()
  email: string;

  // @Column({ type: 'varchar', enum: Status, default: Status.ACTIVE, length: 25 })
  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: string;

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
