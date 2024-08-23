import { Guarantor } from "src/database/entities/guarantor.entity";
import { PaginationDto } from "../base/base.dto";
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class GuarantorDto extends Guarantor { }

export class SearchGuarantorDto extends PaginationDto {}

export class CreateGuarantorDto {

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ชื่อผู้ค้ำ ต้องมีความยาวไม่เกิน' })
    guarantorName: string;	//ชื่อผู้ค้ำ

    @IsOptional()
    @IsString()
    @MaxLength(256, { message: 'ที่อยู่ผู้ค้ำ ต้องมีความยาวไม่เกิน' })
    guarantorAddress: string;	//ที่อยู่ผู้ค้ำ

    @IsOptional()
    @IsString()
    @MaxLength(32, { message: 'บัตรประชาชน ต้องมีความยาวไม่เกิน' })
    guarantorIdCard: string;	//บัตรประชาชน

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'เบอร์ติดต่อ ต้องมีความยาวไม่เกิน' })
    guarantorPhone: string;	//เบอร์ติดต่อ

    @IsOptional()
    @IsNumber(undefined,{ message: 'saleItem_id ต้องเป็นชนิดตัวเลข' })
    saleItem_id?: number; 

    @IsOptional()
    @IsString()
    guarantorImage: string;	//รูปภาพ

    @IsOptional()
    @IsString()
    @MaxLength(128, { message: 'guarantorGPS ต้องมีความยาวไม่เกิน' })
    guarantorGPS: string;	//guarantorGPS
}

export class UpdateGuarantorDto {

    id:number
    
    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ชื่อผู้ค้ำ ต้องมีความยาวไม่เกิน' })
    guarantorName: string;	//ชื่อผู้ค้ำ

    @IsOptional()
    @IsString()
    @MaxLength(256, { message: 'ที่อยู่ผู้ค้ำ ต้องมีความยาวไม่เกิน' })
    guarantorAddress: string;	//ที่อยู่ผู้ค้ำ

    @IsOptional()
    @IsString()
    @MaxLength(32, { message: 'บัตรประชาชน ต้องมีความยาวไม่เกิน' })
    guarantorIdCard: string;	//บัตรประชาชน

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'เบอร์ติดต่อ ต้องมีความยาวไม่เกิน' })
    guarantorPhone: string;	//เบอร์ติดต่อ

    @IsOptional()
    @IsString()
    guarantorImage: string;	//รูปภาพ

    
    @IsOptional()
    @IsString()
    @MaxLength(128, { message: 'guarantorGPS ต้องมีความยาวไม่เกิน' })
    guarantorGPS: string;	//guarantorGPS

}


export class UpdateAdvanceGuarantorDto {

    @IsNotEmpty({ message: 'id ต้องไม่เป็นค่าว่าง' })
    @IsNumber( undefined,{ message: 'id ต้องเป็นชนิดตัวเลข' })
    id:number;
    
    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ชื่อผู้ค้ำ ต้องมีความยาวไม่เกิน' })
    guarantorName: string;	//ชื่อผู้ค้ำ

    @IsOptional()
    @IsString()
    @MaxLength(256, { message: 'ที่อยู่ผู้ค้ำ ต้องมีความยาวไม่เกิน' })
    guarantorAddress: string;	//ที่อยู่ผู้ค้ำ

    @IsOptional()
    @IsString()
    @MaxLength(32, { message: 'บัตรประชาชน ต้องมีความยาวไม่เกิน' })
    guarantorIdCard: string;	//บัตรประชาชน

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'เบอร์ติดต่อ ต้องมีความยาวไม่เกิน' })
    guarantorPhone: string;	//เบอร์ติดต่อ
    
    @IsOptional()
    @IsString()
    guarantorImage: string;	//รูปภาพ

    
    @IsOptional()
    @IsString()
    @MaxLength(128, { message: 'guarantorGPS ต้องมีความยาวไม่เกิน' })
    guarantorGPS: string;	//guarantorGPS
}