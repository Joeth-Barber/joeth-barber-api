import { ICustomer } from "../../../models/customer";

export interface ICreateCustomerParams {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  address: {
    zip_code: string;
    street: string;
    house_number: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}

export interface ICreateCustomerRepository {
  createCustomer(params: ICreateCustomerParams): Promise<ICustomer>;
}
