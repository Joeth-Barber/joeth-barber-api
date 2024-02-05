import { ICustomer } from "../../../models/customer";
import { IHttpRequest, IHttpResponse } from "../../protocols";

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

export interface IUpdateCustomerController {
  handle(httpRequest: IHttpRequest<any>): Promise<IHttpResponse<ICustomer>>;
}

export interface IUpdateCustomerRepository {
  updateCustomer(id: string, params: IUpdateCustomerParams): Promise<ICustomer>;
}
