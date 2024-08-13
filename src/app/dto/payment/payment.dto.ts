import { Payment } from "src/database/entities/payment.entity";
import { PaginationDto } from "../base/base.dto";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";

export class PaymentDto extends Payment { }

export class SearchPaymentDto extends PaginationDto {}

export class CreatePaymentDto {

    @IsOptional()
    @Transform(({ value }: TransformFnParams) => new Date(value))
    @IsDate({message:'วันที่ชำระ ต้องเป็นรูปแบบวันที่'})
    datePay: Date; //วันที่ชำระ

    @IsOptional()
    @IsNumber( undefined,{ message: 'เงินต้นที่ชำระเเล้ว ต้องเป็นชนิดตัวเลข' })
    principalPay: number; //เงินต้นที่ชำระเเล้ว

    @IsOptional()
    @IsNumber(undefined,{ message: 'ดอกเบี้ยที่ชำระเเล้ว ต้องเป็นชนิดตัวเลข' })
    InterestPay: number; //ดอกเบี้ยที่ชำระเเล้ว

    @IsOptional()
    @IsNumber(undefined,{ message: 'ชำระแล้ว ต้องเป็นชนิดตัวเลข' })
    amountPay: number; //ชำระแล้ว

    @IsOptional()
    @IsNumber(undefined,{ message: 'ยอดเงินคงเหลือ ต้องเป็นชนิดตัวเลข' })
    balancePay: number; //ยอดเงินคงเหลือ

    @IsOptional()
    @IsNumber(undefined,{ message: 'ค่าปรับ ต้องเป็นชนิดตัวเลข' })
    fee: number; //ค่าปรับ

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'การชำระ ต้องมีความยาวไม่เกิน' })
    methodPay: string; //การชำระ(เงินสด/เงินโอน)

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'ผู้รับเงิน ต้องมีความยาวไม่เกิน' })
    receiver: string; //ผู้รับเงิน

    @IsOptional()
    @IsString()
    @MaxLength(512, { message: 'note ต้องมีความยาวไม่เกิน' })
    note: string; //note

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'bank ต้องมีความยาวไม่เกิน' })
    bank: string; //bank

    @IsOptional()
    @IsString()
    @MaxLength(128, { message: 'ชื่อบัญชี ต้องมีความยาวไม่เกิน' })
    accountName: string; //ชื่อบัญชี

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'เลขที่บัญชี ต้องมีความยาวไม่เกิน' })
    accountNumber: string; //เลขที่บัญชี

    @IsNotEmpty({ message: 'saleItem_id ต้องไม่เป็นค่าว่าง' })
    @IsNumber(undefined,{ message: 'saleItem_id ต้องเป็นชนิดตัวเลข' })
    saleItem_id?: number; 

}