import { ICustomer } from "../../../models/customer";
import { IHttpRequest, IHttpResponse } from "../../protocols";

export interface ICreateCustomerController {
  handle(
    httpRequest: IHttpRequest<ICreateCustomerParams>
  ): Promise<IHttpResponse<ICustomer>>;
}

export interface ICreateCustomerParams {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
}

export interface ICreateCustomerRepository {
  createCustomer(params: ICreateCustomerParams): Promise<ICustomer>;
}
