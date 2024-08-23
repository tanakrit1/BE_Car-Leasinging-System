import { SaleItem } from "src/database/entities/saleItem.entity";
import { PaginationDto } from "../base/base.dto";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { Transform, TransformFnParams, Type } from "class-transformer";
import { CreateGuarantorDto, UpdateAdvanceGuarantorDto } from "../guarantor/guarantor.dto";


export class SaleItemDto extends SaleItem { }

export class SearchSaleItemDto extends PaginationDto {}

export class CreateSaleItemDto {

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ชื่อลูกค้า ต้องมีความยาวไม่เกิน' })
    customerName: string;//ชื่อลูกค้า

    @IsOptional()
    @IsString()
    @MaxLength(256, { message: 'ที่อยู่ ต้องมีความยาวไม่เกิน' })
    address: string;	//ที่อยู่

    @IsOptional()
    @IsString()
    @MaxLength(32, { message: 'บัตรประชาชน ต้องมีความยาวไม่เกิน' })
    idCardNumber: string;	//บัตรประชาชน

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'เบอร์ติดต่อ ต้องมีความยาวไม่เกิน' })
    phoneNumber: string;	//เบอร์ติดต่อ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ประเภทการซื้อ ต้องมีความยาวไม่เกิน' })
    saleType: string;	//ประเภทการซื้อ

    @IsOptional()
    @IsString()
    @MaxLength(8, { message: 'จำนวนงวดผ่อนชำระ ต้องมีความยาวไม่เกิน' })
    numInstallments: string;	//จำนวนงวดผ่อนชำระ
  
    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'การชำระดอกเบี้ย ต้องมีความยาวไม่เกิน' })
    interestType: string;	//การชำระดอกเบี้ย

    @IsOptional()
    @IsString()
    @MaxLength(128, { message: 'GPS ต้องมีความยาวไม่เกิน' })
    gps: string;	//GPS

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'สถานะผ่อนชำระ ต้องมีความยาวไม่เกิน' })
    statusInstallment: string; //สถานะผ่อนชำระ
    
    @IsOptional()
    @IsNumber(undefined,{ message: 'ส่วนลด ต้องเป็นชนิดตัวเลข' })
    discount: number; //ส่วนลด

    @IsOptional()
    @IsNumber(undefined,{ message: 'ดอกเบี้ย/เดือน ต้องเป็นชนิดตัวเลข' })
    interestMonth: number; //ดอกเบี้ย/เดือน

    @IsOptional()
    @IsNumber(undefined,{ message: 'อัตราดอกเบี้ย ต้องเป็นชนิดตัวเลข' })
    interestRate: number; //อัตราดอกเบี้ย

    @IsOptional()
    @IsNumber(undefined,{ message: 'ยอดจัด ต้องเป็นชนิดตัวเลข' })
    totalOrder: number; //ยอดจัด

    @IsOptional()
    @IsNumber(undefined,{ message: 'เงินดาวน์ ต้องเป็นชนิดตัวเลข' })
    downPayment: number; //เงินดาวน์

    @IsOptional()
    @Transform(({ value }: TransformFnParams) => new Date(value))
    @IsDate({message:'วันนัดชำระ ต้องเป็นวันที่'})
    dueDate?: Date; //วันนัดชำระ

    @IsOptional()
    @IsNumber(undefined,{ message: 'จำนวนเงินที่ชำระแล้ว ต้องเป็นชนิดตัวเลข' })
    paymentAmount?: number; //จำนวนเงินที่ชำระแล้ว

    @IsOptional()
    @IsNumber(undefined,{ message: 'ยอดเงินคงเหลือ ต้องเป็นชนิดตัวเลข' })
    remainingBalance?: number; //ยอดเงินคงเหลือ

    @IsOptional()
    @IsNumber(undefined,{ message: 'ดอกเบี้ยที่ได้รับรวม ต้องเป็นชนิดตัวเลข' })
    totalInterest?: number; //ดอกเบี้ยที่ได้รับรวม

    @IsOptional()
    @IsNumber(undefined,{ message: 'รวมค่าปรับ ต้องเป็นชนิดตัวเลข' })
    totalFee?: number;//รวมค่าปรับ

    @IsOptional()
    @IsNumber(undefined,{ message: 'carInformation_id ต้องเป็นชนิดตัวเลข' })
    carInformation_id?: number; 

    @IsOptional()
    @Transform(({ value }: TransformFnParams) => new Date(value))
    @IsDate({message:'วันที่ทำสัญญา ต้องเป็นรูปแบบวันที่'})
    contractDate?: Date; //วันที่ทำสัญญา 
}

