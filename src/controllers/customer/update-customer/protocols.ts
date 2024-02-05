import { ICustomer } from "../../../models/customer";

export interface IUpdateCustomerParams {
  full_name?: string;
  phone_number?: string;
  password?: string;
  address?: {
    zip_code: string;
    street: string;
    house_number: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}

export interface IUpdateCustomerRepository {
  updateCustomer(id: number, params: IUpdateCustomerParams): Promise<ICustomer>;
}
