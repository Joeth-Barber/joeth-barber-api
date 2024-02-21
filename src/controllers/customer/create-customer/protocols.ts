import { Decimal } from "@prisma/client/runtime/library";
import { ICustomer } from "../../../models/customer";

export interface ICreateCustomerParams {
  isAdmin: boolean;
  full_name: string;
  nickname: string;
  isMonthlyPayer: boolean;
  debt: Decimal;
  email: string;
  phone_number: string;
  password: string;
}

export interface ICreateCustomerRepository {
  createCustomer(params: ICreateCustomerParams): Promise<ICustomer>;
}