export class UpdateSaleItemDto {

    id: number;

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ชื่อลูกค้า ต้องมีความยาวไม่เกิน' })
    customerName: string;//ชื่อลูกค้า

    @IsOptional()
    @IsString()
    @MaxLength(256, { message: 'ที่อยู่ ต้องมีความยาวไม่เกิน' })
    address: string;	//ที่อยู่

    @IsOptional()
    @IsString()
    @MaxLength(32, { message: 'บัตรประชาชน ต้องมีความยาวไม่เกิน' })
    idCardNumber: string;	//บัตรประชาชน

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'เบอร์ติดต่อ ต้องมีความยาวไม่เกิน' })
    phoneNumber: string;	//เบอร์ติดต่อ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'การซื้อ ต้องมีความยาวไม่เกิน' })
    saleType: string;	//การซื้อ

    @IsOptional()
    @IsString()
    @MaxLength(8, { message: 'จำนวนงวดผ่อนชำระ ต้องมีความยาวไม่เกิน' })
    numInstallments: string;	//จำนวนงวดผ่อนชำระ
  
    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'การชำระดอกเบี้ย ต้องมีความยาวไม่เกิน' })
    interestType: string;	//การชำระดอกเบี้ย

    @IsOptional()
    @IsString()
    @MaxLength(128, { message: 'GPS ต้องมีความยาวไม่เกิน' })
    gps: string;	//GPS

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'สถานะผ่อนชำระ ต้องมีความยาวไม่เกิน' })
    statusInstallment: string; //สถานะผ่อนชำระ

    @IsOptional()
    @IsNumber(undefined,{ message: 'ส่วนลด ต้องเป็นชนิดตัวเลข' })
    discount: number; //ส่วนลด

    @IsOptional()
    @IsNumber(undefined,{ message: 'อกเบี้ย/เดือน ต้องเป็นชนิดตัวเลข' })
    interestMonth: number; //ดอกเบี้ย/เดือน

    @IsOptional()
    @IsNumber(undefined,{ message: 'อัตราดอกเบี้ย ต้องเป็นชนิดตัวเลข' })
    interestRate: number; //อัตราดอกเบี้ย

    @IsOptional()
    @IsNumber(undefined,{ message: 'ยอดจัด ต้องเป็นชนิดตัวเลข' })
    totalOrder: number; //ยอดจัด

    @IsOptional()
    @IsNumber(undefined,{ message: 'เงินดาวน์ ต้องเป็นชนิดตัวเลข' })
    downPayment: number; //เงินดาวน์

    @IsOptional()
    @IsDate({message:'วันนัดชำระ ต้องเป็นวันที่'})
    dueDate?: Date; //วันนัดชำระ

    @IsOptional()
    @IsNumber(undefined,{ message: 'จำนวนเงินที่ชำระแล้ว ต้องเป็นชนิดตัวเลข' })
    paymentAmount?: number; //จำนวนเงินที่ชำระแล้ว

    @IsOptional()
    @IsNumber(undefined,{ message: 'ยอดเงินคงเหลือ ต้องเป็นชนิดตัวเลข' })
    remainingBalance?: number; //ยอดเงินคงเหลือ

    @IsOptional()
    @IsNumber(undefined,{ message: 'ดอกเบี้ยที่ได้รับรวม ต้องเป็นชนิดตัวเลข' })
    totalInterest?: number; //ดอกเบี้ยที่ได้รับรวม

    @IsOptional()
    @IsNumber(undefined,{ message: 'รวมค่าปรับ ต้องเป็นชนิดตัวเลข' })
    totalFee?: number;//รวมค่าปรับ

    @IsOptional()
    @Transform(({ value }: TransformFnParams) => new Date(value))
    @IsDate({message:'วันที่ทำสัญญา ต้องเป็นรูปแบบวันที่'})
    contractDate?: Date; //วันที่ทำสัญญา 
}

