import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('materials_temp')
export class MaterialTemp {

    @PrimaryColumn({ type: 'varchar', length: 20 })
    code: string;

    @Column({ type: 'varchar', length: 500 })
    description: string;

    @Column({ type: 'decimal', precision: 16, scale: 2 })
    price: number;

}