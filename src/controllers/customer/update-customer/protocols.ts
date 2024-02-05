import { ICustomer } from "../../../models/customer";

export interface IUpdateCustomerParams {
  full_name?: string;
  phone_number?: string;
  password?: string;
}

export interface IUpdateCustomerRepository {
  updateCustomer(id: string, params: IUpdateCustomerParams): Promise<ICustomer>;
}
