import { Customer } from "src/cases/customer/customer.entity";
import { OrderItem, Entity, PrimaryGeneratedOrder, Column, ManyToOne } from "typeorm";

enum OrderStatus{
    NEW='NEW',
    SEPARATION='SERPATARION',
    INVOICED='INVOICED',
    SHIPPED='SHIPPED',
    DELIVERED='DELIVERED',
    CANCELED='CANCELLED'

}

@Entity('Order')
export class OrderItem {
    @PrimaryGeneratedOrder('uuid')
    id: string;
    

    @ManyToOne(() => Customer, {eager:true , nullable: false})
    customer: Customer;

    @Column('decimal', {nullable: true, precision:10, scale:2})
    shipping: number;

    @Column('enum', {enum: OrderStatus, default: OrderStatus.NEW, nullable: false})
    status: string;

    @Column('decimal', {nullable: true})
    total: number;


    createdAt: Date;

    updatedAt: Date;

}