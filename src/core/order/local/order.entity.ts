import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { Status } from '../../../common/status.enum';

// Model-Relations
import { Technical } from '../../../technical/local/technical.entity';
import { Customer } from '../../../customer/local/customer.entity';
import { User } from '../../../user/local/user.entity';
import { OrderType } from '../../order-type/local/order-type.entity';
import { ServiceType } from '../../service-type/local/service-type.entity';
import { HnEquipment } from '../../templates/hn-equipment/local/hn-equipment.entity';
import { MpEquipment } from '../../templates/mp-equipment/local/mp-equipment.entity';
import { Quotation } from '../../quotation/local/quotation.entity';
import { GhEquipment } from '../../templates/gh-equipment/local/gh-equipment.entity';
import { EhEquipment } from '../../templates/eh-equipment/local/eh-equipment.entity';

@Entity('orders')
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'int' })
    order_number: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    invoice: string;

    // Atributo consumido desde la DB Client
    // @Column({ type: 'varchar', length: 50 })
    // customer_id: string;

    @Column({ type: 'datetime' })
    execution_date: Date;

    @Column({ type: 'datetime' })
    revision_date: Date;

    @Column({ type: 'int' })
    day_service: number;

    @Column({ type: 'varchar', length: 500 })
    theory_description: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    real_description: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    technical_observation: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    customer_observation: string;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // Relación con la DB Propia
    @ManyToOne(
        type => Customer,
        customer => customer.orders,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(
        type => Technical,
        technical => technical.orders,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'technical_id' })
    technical: Technical;

    @ManyToOne(
        type => User,
        user => user.orders,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(
        type => User,
        user => user.orders,
        {
            nullable: true
        }
    )
    @JoinColumn({ name: 'responsible_user_id' })
    responsible_user: User;


    @ManyToOne(
        type => OrderType,
        order_type => order_type.orders,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'order_type_id' })
    order_type: OrderType;

    @ManyToOne(
        type => ServiceType,
        service_type => service_type.orders,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'service_type_id' })
    service_type: ServiceType;

    @OneToOne(
        type => HnEquipment,
        hn_equipment => hn_equipment.order
    )
    hn_equipment: HnEquipment;

    @OneToOne(
        type => MpEquipment,
        mp_equipment => mp_equipment.order
    )
    mp_equipment: MpEquipment;

    @OneToOne(
        type => GhEquipment,
        gh_equipment => gh_equipment.order
    )
    gh_equipment: GhEquipment;

    @OneToOne(
        type => EhEquipment,
        eh_equipment => eh_equipment.order
    )
    eh_equipment: EhEquipment;

    @OneToMany(
        type => Quotation,
        quotation => quotation.order
    )
    quotations: Quotation[];

}