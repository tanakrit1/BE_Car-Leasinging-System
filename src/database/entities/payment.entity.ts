import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { SaleItem } from "./saleItem.entity";

@Entity({ name: 'payment' })
export class Payment extends BaseEntity {

    @Column({
        name: 'datePay',
        type: 'date',
        nullable: true,
        comment: 'วันที่ชำระ',
    })
    datePay: Date; //วันที่ชำระ

    @Column({
        name: 'principalPay',
        type: 'decimal',
        precision: 18,
        scale: 2,
        nullable: true,
        comment: 'principalPay',
    })
    principalPay: number; //เงินต้นที่ชำระเเล้ว

    @Column({
        name: 'InterestPay',
        type: 'decimal',
        precision: 18,
        scale: 2,
        nullable: true,
        comment: 'InterestPay',
    })
    InterestPay: number; //ดอกเบี้ยที่ชำระเเล้ว

    @Column({
        name: 'amountPay',
        type: 'decimal',
        precision: 18,
        scale: 2,
        nullable: true,
        comment: 'amountPay',
    })
    amountPay: number; //ชำระแล้ว

    @Column({
        name: 'balancePay',
        type: 'decimal',
        precision: 18,
        scale: 2,
        nullable: true,
        comment: 'balancePay',
    })
    balancePay: number; //ยอดเงินคงเหลือ

    @Column({
        name: 'fee',
        type: 'decimal',
        precision: 18,
        scale: 2,
        nullable: true,
        comment: 'fee',
    })
    fee: number; //ค่าปรับ

    @Column({ name: 'note', type: 'nvarchar', length: 512, nullable: true })
    note: string;	//note

    @Column({ name: 'bank', type: 'nvarchar', length: 64, nullable: true })
    bank: string;	//ธนาคาร

    @Column({ name: 'methodPay', type: 'nvarchar', length: 16, nullable: true })
    methodPay: string; //การชำระ(เงินสด/เงินโอน)

    @Column({ name: 'receiver', type: 'nvarchar', length: 64, nullable: true })
    receiver: string; //ผู้รับเงิน

    @Column({ name: 'accountName', type: 'nvarchar', length: 128, nullable: true })
    accountName: string; //ชื่อบัญชี

    @Column({ name: 'accountNumber', type: 'nvarchar', length: 64, nullable: true })
    accountNumber : string; //เลขที่บัญชี

    @ManyToOne(() => SaleItem, (saleItem) => saleItem.payments, { nullable: true })
    saleItem: SaleItem;

}
