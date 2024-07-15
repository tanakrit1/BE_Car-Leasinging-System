import { Guarantor } from "src/database/entities/guarantor.entity";
import { PaginationDto } from "../base/base.dto";
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class GuarantorDto extends Guarantor { }

export class SearchGuarantorDto extends PaginationDto {}

export class CreateGuarantorDto {

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'guarantorName ต้องมีความยาวไม่เกิน' })
    guarantorName: string;	//ชื่อผู้ค้ำ

    @IsOptional()
    @IsString()
    @MaxLength(256, { message: 'guarantorAddress ต้องมีความยาวไม่เกิน' })
    guarantorAddress: string;	//ที่อยู่ผู้ค้ำ

    @IsOptional()
    @IsString()
    @MaxLength(32, { message: 'guarantorIdCard ต้องมีความยาวไม่เกิน' })
    guarantorIdCard: string;	//บัตรประชาชน

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'guarantorPhone ต้องมีความยาวไม่เกิน' })
    guarantorPhone: string;	//เบอร์ติดต่อ

    @IsOptional()
    @IsNumber()
    saleItem_id?: number; 
}

export class UpdateGuarantorDto {

    id:number
    
    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'guarantorName ต้องมีความยาวไม่เกิน' })
    guarantorName: string;	//ชื่อผู้ค้ำ

    @IsOptional()
    @IsString()
    @MaxLength(256, { message: 'guarantorAddress ต้องมีความยาวไม่เกิน' })
    guarantorAddress: string;	//ที่อยู่ผู้ค้ำ

    @IsOptional()
    @IsString()
    @MaxLength(32, { message: 'guarantorIdCard ต้องมีความยาวไม่เกิน' })
    guarantorIdCard: string;	//บัตรประชาชน

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'guarantorPhone ต้องมีความยาวไม่เกิน' })
    guarantorPhone: string;	//เบอร์ติดต่อ

}


export class UpdateAdvanceGuarantorDto {

    @IsNotEmpty()
    @IsNumber()
    id:number
    
    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'guarantorName ต้องมีความยาวไม่เกิน' })
    guarantorName: string;	//ชื่อผู้ค้ำ

    @IsOptional()
    @IsString()
    @MaxLength(256, { message: 'guarantorAddress ต้องมีความยาวไม่เกิน' })
    guarantorAddress: string;	//ที่อยู่ผู้ค้ำ

    @IsOptional()
    @IsString()
    @MaxLength(32, { message: 'guarantorIdCard ต้องมีความยาวไม่เกิน' })
    guarantorIdCard: string;	//บัตรประชาชน

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'guarantorPhone ต้องมีความยาวไม่เกิน' })
    guarantorPhone: string;	//เบอร์ติดต่อ

}