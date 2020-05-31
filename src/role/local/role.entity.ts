import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { MinLength, MaxLength, IsEmail, IsInt, Length } from 'class-validator';
import { Status } from '../../common/status.enum';

@Entity('roles')
export class Role {
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
  name: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: string;
}
