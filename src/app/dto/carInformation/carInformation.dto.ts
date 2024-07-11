import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { CarInformation } from "src/database/entities/carinformation.entity";
import { PaginationDto } from "../base/base.dto";

export class CarInformationDto extends CarInformation { }

export class SearchCarInformationDto extends PaginationDto {}

export class CreateCarInformationDto {

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'carStatus ต้องมีความยาวไม่เกิน' })
    carStatus: string;	//สถานะ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'carBrand ต้องมีความยาวไม่เกิน' })
    carBrand: string;//ยี่ห้อรถ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'licensePlate ต้องมีความยาวไม่เกิน' })
    licensePlate: string;	//ทะเบียนรถ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'vin ต้องมีความยาวไม่เกิน' })
    vin: string;	//เลขตัวถัง

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'engineNumber ต้องมีความยาวไม่เกิน' })
    engineNumber: string;	//เลขเครื่องยนต์

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'carColor ต้องมีความยาวไม่เกิน' })
    carColor: string;	//สี

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'model ต้องมีความยาวไม่เกิน' })
    model: string;	//รุ่น

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'sellerName ต้องมีความยาวไม่เกิน' })
    sellerName: string;	//ชื่อผู้ขาย

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'agent ต้องมีความยาวไม่เกิน' })
    agent: string;	//นายหน้า

    @IsOptional()
    @IsString()
    carImage: string;	//รูปภาพ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'carDate ต้องมีความยาวไม่เกิน' })
    carDate: string; //วันที่

    @IsOptional()
    @IsNumber()
    sellingPrice: number; //ราคาขาย

    @IsOptional()
    @IsNumber()
    buyingPrice: number; //	ราคารับซื้อ

    @IsOptional()
    @IsNumber()
    maintenanceCost: number; //	ค่าซ่อมบำรุง

    @IsOptional()
    @IsNumber()
    cost: number; //	ต้นทุน

    @IsOptional()
    @IsNumber()
    desiredProfit: number; //กำไรที่ต้องการ


}

export class UpdateInformationDto {

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'carStatus ต้องมีความยาวไม่เกิน' })
    carStatus: string;	//สถานะ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'carBrand ต้องมีความยาวไม่เกิน' })
    carBrand: string;//ยี่ห้อรถ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'licensePlate ต้องมีความยาวไม่เกิน' })
    licensePlate: string;	//ทะเบียนรถ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'vin ต้องมีความยาวไม่เกิน' })
    vin: string;	//เลขตัวถัง

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'engineNumber ต้องมีความยาวไม่เกิน' })
    engineNumber: string;	//เลขเครื่องยนต์

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'carColor ต้องมีความยาวไม่เกิน' })
    carColor: string;	//สี

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'model ต้องมีความยาวไม่เกิน' })
    model: string;	//รุ่น

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'sellerName ต้องมีความยาวไม่เกิน' })
    sellerName: string;	//ชื่อผู้ขาย

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'agent ต้องมีความยาวไม่เกิน' })
    agent: string;	//นายหน้า

    @IsOptional()
    @IsString()
    carImage: string;	//รูปภาพ

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'carDate ต้องมีความยาวไม่เกิน' })
    carDate: string; //วันที่

    @IsOptional()
    @IsNumber()
    sellingPrice: number; //ราคาขาย

    @IsOptional()
    @IsNumber()
    buyingPrice: number; //	ราคารับซื้อ

    @IsOptional()
    @IsNumber()
    maintenanceCost: number; //	ค่าซ่อมบำรุง

    @IsOptional()
    @IsNumber()
    cost: number; //	ต้นทุน

    @IsOptional()
    @IsNumber()
    desiredProfit: number; //กำไรที่ต้องการ


}