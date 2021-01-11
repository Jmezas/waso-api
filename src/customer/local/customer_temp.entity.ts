import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('customers_temp')
export class CustomerTemp {

    @PrimaryColumn({ type: 'varchar' })
    clave: string;

    @Column({ type: 'varchar' })
    full_name: string;

    @Column({ type: 'varchar', nullable: true })
    nit: string;

    @Column({ type: 'varchar', nullable: true })
    address: string;

    @Column({ type: 'varchar', nullable: true })
    telephone: string;
    
    @Column({ type: 'varchar', nullable: true })
    email: string;
    
}