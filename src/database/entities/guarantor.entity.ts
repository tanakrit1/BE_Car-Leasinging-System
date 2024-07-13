import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { SaleItem } from "./saleItem.entity";

@Entity({ name: 'guarantor' })
export class Guarantor extends BaseEntity {

    @Column({ name: 'guarantorName', type: 'nvarchar', length: 64, nullable: true })
    guarantorName: string;	//ชื่อผู้ค้ำ
    	
    @Column({ name: 'guarantorAddress', type: 'nvarchar', length: 256, nullable: true })
    guarantorAddress: string;	//ที่อยู่ผู้ค้ำ

    @Column({ name: 'guarantorIdCard', type: 'nvarchar', length: 32, nullable: true })
    guarantorIdCard: string;	//บัตรประชาชน

    @Column({ name: 'guarantorPhone', type: 'nvarchar', length: 16, nullable: true })
    guarantorPhone: string;	//เบอร์ติดต่อ

    @ManyToOne(() => SaleItem, (saleItem) => saleItem.guarantors, { nullable: true })
    saleItem: SaleItem;

}