import { Payment } from "src/database/entities/payment.entity";
import { PaginationDto } from "../base/base.dto";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";

export class PaymentDto extends Payment { }

export class SearchPaymentDto extends PaginationDto {}

export class CreatePaymentDto {

    @IsOptional()
    @Transform(({ value }: TransformFnParams) => new Date(value))
    @IsDate({message:'datePay ต้องเป็นวันที่'})
    datePay: Date; //วันที่ชำระ

    @IsOptional()
    @IsNumber()
    principalPay: number; //เงินต้นที่ชำระเเล้ว

    @IsOptional()
    @IsNumber()
    InterestPay: number; //ดอกเบี้ยที่ชำระเเล้ว

    @IsOptional()
    @IsNumber()
    amountPay: number; //ชำระแล้ว

    @IsOptional()
    @IsNumber()
    balancePay: number; //ยอดเงินคงเหลือ

    @IsOptional()
    @IsNumber()
    fee: number; //ค่าปรับ

    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'methodPay ต้องมีความยาวไม่เกิน' })
    methodPay: string; //การชำระ(เงินสด/เงินโอน)

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'receiver ต้องมีความยาวไม่เกิน' })
    receiver: string; //ผู้รับเงิน

    @IsOptional()
    @IsString()
    @MaxLength(512, { message: 'note ต้องมีความยาวไม่เกิน' })
    note: string; //note

    @IsNotEmpty()
    @IsNumber()
    saleItem_id?: number; 

}