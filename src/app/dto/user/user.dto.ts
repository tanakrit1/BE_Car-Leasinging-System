
import { PaginationDto } from "../base/base.dto";
import { User } from "src/database/entities/user.entity";
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';


export class UserDto extends User { }

export class SearchUserDto extends PaginationDto {
  @IsOptional()
  @IsString()
  employeeID: string;
}


export class CreateUserDto {

  @IsNotEmpty({ message: 'employeeID ต้องไม่เป็นค่าว่าง' })
  @IsString()
  @MaxLength(8, {message:'employeeID ต้องมีความยาวไม่เกิน 8 ตัวอักษร'
  })
  employeeID: string;


  @IsNotEmpty({ message: 'username ต้องไม่เป็นค่าว่าง' })
  @IsString()
  @MaxLength(16, {message:'username ต้องมีความยาวไม่เกิน 16 ตัวอักษร'})
  username: string;

  @IsNotEmpty({ message: 'password ต้องไม่เป็นค่าว่าง' })
  @IsString()
  @MaxLength(8, {message:'password ต้องมีความยาวไม่เกิน 8 ตัวอักษร'})
  // @IsStrongPassword(
  //   { minLength: 12 },
  //   {
  //     message:
  //       'รหัสผ่าน ต้องความยาวไม่น้อยกว่า 12 ตัวอักษร และประกอบด้วยตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก ตัวเลข และอักขระพิเศษ',
  //   },
  // )
  password: string;


  @IsNotEmpty({ message: 'firstName ต้องไม่เป็นค่าว่าง' })
  @IsString()
  @MaxLength(50, {message:'firstName ต้องมีความยาวไม่เกิน 50 ตัวอักษร'})
  firstName: string;


  @IsNotEmpty({ message: 'lastName ต้องไม่เป็นค่าว่าง' })
  @IsString()
  @MaxLength(50, {message:'lastName ต้องมีความยาวไม่เกิน 50 ตัวอักษร'})
  lastName: string;

  @IsNotEmpty({ message: 'role ต้องไม่เป็นค่าว่าง' })
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsBoolean()
  isDashboard: boolean;

  @IsOptional()
  @IsBoolean()
  isCardata: boolean;

  @IsOptional()
  @IsBoolean()
  isCustomerData: boolean;

  @IsOptional()
  @IsBoolean()
  isPayment: boolean;

  @IsOptional()
  @IsBoolean()
  isEmployee: boolean;
}

export class UpdateUserDto {
  id: number;
  username: string;

  @IsOptional()
  @IsString()
  @MaxLength(8, {message:'employeeID ต้องมีความยาวไม่เกิน 8 ตัวอักษร'
  })
  employeeID: string;

  @IsOptional()
  @IsString()
  @MaxLength(8, {message:'password ต้องมีความยาวไม่เกิน 8 ตัวอักษร'})
  // @IsStrongPassword(
  //   { minLength: 12 },
  //   {
  //     message:
  //       'รหัสผ่าน ต้องความยาวไม่น้อยกว่า 12 ตัวอักษร และประกอบด้วยตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก ตัวเลข และอักขระพิเศษ',
  //   },
  // )
  password: string;


  @IsOptional()
  @IsString()
  @MaxLength(50, {message:'firstName ต้องมีความยาวไม่เกิน 50 ตัวอักษร'})
  firstName: string;


  @IsOptional()
  @IsString()
  @MaxLength(50, {message:'lastName ต้องมีความยาวไม่เกิน 50 ตัวอักษร'})
  lastName: string;

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsBoolean()
  isDashboard: boolean;

  @IsOptional()
  @IsBoolean()
  isCardata: boolean;

  @IsOptional()
  @IsBoolean()
  isCustomerData: boolean;

  @IsOptional()
  @IsBoolean()
  isPayment: boolean;
  
  @IsOptional()
  @IsBoolean()
  isEmployee: boolean;
}

