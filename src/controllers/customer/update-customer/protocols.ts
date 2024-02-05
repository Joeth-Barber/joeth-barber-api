import { ICustomer } from "../../../models/customer";
import { IHttpRequest, IHttpResponse } from "../../protocols";

export interface IUpdateCustomerParams {
  full_name?: string;
  phone_number?: string;
  password?: string;
}

export interface IUpdateCustomerController {
  handle(httpRequest: IHttpRequest<any>): Promise<IHttpResponse<ICustomer>>;
}

export interface IUpdateCustomerRepository {
  updateCustomer(id: string, params: IUpdateCustomerParams): Promise<ICustomer>;
}
