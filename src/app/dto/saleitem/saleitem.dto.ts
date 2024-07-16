import { SaleItem } from "src/database/entities/saleItem.entity";
import { PaginationDto } from "../base/base.dto";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateGuarantorDto, UpdateAdvanceGuarantorDto } from "../guarantor/guarantor.dto";


export class SaleItemDto extends SaleItem { }

export class SearchSaleItemDto extends PaginationDto {}

export class CreateSaleItemDto {

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'customerName ต้องมีความยาวไม่เกิน' })
    customerName: string;//ชื่อลูกค้า

    @IsOptional()
    @IsString()
    @MaxLength(256, { message: 'address ต้องมีความยาวไม่เกิน' })
    address: string;	//ที่อยู่

    @IsOptional()
    @IsString()
    @MaxLength(32, { message: 'idCardNumber ต้องมีความยาวไม่เกิน' })
    idCardNumber: string;	//บัตรประชาชน

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'phoneNumber ต้องมีความยาวไม่เกิน' })
    phoneNumber: string;	//เบอร์ติดต่อ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'saleType ต้องมีความยาวไม่เกิน' })
    saleType: string;	//การซื้อ

    @IsOptional()
    @IsString()
    @MaxLength(8, { message: 'numInstallments ต้องมีความยาวไม่เกิน' })
    numInstallments: string;	//จำนวนงวดผ่อนชำระ
  
    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'interestType ต้องมีความยาวไม่เกิน' })
    interestType: string;	//การชำระดอกเบี้ย

    @IsOptional()
    @IsString()
    @MaxLength(128, { message: 'gps ต้องมีความยาวไม่เกิน' })
    gps: string;	//GPS

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'statusInstallment ต้องมีความยาวไม่เกิน' })
    statusInstallment: string; //สถานะผ่อนชำระ
    
    @IsOptional()
    @IsNumber()
    discount: number; //ส่วนลด

    @IsOptional()
    @IsNumber()
    interestMonth: number; //ดอกเบี้ย/เดือน

    @IsOptional()
    @IsNumber()
    interestRate: number; //อัตราดอกเบี้ย

    @IsOptional()
    @IsNumber()
    totalOrder: number; //ยอดจัด

    @IsOptional()
    @IsNumber()
    downPayment: number; //เงินดาวน์

    @IsOptional()
    @IsDate({message:'dueDate ต้องเป็นวันที่'})
    dueDate?: Date; //วันนัดชำระ

    @IsOptional()
    @IsNumber()
    paymentAmount?: number; //จำนวนเงินที่ชำระแล้ว

    @IsOptional()
    @IsNumber()
    remainingBalance?: number; //ยอดเงินคงเหลือ

    @IsOptional()
    @IsNumber()
    totalInterest?: number; //ดอกเบี้ยที่ได้รับรวม

    @IsOptional()
    @IsNumber()
    carInformation_id?: number; 
}

export class UpdateSaleItemDto {

    id: number;

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'customerName ต้องมีความยาวไม่เกิน' })
    customerName: string;//ชื่อลูกค้า

    @IsOptional()
    @IsString()
    @MaxLength(256, { message: 'address ต้องมีความยาวไม่เกิน' })
    address: string;	//ที่อยู่

    @IsOptional()
    @IsString()
    @MaxLength(32, { message: 'idCardNumber ต้องมีความยาวไม่เกิน' })
    idCardNumber: string;	//บัตรประชาชน

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'phoneNumber ต้องมีความยาวไม่เกิน' })
    phoneNumber: string;	//เบอร์ติดต่อ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'saleType ต้องมีความยาวไม่เกิน' })
    saleType: string;	//การซื้อ

    @IsOptional()
    @IsString()
    @MaxLength(8, { message: 'numInstallments ต้องมีความยาวไม่เกิน' })
    numInstallments: string;	//จำนวนงวดผ่อนชำระ
  
    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'interestType ต้องมีความยาวไม่เกิน' })
    interestType: string;	//การชำระดอกเบี้ย

    @IsOptional()
    @IsString()
    @MaxLength(128, { message: 'gps ต้องมีความยาวไม่เกิน' })
    gps: string;	//GPS

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'statusInstallment ต้องมีความยาวไม่เกิน' })
    statusInstallment: string; //สถานะผ่อนชำระ

    @IsOptional()
    @IsNumber()
    discount: number; //ส่วนลด

    @IsOptional()
    @IsNumber()
    interestMonth: number; //ดอกเบี้ย/เดือน

    @IsOptional()
    @IsNumber()
    interestRate: number; //อัตราดอกเบี้ย

    @IsOptional()
    @IsNumber()
    totalOrder: number; //ยอดจัด

    @IsOptional()
    @IsNumber()
    downPayment: number; //เงินดาวน์

    @IsOptional()
    @IsDate({message:'dueDate ต้องเป็นวันที่'})
    dueDate?: Date; //วันนัดชำระ

    @IsOptional()
    @IsNumber()
    paymentAmount?: number; //จำนวนเงินที่ชำระแล้ว

    @IsOptional()
    @IsNumber()
    remainingBalance?: number; //ยอดเงินคงเหลือ

    @IsOptional()
    @IsNumber()
    totalInterest?: number; //ดอกเบี้ยที่ได้รับรวม
}

