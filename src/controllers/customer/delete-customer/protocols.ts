import { ICustomer } from "../../../models/customer";
import { IHttpRequest, IHttpResponse } from "../../protocols";

export interface IDeleCustomerController {
  handle(httpRequest: IHttpRequest<any>): Promise<IHttpResponse<ICustomer>>;
}

export interface IDeleteCustomerRepository {
  deleteCustomer(id: string): Promise<ICustomer>;
}
