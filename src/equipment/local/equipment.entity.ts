import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Status } from '../../common/status.enum';
import { HnEquipment } from '../../core/templates/hn-equipment/local/hn-equipment.entity';
import { CustomerEquipment } from '../../customer-equipment/local/customer-equipment.entity';
import { ServiceType } from '../../core/service-type/local/service-type.entity';
import { MpEquipment } from '../../core/templates/mp-equipment/local/mp-equipment.entity';
import { GhEquipment } from '../../core/templates/gh-equipment/local/gh-equipment.entity';
import { EhEquipment } from '../../core/templates/eh-equipment/local/eh-equipment.entity';

@Entity('equipments')
export class Equipment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    type: string;

    @Column({ type: 'varchar', length: 100 })
    brand: string;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(
        type => ServiceType,
        service_type => service_type.equipments,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'service_type_id' })
    service_type: ServiceType

    @OneToMany(
        type => HnEquipment,
        hn_equipment => hn_equipment.equipment
    )
    hn_equipments: HnEquipment[];

    @OneToMany(
        type => MpEquipment,
        mp_equipment => mp_equipment.equipment
    )
    mp_equipments: MpEquipment[];

    @OneToMany(
        type => GhEquipment,
        gh_equipment => gh_equipment.equipment
    )
    gh_equipments: GhEquipment[];

    @OneToMany(
        type => EhEquipment,
        eh_equipment => eh_equipment.equipment
    )
    eh_equipments: EhEquipment[];

    @OneToMany(
        type => CustomerEquipment,
        customer_equipment => customer_equipment.equipment
    )
    customer_equipments: CustomerEquipment[];

}