export class CreateAdvanceSaleItemDto {

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'customerName ต้องมีความยาวไม่เกิน' })
    customerName?: string;//ชื่อลูกค้า

    @IsOptional()
    @IsString()
    @MaxLength(256, { message: 'address ต้องมีความยาวไม่เกิน' })
    address?: string;	//ที่อยู่

    @IsOptional()
    @IsString()
    @MaxLength(32, { message: 'idCardNumber ต้องมีความยาวไม่เกิน' })
    idCardNumber?: string;	//บัตรประชาชน

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'phoneNumber ต้องมีความยาวไม่เกิน' })
    phoneNumber?: string;	//เบอร์ติดต่อ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'saleType ต้องมีความยาวไม่เกิน' })
    saleType?: string;	//การซื้อ

    @IsOptional()
    @IsString()
    @MaxLength(8, { message: 'numInstallments ต้องมีความยาวไม่เกิน' })
    numInstallments?: string;	//จำนวนงวดผ่อนชำระ
  
    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'interestType ต้องมีความยาวไม่เกิน' })
    interestType?: string;	//การชำระดอกเบี้ย

    @IsOptional()
    @IsString()
    @MaxLength(128, { message: 'gps ต้องมีความยาวไม่เกิน' })
    gps?: string;	//GPS

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'statusInstallment ต้องมีความยาวไม่เกิน' })
    statusInstallment?: string; //สถานะผ่อนชำระ

    @IsOptional()
    @IsNumber()
    discount?: number; //ส่วนลด

    @IsOptional()
    @IsNumber()
    interestMonth?: number; //ดอกเบี้ย/เดือน

    @IsOptional()
    @IsNumber()
    interestRate?: number; //อัตราดอกเบี้ย

    @IsOptional()
    @IsNumber()
    totalOrder?: number; //ยอดจัด

    @IsOptional()
    @IsNumber()
    downPayment?: number; //เงินดาวน์

    @IsOptional()
    @IsDate({message:'dueDate ต้องเป็นวันที่'})
    dueDate?: Date; //วันนัดชำระ

    @IsOptional()
    @IsNumber()
    paymentAmount?: number; //จำนวนเงินที่ชำระแล้ว

    @IsOptional()
    @IsNumber()
    remainingBalance?: number; //ยอดเงินคงเหลือ

    @IsOptional()
    @IsNumber()
    totalInterest?: number; //ดอกเบี้ยที่ได้รับรวม

    @IsOptional()
    @IsNumber()
    carInformation_id?: number;

    

     //-----------------------------carInformation--------------------------------//

     @IsOptional()
     @IsString()
     @MaxLength(64, { message: 'carStatus ต้องมีความยาวไม่เกิน' })
     carStatus?: string;	//สถานะ
 
     @IsOptional()
     @IsString()
     @MaxLength(64, { message: 'carBrand ต้องมีความยาวไม่เกิน' })
     carBrand?: string;//ยี่ห้อรถ
 
     @IsOptional()
     @IsString()
     @MaxLength(64, { message: 'licensePlate ต้องมีความยาวไม่เกิน' })
     licensePlate?: string;	//ทะเบียนรถ
 
     @IsOptional()
     @IsString()
     @MaxLength(64, { message: 'vin ต้องมีความยาวไม่เกิน' })
     vin?: string;	//เลขตัวถัง
 
     @IsOptional()
     @IsString()
     @MaxLength(64, { message: 'engineNumber ต้องมีความยาวไม่เกิน' })
     engineNumber?: string;	//เลขเครื่องยนต์
 
     @IsOptional()
     @IsString()
     @MaxLength(64, { message: 'carColor ต้องมีความยาวไม่เกิน' })
     carColor?: string;	//สี
 
     @IsOptional()
     @IsString()
     @MaxLength(64, { message: 'model ต้องมีความยาวไม่เกิน' })
     model?: string;	//รุ่น
 
     @IsOptional()
     @IsString()
     @MaxLength(64, { message: 'sellerName ต้องมีความยาวไม่เกิน' })
     sellerName?: string;	//ชื่อผู้ขาย
 
     @IsOptional()
     @IsString()
     @MaxLength(64, { message: 'agent ต้องมีความยาวไม่เกิน' })
     agent?: string;	//นายหน้า
 
     @IsOptional()
     @IsString()
     carImage?: string;	//รูปภาพ
 
     @IsOptional()
     @IsString()
     @MaxLength(64, { message: 'carDate ต้องมีความยาวไม่เกิน' })
     carDate?: string; //วันที่
 
     @IsOptional()
     @IsString()
     @MaxLength(64, { message: 'carType ต้องมีความยาวไม่เกิน' })
     carType?: string; //ประเภท
 
     @IsOptional()
     @IsNumber()
     sellingPrice?: number; //ราคาขาย
 
     @IsOptional()
     @IsNumber()
     buyingPrice?: number; //	ราคารับซื้อ
 
     @IsOptional()
     @IsNumber()
     maintenanceCost?: number; //	ค่าซ่อมบำรุง
 
     @IsOptional()
     @IsNumber()
     cost?: number; //	ต้นทุน
 
     @IsOptional()
     @IsNumber()
     desiredProfit?: number; //กำไรที่ต้องการ

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateGuarantorDto)
    guarantors?:CreateGuarantorDto[]
}

