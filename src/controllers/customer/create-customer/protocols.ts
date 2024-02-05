import { ICustomer } from "../../../models/customer";

export interface ICreateCustomerParams {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
}

export interface ICreateCustomerRepository {
  createCustomer(params: ICreateCustomerParams): Promise<ICustomer>;
}
