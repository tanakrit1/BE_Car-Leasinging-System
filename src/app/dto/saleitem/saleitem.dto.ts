import { SaleItem } from "src/database/entities/saleItem.entity";
import { PaginationDto } from "../base/base.dto";
import { IsArray, IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateGuarantorDto } from "../guarantor/guarantor.dto";


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
    @IsNumber()
    carInformation_id?: number;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateGuarantorDto)
    guarantors?:CreateGuarantorDto[]
}