export class CreateAdvanceSaleItemDto {

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ชื่อลูกค้า ต้องมีความยาวไม่เกิน' })
    customerName?: string;//ชื่อลูกค้า

    @IsOptional()
    @IsString()
    @MaxLength(256, { message: 'ที่อยู่ ต้องมีความยาวไม่เกิน' })
    address?: string;	//ที่อยู่

    @IsOptional()
    @IsString()
    @MaxLength(32, { message: 'บัตรประชาชน ต้องมีความยาวไม่เกิน' })
    idCardNumber?: string;	//บัตรประชาชน

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'เบอร์ติดต่อ ต้องมีความยาวไม่เกิน' })
    phoneNumber?: string;	//เบอร์ติดต่อ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'การซื้อ ต้องมีความยาวไม่เกิน' })
    saleType?: string;	//การซื้อ

    @IsOptional()
    @IsString()
    @MaxLength(8, { message: 'จำนวนงวดผ่อนชำระ ต้องมีความยาวไม่เกิน' })
    numInstallments?: string;	//จำนวนงวดผ่อนชำระ
  
    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'การชำระดอกเบี้ย ต้องมีความยาวไม่เกิน' })
    interestType?: string;	//การชำระดอกเบี้ย

    @IsOptional()
    @IsString()
    @MaxLength(128, { message: 'GPS ต้องมีความยาวไม่เกิน' })
    gps?: string;	//GPS

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'สถานะผ่อนชำระ ต้องมีความยาวไม่เกิน' })
    statusInstallment?: string; //สถานะผ่อนชำระ

    @IsOptional()
    @IsNumber(undefined,{ message: 'ส่วนลด ต้องเป็นชนิดตัวเลข' })
    discount?: number; //ส่วนลด

    @IsOptional()
    @IsNumber(undefined,{ message: 'ดอกเบี้ย/เดือน ต้องเป็นชนิดตัวเลข' })
    interestMonth?: number; //ดอกเบี้ย/เดือน

    @IsOptional()
    @IsNumber(undefined,{ message: 'อัตราดอกเบี้ย ต้องเป็นชนิดตัวเลข' })
    interestRate?: number; //อัตราดอกเบี้ย

    @IsOptional()
    @IsNumber(undefined,{ message: 'ยอดจัด ต้องเป็นชนิดตัวเลข' })
    totalOrder?: number; //ยอดจัด

    @IsOptional()
    @IsNumber(undefined,{ message: 'เงินดาวน์ ต้องเป็นชนิดตัวเลข' })
    downPayment?: number; //เงินดาวน์

    @IsOptional()
    @IsDate({message:'วันนัดชำระ ต้องเป็นรูปแบบวันที่'})
    dueDate?: Date; //วันนัดชำระ

    @IsOptional()
    @IsNumber(undefined,{ message: 'จำนวนเงินที่ชำระแล้ว ต้องเป็นชนิดตัวเลข' })
    paymentAmount?: number; //จำนวนเงินที่ชำระแล้ว

    @IsOptional()
    @IsNumber(undefined,{ message: 'ยอดเงินคงเหลือ ต้องเป็นชนิดตัวเลข' })
    remainingBalance?: number; //ยอดเงินคงเหลือ

    @IsOptional()
    @IsNumber(undefined,{ message: 'ดอกเบี้ยที่ได้รับรวม ต้องเป็นชนิดตัวเลข' })
    totalInterest?: number; //ดอกเบี้ยที่ได้รับรวม

    @IsOptional()
    @IsNumber(undefined,{ message: 'รวมค่าปรับ ต้องเป็นชนิดตัวเลข' })
    totalFee?: number;//รวมค่าปรับ

    @IsOptional()
    @IsNumber(undefined,{ message: 'carInformation_id ต้องเป็นชนิดตัวเลข' })
    carInformation_id?: number;

    @IsOptional()
    @Transform(({ value }: TransformFnParams) => new Date(value))
    @IsDate({message:'วันที่ทำสัญญา ต้องเป็นรูปแบบวันที่'})
    contractDate?: Date; //วันที่ทำสัญญา 

     //-----------------------------carInformation--------------------------------//

     @IsOptional()
     @IsString()
     @MaxLength(64, { message: 'สถานะ ต้องมีความยาวไม่เกิน' })
     carStatus?: string;	//สถานะ
 
     @IsOptional()
     @IsString()
     @MaxLength(64, { message: 'ยี่ห้อรถ ต้องมีความยาวไม่เกิน' })
     carBrand?: string;//ยี่ห้อรถ
 
     @IsOptional()
     @IsString()
     @MaxLength(64, { message: 'ทะเบียนรถ ต้องมีความยาวไม่เกิน' })
     licensePlate?: string;	//ทะเบียนรถ
 
     @IsOptional()
     @IsString()
     @MaxLength(64, { message: 'เลขตัวถัง ต้องมีความยาวไม่เกิน' })
     vin?: string;	//เลขตัวถัง
 
     @IsOptional()
     @IsString()
     @MaxLength(64, { message: 'เลขเครื่องยนต์ ต้องมีความยาวไม่เกิน' })
     engineNumber?: string;	//เลขเครื่องยนต์
 
     @IsOptional()
     @IsString()
     @MaxLength(64, { message: 'สี ต้องมีความยาวไม่เกิน' })
     carColor?: string;	//สี
 
     @IsOptional()
     @IsString()
     @MaxLength(64, { message: 'รุ่น ต้องมีความยาวไม่เกิน' })
     model?: string;	//รุ่น
 
     @IsOptional()
     @IsString()
     @MaxLength(64, { message: 'ชื่อผู้ขาย ต้องมีความยาวไม่เกิน' })
     sellerName?: string;	//ชื่อผู้ขาย
 
     @IsOptional()
     @IsString()
     @MaxLength(64, { message: 'นายหน้า ต้องมีความยาวไม่เกิน' })
     agent?: string;	//นายหน้า
 
     @IsOptional()
     @IsString()
     carImage?: string;	//รูปภาพ
 
     @IsOptional()
     @IsString()
     @MaxLength(64, { message: 'ปีรถ ต้องมีความยาวไม่เกิน' })
     carDate?: string; //วันที่
 
     @IsOptional()
     @IsString()
     @MaxLength(64, { message: 'ประเภท ต้องมีความยาวไม่เกิน' })
     carType?: string; //ประเภท
 
     @IsOptional()
     @IsNumber(undefined,{ message: 'ราคาขาย ต้องเป็นชนิดตัวเลข' })
     sellingPrice?: number; //ราคาขาย
 
     @IsOptional()
     @IsNumber(undefined,{ message: 'ราคารับซื้อ ต้องเป็นชนิดตัวเลข' })
     buyingPrice?: number; //	ราคารับซื้อ
 
     @IsOptional()
     @IsNumber(undefined,{ message: 'ค่าซ่อมบำรุง ต้องเป็นชนิดตัวเลข' })
     maintenanceCost?: number; //	ค่าซ่อมบำรุง
 
     @IsOptional()
     @IsNumber(undefined,{ message: 'ต้นทุน ต้องเป็นชนิดตัวเลข' })
     cost?: number; //	ต้นทุน
 
     @IsOptional()
     @IsNumber(undefined,{ message: 'กำไรที่ต้องการ ต้องเป็นชนิดตัวเลข' })
     desiredProfit?: number; //กำไรที่ต้องการ

     @IsOptional()
     @IsNumber(undefined,{ message: 'ราคาอื่นๆ ต้องเป็นชนิดตัวเลข' })
     priceOther?: number; //	ราคาอื่นๆ
 
     @IsOptional()
     @IsString()
     @MaxLength(256, { message: 'สินค้าอื่นๆ ต้องมีความยาวไม่เกิน' })
     productOther?: string;	//สินค้าอื่นๆ

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateGuarantorDto)
    guarantors?:CreateGuarantorDto[]
}

