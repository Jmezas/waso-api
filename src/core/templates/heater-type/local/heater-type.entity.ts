import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { GhEquipment } from '../../gh-equipment/local/gh-equipment.entity';
import { Heater_Type } from '../../../../common/heater-type.enum';
import { EhEquipment } from '../../eh-equipment/local/eh-equipment.entity';

@Entity('heater_type')
export class HeaterType {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: Heater_Type })
    description: Heater_Type;

    @OneToMany(
        type => GhEquipment,
        gh_equipment => gh_equipment.heater_type
    )
    gh_equipments: GhEquipment[];

    @OneToMany(
        type => EhEquipment,
        eh_equipment => eh_equipment.heater_type
    )
    eh_equipments: EhEquipment[];

}