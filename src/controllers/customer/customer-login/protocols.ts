import { ICustomer } from "../../../models/customer";

export interface ICustomerLoginParams {
  email: string;
  password: string;
}

export interface ICustomerLoginRepository {
  customerLogin(params: ICustomerLoginParams): Promise<ICustomer>;
}
