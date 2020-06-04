import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('hn_equipments')
export class hnEquipment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    

}