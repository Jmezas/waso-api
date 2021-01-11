import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('VISTA_CLIENTES')
export class CustomerExt {

  @PrimaryGeneratedColumn('rowid')
  CLAVE: string;

  @Column({ type: 'varchar' })
  STATUS: string;

  @Column({ type: 'varchar' })
  NOMBRE: string;

  // nit del cliente
  @Column({ type: 'varchar' })
  RFC: string;

  @Column({ type: 'varchar' })
  CALLE: string;

  @Column({ type: 'varchar' })
  NUMINT: string;

  @Column({ type: 'varchar' })
  NUMEXT: string;

  @Column({ type: 'varchar' })
  CRUZAMIENTOS: string;
  
  @Column({ type: 'varchar' })
  COLONIA: string;

  @Column({ type: 'varchar' })
  CODIGO: string;

  @Column({ type: 'varchar' })
  LOCALIDAD: string;

  @Column({ type: 'varchar' })
  MUNICIPIO: string;

  @Column({ type: 'varchar' })
  ESTADO: string;

  @Column({ type: 'varchar' })
  PAIS: string;

  @Column({ type: 'varchar' })
  TELEFONO: string;

  @Column({ type: 'varchar' })
  CLASIFIC: string;

  @Column({ type: 'varchar' })
  PAG_WEB: string;

  @Column({ type: 'varchar' })
  CVE_VEND: string;

  @Column({ type: 'varchar' })
  ULT_VENTAD: string;

  @Column({ type: 'datetime' })
  FCH_ULTCOM: Date;

}
