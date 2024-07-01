import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({ name: 'user' })
export class User extends BaseEntity {
    @Column({
        name: 'employeeID',
        type: 'nvarchar',
        length: 8,
        unique: true,
    })
    employeeID: string;

    @Column({ name: 'firstName', type: 'nvarchar', length: 50, nullable: true })
    firstName: string;

    @Column({ name: 'lastName', type: 'nvarchar', length: 50, nullable: true })
    lastName: string;

    @Column({ name: 'phone', type: 'nvarchar', length: 16, nullable: true })
    phone: string;

    @Column({ name: 'username', type: 'nvarchar', length: 16, unique: true })
    username: string;

    @Column({ name: 'password', type: 'nvarchar', length: 64 })
    password: string;

    @Column({ name: 'role', type: 'nvarchar', length: 32, nullable: true })
    role: string;

    @Column({ name: 'status', type: 'bit', default: true,nullable: true })
    status: boolean;

    @Column({ name: 'isDashboard', type: 'bit', default: true ,nullable: true})
    isDashboard: boolean;

    @Column({ name: 'isCardata', type: 'bit', default: true,nullable: true })
    isCardata: boolean;

    @Column({ name: 'isCustomerData', type: 'bit', default: true ,nullable: true})
    isCustomerData: boolean;

    @Column({ name: 'isPayment', type: 'bit', default: true ,nullable: true})
    isPayment: boolean;

    @Column({ name: 'isEmployee', type: 'bit', default: true,nullable: true })
    isEmployee: boolean;






}