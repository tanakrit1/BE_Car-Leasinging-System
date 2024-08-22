import { IsDate, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { CarInformation } from "src/database/entities/carinformation.entity";
import { PaginationDto } from "../base/base.dto";
import { Transform, TransformFnParams } from "class-transformer";

export class CarInformationDto extends CarInformation { }

export class SearchCarInformationDto extends PaginationDto {}

export class CreateCarInformationDto {

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'สถานะ ต้องมีความยาวไม่เกิน' })
    carStatus: string;	//สถานะ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ยี่ห้อรถ ต้องมีความยาวไม่เกิน' })
    carBrand: string;//ยี่ห้อรถ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ทะเบียนรถ ต้องมีความยาวไม่เกิน' })
    licensePlate: string;	//ทะเบียนรถ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'เลขตัวถัง ต้องมีความยาวไม่เกิน' })
    vin: string;	//เลขตัวถัง

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'เลขเครื่องยนต์ ต้องมีความยาวไม่เกิน' })
    engineNumber: string;	//เลขเครื่องยนต์

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'สี ต้องมีความยาวไม่เกิน' })
    carColor: string;	//สี

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'รุ่น ต้องมีความยาวไม่เกิน' })
    model: string;	//รุ่น

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ชื่อผู้ขาย ต้องมีความยาวไม่เกิน' })
    sellerName: string;	//ชื่อผู้ขาย

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'นายหน้า ต้องมีความยาวไม่เกิน' })
    agent: string;	//นายหน้า

    @IsOptional()
    @IsString()
    carImage: string;	//รูปภาพ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ปีรถ ต้องมีความยาวไม่เกิน' })
    carDate: string; //วันที่ ปีรถ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ประเภท ต้องมีความยาวไม่เกิน' })
    carType: string; //ประเภท

    @IsOptional()
    @IsNumber(undefined,{ message: 'ราคาขาย ต้องเป็นชนิดตัวเลข' })
    sellingPrice: number; //ราคาขาย

    @IsOptional()
    @IsNumber(undefined,{ message: 'ราคารับซื้อ ต้องเป็นชนิดตัวเลข' })
    buyingPrice: number; //	ราคารับซื้อ

    @IsOptional()
    @IsNumber(undefined,{ message: 'ค่าซ่อมบำรุง ต้องเป็นชนิดตัวเลข' })
    maintenanceCost: number; //	ค่าซ่อมบำรุง

    @IsOptional()
    @IsNumber(undefined,{ message: 'ต้นทุน ต้องเป็นชนิดตัวเลข' })
    cost: number; //	ต้นทุน

    @IsOptional()
    @IsNumber(undefined,{ message: 'กำไรที่ต้องการ ต้องเป็นชนิดตัวเลข' })
    desiredProfit: number; //กำไรที่ต้องการ

    @IsOptional()
    @IsString()
    @MaxLength(256, { message: 'หมายเหตุ ต้องมีความยาวไม่เกิน' })
    carRemarks: string; //หมายเหตุ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'หมวดหมู่รถ ต้องมีความยาวไม่เกิน' })
    carCategory: string; //หมวดหมู่รถ

    @IsOptional()
    @Transform(({ value }: TransformFnParams) => new Date(value))
    @IsDate({message:'วันที่ซื้อเข้า ต้องเป็นรูปแบบวันที่'})
    purchaseDate: Date; //วันที่ซื้อเข้า

    @IsOptional()
    @IsNumber(undefined,{ message: 'ราคาอื่นๆ ต้องเป็นชนิดตัวเลข' })
    priceOther: number; //	ราคาอื่นๆ

    @IsOptional()
    @IsString()
    @MaxLength(256, { message: 'หมายเหตุอื่นๆ ต้องมีความยาวไม่เกิน' })
    noteOther: string;	//หมายเหตุอื่นๆ
}

export class UpdateInformationDto {

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'สถานะ ต้องมีความยาวไม่เกิน' })
    carStatus: string;	//สถานะ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ยี่ห้อรถ ต้องมีความยาวไม่เกิน' })
    carBrand: string;//ยี่ห้อรถ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ทะเบียนรถ ต้องมีความยาวไม่เกิน' })
    licensePlate: string;	//ทะเบียนรถ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'เลขตัวถัง ต้องมีความยาวไม่เกิน' })
    vin: string;	//เลขตัวถัง

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'เลขเครื่องยนต์ ต้องมีความยาวไม่เกิน' })
    engineNumber: string;	//เลขเครื่องยนต์

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'สี ต้องมีความยาวไม่เกิน' })
    carColor: string;	//สี

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'รุ่น ต้องมีความยาวไม่เกิน' })
    model: string;	//รุ่น

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ชื่อผู้ขาย ต้องมีความยาวไม่เกิน' })
    sellerName: string;	//ชื่อผู้ขาย

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'นายหน้า ต้องมีความยาวไม่เกิน' })
    agent: string;	//นายหน้า

    @IsOptional()
    @IsString()
    carImage: string;	//รูปภาพ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ปีรถ ต้องมีความยาวไม่เกิน' })
    carDate: string; //วันที่ ปีรถ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ประเภท ต้องมีความยาวไม่เกิน' })
    carType: string; //ประเภท

    @IsOptional()
    @IsNumber(undefined,{ message: 'ราคาขาย ต้องเป็นชนิดตัวเลข' })
    sellingPrice: number; //ราคาขาย

    @IsOptional()
    @IsNumber(undefined,{ message: 'ราคารับซื้อ ต้องเป็นชนิดตัวเลข' })
    buyingPrice: number; //	ราคารับซื้อ

    @IsOptional()
    @IsNumber(undefined,{ message: 'ค่าซ่อมบำรุง ต้องเป็นชนิดตัวเลข' })
    maintenanceCost: number; //	ค่าซ่อมบำรุง

    @IsOptional()
    @IsNumber(undefined,{ message: 'ต้นทุน ต้องเป็นชนิดตัวเลข' })
    cost: number; //	ต้นทุน

    @IsOptional()
    @IsNumber(undefined,{ message: 'กำไรที่ต้องการ ต้องเป็นชนิดตัวเลข' })
    desiredProfit: number; //กำไรที่ต้องการ

    @IsOptional()
    @IsString()
    @MaxLength(256, { message: 'หมายเหตุ ต้องมีความยาวไม่เกิน' })
    carRemarks: string; //หมายเหตุ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'หมวดหมู่รถ ต้องมีความยาวไม่เกิน' })
    carCategory: string; //หมวดหมู่รถ

    @IsOptional()
    @Transform(({ value }: TransformFnParams) => new Date(value))
    @IsDate({message:'วันที่ซื้อเข้า ต้องเป็นรูปแบบวันที่'})
    purchaseDate: Date; //วันที่ซื้อเข้า

    @IsOptional()
    @IsNumber(undefined,{ message: 'ราคาอื่นๆ ต้องเป็นชนิดตัวเลข' })
    priceOther: number; //	ราคาอื่นๆ

    @IsOptional()
    @IsString()
    @MaxLength(256, { message: 'หมายเหตุอื่นๆ ต้องมีความยาวไม่เกิน' })
    noteOther: string;	//หมายเหตุอื่นๆ
}