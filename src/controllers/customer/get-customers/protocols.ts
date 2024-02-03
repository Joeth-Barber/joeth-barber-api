import { ICustomer } from "../../../models/customer";
import { IHttpResponse } from "../../protocols";

export interface IGetCustomersController {
  handle(): Promise<IHttpResponse<ICustomer[]>>;
}

export interface IGetCustomersRepository {
  getCustomers(): Promise<ICustomer[]>;
}
