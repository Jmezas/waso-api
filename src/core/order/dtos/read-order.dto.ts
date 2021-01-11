import { Expose, Type } from 'class-transformer';
import { IsString, IsDate, IsNumber } from 'class-validator';
import { Status } from '../../../common/status.enum';

import { User } from '../../../user/local/user.entity';
import { Customer } from '../../../customer/local/customer.entity';
import { Technical } from '../../../technical/local/technical.entity';
import { OrderType } from '../../order-type/local/order-type.entity';
import { ServiceType } from '../../service-type/local/service-type.entity';

export class ReadOrderDTO {

    @Expose()
    @IsString()
    readonly id: string;

    @Expose()
    @IsDate()
    readonly created_at: Date;

    @Expose()
    @IsDate()
    readonly execution_date: Date;

    @Expose()
    @IsDate()
    readonly revision_date: Date;

    @Expose()
    @IsNumber()
    readonly day_service: number;

    @Expose()
    @IsString()
    readonly theory_description: string;

    @Expose()
    @IsString()
    readonly real_description: string;

    @Expose()
    @IsString()
    readonly technical_observation: string;

    @Expose()
    @IsString()
    readonly customer_observation: string;

    @Expose()
    status: Status;

    @Expose()
    @Type(type => Customer)
    readonly customer_id: Customer;

    @Expose()
    @Type(type => Technical)
    readonly technical: Technical;

    @Expose()
    @Type(type => User)
    readonly user: User;

    @Expose()
    @Type(type => OrderType)
    readonly order_type: OrderType;

    @Expose()
    @Type(type => ServiceType)
    readonly service_type: ServiceType;

}