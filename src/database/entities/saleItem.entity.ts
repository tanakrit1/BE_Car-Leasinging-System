import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Guarantor } from "./guarantor.entity";
import { CarInformation } from "./carinformation.entity";

@Entity({ name: 'saleitem' })
export class SaleItem extends BaseEntity {

    @Column({ name: 'customerName', type: 'nvarchar', length: 64, nullable: true })
    customerName: string;	//ชื่อลูกค้า

    @Column({ name: 'address', type: 'nvarchar', length: 256, nullable: true })
    address: string;	//ที่อยู่

    @Column({ name: 'idCardNumber', type: 'nvarchar', length: 32, nullable: true })
    idCardNumber: string;	//บัตรประชาชน

    @Column({ name: 'phoneNumber', type: 'nvarchar', length: 16, nullable: true })
    phoneNumber: string;	//เบอร์ติดต่อ

    @Column({ name: 'saleType', type: 'nvarchar', length: 64, nullable: true })
    saleType: string;	//การซื้อ

    @Column({ name: 'numInstallments', type: 'nvarchar', length: 8, nullable: true })
    numInstallments: string;	//จำนวนงวดผ่อนชำระ

    @Column({ name: 'interestType', type: 'nvarchar', length: 64, nullable: true })
    interestType: string;	//การชำระดอกเบี้ย

    @Column({ name: 'gps', type: 'nvarchar', length: 128, nullable: true })
    gps: string;	//GPS

    @Column({
        name: 'discount',
        type: 'decimal',
        precision: 18,
        scale: 2,
        nullable: true,
        comment: 'discount',
    })
    discount: number; //ส่วนลด

    @Column({
        name: 'interestMonth',
        type: 'decimal',
        precision: 18,
        scale: 2,
        nullable: true,
        comment: 'interestMonth',
    })
    interestMonth: number; //ดอกเบี้ย/เดือน

    @Column({
        name: 'interestRate',
        type: 'decimal',
        precision: 18,
        scale: 2,
        nullable: true,
        comment: 'interestRate',
    })
    interestRate: number; //อัตราดอกเบี้ย

    @Column({
        name: 'totalOrder',
        type: 'decimal',
        precision: 18,
        scale: 2,
        nullable: true,
        comment: 'totalOrder',
    })
    totalOrder: number; //ยอดจัด

    @Column({
        name: 'downPayment',
        type: 'decimal',
        precision: 18,
        scale: 2,
        nullable: true,
        comment: 'downPayment',
    })
    downPayment: number; //เงินดาวน์

    @OneToMany(() => Guarantor, (guarantor) => guarantor.saleItem)
    guarantors: Guarantor[];

    @ManyToOne(() => CarInformation, (carInformation) => carInformation.saleItems, { nullable: true })
    carInformation: CarInformation;
}