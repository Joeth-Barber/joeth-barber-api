import { Decimal } from "@prisma/client/runtime/library";
import { ICustomer } from "../../../models/customer";

export interface IUpdateCustomerParams {
  full_name?: string;
  nickname?: string;
  isMonthlyPayer?: boolean;
  debt?: Decimal;
  phone_number?: string;
  password?: string;
}

export interface IUpdateCustomerRepository {
  updateCustomer(id: string, params: IUpdateCustomerParams): Promise<ICustomer>;
}
