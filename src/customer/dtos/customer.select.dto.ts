import { Exclude, Expose } from "class-transformer";
import { IsString, IsNumber } from "class-validator";

import { Status } from '../../common/status.enum';

@Exclude()
export class CustomerSelectDTO {

    @Expose()
    @IsString()
    readonly id: string;

    @Expose()
    get Text(): string {
        return `${this.first_name} ${this.last_name}`;
    }

    @Exclude()
    @IsString()
    readonly first_name: string;

    @Exclude()
    @IsString()
    readonly last_name: string;

    @Exclude()
    @IsString()
    readonly nit: string;

    @Exclude()
    @IsString()
    readonly address: string;

    @Exclude()
    @IsNumber()
    readonly phone: number;

    @Exclude()
    @IsString()
    readonly email: string;

    @Exclude()
    readonly status: Status;
    
}