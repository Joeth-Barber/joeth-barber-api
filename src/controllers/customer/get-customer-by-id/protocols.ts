import { ICustomer } from "../../../models/customer";
import { IHttpRequest, IHttpResponse } from "../../protocols";

export interface IGetCustomerByIdController {
  handle(httpRequest: IHttpRequest<any>): Promise<IHttpResponse<ICustomer>>;
}

export interface IGetCustomerByIdRepository {
  getCustomerById(id: string): Promise<ICustomer>;
}