export class UpdateAdvanceSaleItemDto {
    @IsNotEmpty()
    @IsNumber()
    saleitem_id:number

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'customerName ต้องมีความยาวไม่เกิน' })
    customerName?: string;//ชื่อลูกค้า

    @IsOptional()
    @IsString()
    @MaxLength(256, { message: 'address ต้องมีความยาวไม่เกิน' })
    address?: string;	//ที่อยู่

    @IsOptional()
    @IsString()
    @MaxLength(32, { message: 'idCardNumber ต้องมีความยาวไม่เกิน' })
    idCardNumber?: string;	//บัตรประชาชน

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'phoneNumber ต้องมีความยาวไม่เกิน' })
    phoneNumber?: string;	//เบอร์ติดต่อ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'saleType ต้องมีความยาวไม่เกิน' })
    saleType?: string;	//การซื้อ

    @IsOptional()
    @IsString()
    @MaxLength(8, { message: 'numInstallments ต้องมีความยาวไม่เกิน' })
    numInstallments?: string;	//จำนวนงวดผ่อนชำระ
  
    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'interestType ต้องมีความยาวไม่เกิน' })
    interestType?: string;	//การชำระดอกเบี้ย

    @IsOptional()
    @IsString()
    @MaxLength(128, { message: 'gps ต้องมีความยาวไม่เกิน' })
    gps?: string;	//GPS

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'statusInstallment ต้องมีความยาวไม่เกิน' })
    statusInstallment?: string; //สถานะผ่อนชำระ

    @IsOptional()
    @IsNumber()
    discount?: number; //ส่วนลด

    @IsOptional()
    @IsNumber()
    interestMonth?: number; //ดอกเบี้ย/เดือน

    @IsOptional()
    @IsNumber()
    interestRate?: number; //อัตราดอกเบี้ย

    @IsOptional()
    @IsNumber()
    totalOrder?: number; //ยอดจัด

    @IsOptional()
    @IsNumber()
    downPayment?: number; //เงินดาวน์

    @IsOptional()
    @IsDate({message:'dueDate ต้องเป็นวันที่'})
    dueDate?: Date; //วันนัดชำระ

    @IsOptional()
    @IsNumber()
    paymentAmount?: number; //จำนวนเงินที่ชำระแล้ว

    @IsOptional()
    @IsNumber()
    remainingBalance?: number; //ยอดเงินคงเหลือ

    @IsOptional()
    @IsNumber()
    totalInterest?: number; //ดอกเบี้ยที่ได้รับรวม

    @IsNotEmpty()
    @IsNumber()
    carInformation_id?: number;

    //-----------------------------carInformation--------------------------------//
    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'carStatus ต้องมีความยาวไม่เกิน' })
    carStatus?: string;	//สถานะ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'carBrand ต้องมีความยาวไม่เกิน' })
    carBrand?: string;//ยี่ห้อรถ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'licensePlate ต้องมีความยาวไม่เกิน' })
    licensePlate?: string;	//ทะเบียนรถ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'vin ต้องมีความยาวไม่เกิน' })
    vin?: string;	//เลขตัวถัง

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'engineNumber ต้องมีความยาวไม่เกิน' })
    engineNumber?: string;	//เลขเครื่องยนต์

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'carColor ต้องมีความยาวไม่เกิน' })
    carColor?: string;	//สี

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'model ต้องมีความยาวไม่เกิน' })
    model?: string;	//รุ่น

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'sellerName ต้องมีความยาวไม่เกิน' })
    sellerName?: string;	//ชื่อผู้ขาย

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'agent ต้องมีความยาวไม่เกิน' })
    agent?: string;	//นายหน้า

    @IsOptional()
    @IsString()
    carImage?: string;	//รูปภาพ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'carDate ต้องมีความยาวไม่เกิน' })
    carDate?: string; //วันที่

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'carType ต้องมีความยาวไม่เกิน' })
    carType?: string; //ประเภท

    @IsOptional()
    @IsNumber()
    sellingPrice?: number; //ราคาขาย

    @IsOptional()
    @IsNumber()
    buyingPrice?: number; //	ราคารับซื้อ

    @IsOptional()
    @IsNumber()
    maintenanceCost?: number; //	ค่าซ่อมบำรุง

    @IsOptional()
    @IsNumber()
    cost?: number; //	ต้นทุน

    @IsOptional()
    @IsNumber()
    desiredProfit?: number; //กำไรที่ต้องการ


    //-------------------------guarantor---------------------//
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateAdvanceGuarantorDto)
    guarantors?:UpdateAdvanceGuarantorDto[]
}

