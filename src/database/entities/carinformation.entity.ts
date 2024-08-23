import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { SaleItem } from "./saleItem.entity";

@Entity({ name: 'carinformation' })
export class CarInformation extends BaseEntity {

    @Column({ name: 'carStatus', type: 'nvarchar', length: 64, nullable: true })
    carStatus: string;	//สถานะ

    @Column({ name: 'carBrand', type: 'nvarchar', length: 64, nullable: true })
    carBrand: string;//ยี่ห้อรถ

    @Column({ name: 'licensePlate', type: 'nvarchar', length: 64, nullable: true })
    licensePlate: string;	//ทะเบียนรถ

    @Column({ name: 'vin', type: 'nvarchar', length: 64, nullable: true })
    vin: string;	//เลขตัวถัง

    @Column({ name: 'engineNumber', type: 'nvarchar', length: 64, nullable: true })
    engineNumber: string;	//เลขเครื่องยนต์

    @Column({ name: 'carColor', type: 'nvarchar', length: 64, nullable: true })
    carColor: string;	//สี

    @Column({ name: 'model', type: 'nvarchar', length: 64, nullable: true })
    model: string;	//รุ่น

    @Column({ name: 'sellerName', type: 'nvarchar', length: 64, nullable: true })
    sellerName: string;	//ชื่อผู้ขาย

    @Column({ name: 'agent', type: 'nvarchar', length: 64, nullable: true })
    agent: string;	//นายหน้า

    @Column({ name: 'carImage', type: 'longtext', nullable: true })
    carImage: string;	//รูปภาพ

    @Column({ name: 'carDate', type: 'nvarchar', length: 16, nullable: true })
    carDate: string; //วันที่

    @Column({
        name: 'sellingPrice',
        type: 'decimal',
        precision: 18,
        scale: 2,
        nullable: true,
        comment: 'sellingPrice',
    })
    sellingPrice: number; //ราคาขาย

    @Column({
        name: 'buyingPrice',
        type: 'decimal',
        precision: 18,
        scale: 2,
        nullable: true,
        comment: 'buyingPrice',
    })
    buyingPrice: number; //	ราคารับซื้อ

    @Column({
        name: 'maintenanceCost',
        type: 'decimal',
        precision: 18,
        scale: 2,
        nullable: true,
        comment: 'maintenanceCost',
    })
    maintenanceCost: number; //	ค่าซ่อมบำรุง

    @Column({
        name: 'cost',
        type: 'decimal',
        precision: 18,
        scale: 2,
        nullable: true,
        comment: 'cost',
    })
    cost: number; //	ต้นทุน

    @Column({
        name: 'desiredProfit',
        type: 'decimal',
        precision: 18,
        scale: 2,
        nullable: true,
        comment: 'desiredProfit',
    })
    desiredProfit: number; //กำไรที่ต้องการ

    @Column({ name: 'carType', type: 'nvarchar', length: 64, nullable: true })
    carType: string;	//ประเภทขายรถ,ค้ำ

    @Column({ name: 'carRemarks', type: 'nvarchar', length: 256, nullable: true })
    carRemarks: string;	//หมายเหตุ

    @Column({ name: 'carCategory', type: 'nvarchar', length: 64, nullable: true })
    carCategory: string;	//หมวดหมู่รถ

    @Column({
        name: 'purchaseDate',
        type: 'date',
        nullable: true,
        comment: ' วันที่ซื้อเข้า',
    })
    purchaseDate: Date; // วันที่ซื้อเข้า

    @Column({
        name: 'priceOther',
        type: 'decimal',
        precision: 18,
        scale: 2,
        nullable: true,
        comment: 'priceOther',
    })
    priceOther: number; //	ราคาอื่นๆ

    @Column({ name: 'productOther', type: 'nvarchar', length: 256, nullable: true })
    productOther: string;	//สินค้าอื่นๆ

    @OneToMany(() => SaleItem, (saleItem) => saleItem.carInformation)
    saleItems: SaleItem[];

}