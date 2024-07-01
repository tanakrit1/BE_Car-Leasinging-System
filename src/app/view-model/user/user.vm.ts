import { Type, plainToInstance } from "class-transformer";
import { PaginationMetadataModel } from "src/app/models/base.model";
import { HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { PaginationMetadataResponseVm, ResponseVm } from "../base/base.vm";
import { UserPaginationModel } from "src/app/models/user.model";


export class UserResponseModel {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  employeeID: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  status: boolean;
  isDashboard: boolean;
  isCardata: boolean;
  isCustomerData: boolean;
  isPayment: boolean;
  isEmployee: boolean;
}

export class UserPaginationVm extends ResponseVm {
  @Type(() => PaginationMetadataResponseVm)
  metadata?: PaginationMetadataResponseVm;

  @Type(() => UserResponseModel)
  data: UserResponseModel[];

  static convertToViewModel(
    pagination: UserPaginationModel,
    metadata: PaginationMetadataModel,
  ): UserPaginationVm {
    try {
      const requestObject: UserPaginationVm = plainToInstance(
        UserPaginationVm,
        {
          statusCode: HttpStatus.OK,
          message: HttpStatus[HttpStatus.OK],
          metadata: PaginationMetadataResponseVm.convertToViewModel(metadata),
          data: pagination.users.map(
            (user) => UserResponseVm.convertToViewModel(user).data,
          ),
        } as UserPaginationVm,
      );
      return requestObject;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}

export class UserResponseVm extends ResponseVm {
  @Type(() => UserResponseModel)
  data: UserResponseModel;
  static convertToViewModel(response: UserResponseModel): UserResponseVm {
    try {
      return plainToInstance(UserResponseVm, {
        statusCode: HttpStatus.OK,
        message: HttpStatus[HttpStatus.OK],
        data: {
          id: response.id,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
          employeeID: response.employeeID,
          username: response.username,
          firstName: response.firstName,
          lastName: response.lastName,
          role: response.role,
          phone: response.phone,
          status: response.status,
          isDashboard: response.isDashboard,
          isCardata: response.isCardata,
          isCustomerData: response.isCustomerData,
          isPayment: response.isPayment,
          isEmployee: response.isEmployee
        } as UserResponseModel,
      } as UserResponseVm);
    } catch (err) {
      throw new InternalServerErrorException(undefined, err.errors);
    }
  }
}

