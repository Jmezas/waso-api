import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('VISTA_INVENTARIO')
export class MaterialExt {

    @PrimaryGeneratedColumn('rowid')
    CVE_ART: string;

    @Column({ type: 'varchar' })
    DESCR: string;

    @Column({ type: 'float' })
    EXIST: number;

    @Column({ type: 'decimal', precision: 16, scale: 2 })
    PRECIO: number;

}