export class UpdateAdvanceSaleItemDto {
    @IsNotEmpty({ message: 'saleItem_id ต้องไม่เป็นค่าว่าง' })
    @IsNumber()
    saleitem_id:number

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ชื่อลูกค้า ต้องมีความยาวไม่เกิน' })
    customerName?: string;//ชื่อลูกค้า

    @IsOptional()
    @IsString()
    @MaxLength(256, { message: 'ที่อยู่ ต้องมีความยาวไม่เกิน' })
    address?: string;	//ที่อยู่

    @IsOptional()
    @IsString()
    @MaxLength(32, { message: 'บัตรประชาชน ต้องมีความยาวไม่เกิน' })
    idCardNumber?: string;	//บัตรประชาชน

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'เบอร์ติดต่อ ต้องมีความยาวไม่เกิน' })
    phoneNumber?: string;	//เบอร์ติดต่อ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'การซื้อ ต้องมีความยาวไม่เกิน' })
    saleType?: string;	//การซื้อ

    @IsOptional()
    @IsString()
    @MaxLength(8, { message: 'จำนวนงวดผ่อนชำระ ต้องมีความยาวไม่เกิน' })
    numInstallments?: string;	//จำนวนงวดผ่อนชำระ
  
    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'การชำระดอกเบี้ย ต้องมีความยาวไม่เกิน' })
    interestType?: string;	//การชำระดอกเบี้ย

    @IsOptional()
    @IsString()
    @MaxLength(128, { message: 'GPS ต้องมีความยาวไม่เกิน' })
    gps?: string;	//GPS

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'สถานะผ่อนชำระ ต้องมีความยาวไม่เกิน' })
    statusInstallment?: string; //สถานะผ่อนชำระ

    @IsOptional()
    @IsNumber( undefined,{ message: 'ส่วนลด ต้องเป็นชนิดตัวเลข' })
    discount?: number; //ส่วนลด

    @IsOptional()
    @IsNumber( undefined,{ message: 'ดอกเบี้ย/เดือน ต้องเป็นชนิดตัวเลข' })
    interestMonth?: number; //ดอกเบี้ย/เดือน

    @IsOptional()
    @IsNumber( undefined,{ message: 'อัตราดอกเบี้ย ต้องเป็นชนิดตัวเลข' })
    interestRate?: number; //อัตราดอกเบี้ย

    @IsOptional()
    @IsNumber( undefined,{ message: 'ยอดจัด ต้องเป็นชนิดตัวเลข' })
    totalOrder?: number; //ยอดจัด

    @IsOptional()
    @IsNumber( undefined,{ message: 'เงินดาวน์ ต้องเป็นชนิดตัวเลข' })
    downPayment?: number; //เงินดาวน์

    @IsOptional()
    @Transform(({ value }: TransformFnParams) => new Date(value))
    @IsDate({message:'วันนัดชำระ ต้องเป็นวันที่'})
    dueDate?: Date; //วันนัดชำระ

    @IsOptional()
    @IsNumber( undefined,{ message: 'จำนวนเงินที่ชำระแล้ว ต้องเป็นชนิดตัวเลข' })
    paymentAmount?: number; //จำนวนเงินที่ชำระแล้ว

    @IsOptional()
    @IsNumber( undefined,{ message: 'ยอดเงินคงเหลือ ต้องเป็นชนิดตัวเลข' })
    remainingBalance?: number; //ยอดเงินคงเหลือ

    @IsOptional()
    @IsNumber( undefined,{ message: 'ดอกเบี้ยที่ได้รับรวม ต้องเป็นชนิดตัวเลข' })
    totalInterest?: number; //ดอกเบี้ยที่ได้รับรวม

    @IsOptional()
    @IsNumber( undefined,{ message: 'รวมค่าปรับ ต้องเป็นชนิดตัวเลข' })
    totalFee?: number;//รวมค่าปรับ

    @IsNotEmpty({ message: 'carInformation_id ต้องไม่เป็นค่าว่าง' })
    @IsNumber( undefined,{ message: 'carInformation_id ต้องเป็นชนิดตัวเลข' })
    carInformation_id?: number;

    @IsOptional()
    @Transform(({ value }: TransformFnParams) => new Date(value))
    @IsDate({message:'วันที่ทำสัญญา ต้องเป็นวันที่'})
    contractDate?: Date; //วันที่ทำสัญญา 

    //-----------------------------carInformation--------------------------------//
    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'สถานะ ต้องมีความยาวไม่เกิน' })
    carStatus?: string;	//สถานะ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ยี่ห้อรถ ต้องมีความยาวไม่เกิน' })
    carBrand?: string;//ยี่ห้อรถ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ทะเบียนรถ ต้องมีความยาวไม่เกิน' })
    licensePlate?: string;	//ทะเบียนรถ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'เลขตัวถัง ต้องมีความยาวไม่เกิน' })
    vin?: string;	//เลขตัวถัง

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'เลขเครื่องยนต์ ต้องมีความยาวไม่เกิน' })
    engineNumber?: string;	//เลขเครื่องยนต์

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'สี ต้องมีความยาวไม่เกิน' })
    carColor?: string;	//สี

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'รุ่น ต้องมีความยาวไม่เกิน' })
    model?: string;	//รุ่น

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ชื่อผู้ขาย ต้องมีความยาวไม่เกิน' })
    sellerName?: string;	//ชื่อผู้ขาย

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'นายหน้า ต้องมีความยาวไม่เกิน' })
    agent?: string;	//นายหน้า

    @IsOptional()
    @IsString()
    carImage?: string;	//รูปภาพ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ปีรถ ต้องมีความยาวไม่เกิน' })
    carDate?: string; //วันที่

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ประเภท ต้องมีความยาวไม่เกิน' })
    carType?: string; //ประเภท

    @IsOptional()
    @IsNumber(undefined,{ message: 'ราคาขาย ต้องเป็นชนิดตัวเลข' })
    sellingPrice?: number; //ราคาขาย

    @IsOptional()
    @IsNumber(undefined,{ message: 'ราคารับซื้อ ต้องเป็นชนิดตัวเลข' })
    buyingPrice?: number; //	ราคารับซื้อ

    @IsOptional()
    @IsNumber(undefined,{ message: 'ค่าซ่อมบำรุง ต้องเป็นชนิดตัวเลข' })
    maintenanceCost?: number; //	ค่าซ่อมบำรุง

    @IsOptional()
    @IsNumber(undefined,{ message: 'ต้นทุน ต้องเป็นชนิดตัวเลข' })
    cost?: number; //	ต้นทุน

    @IsOptional()
    @IsNumber(undefined,{ message: 'กำไรที่ต้องการ ต้องเป็นชนิดตัวเลข' })
    desiredProfit?: number; //กำไรที่ต้องการ

    @IsOptional()
    @IsNumber(undefined,{ message: 'ราคาอื่นๆ ต้องเป็นชนิดตัวเลข' })
    priceOther?: number; //	ราคาอื่นๆ

    @IsOptional()
    @IsString()
    @MaxLength(256, { message: 'สินค้าอื่นๆ ต้องมีความยาวไม่เกิน' })
    productOther?: string;	//สินค้าอื่นๆ


    //-------------------------guarantor---------------------//
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateAdvanceGuarantorDto)
    guarantors?:UpdateAdvanceGuarantorDto[]
}

