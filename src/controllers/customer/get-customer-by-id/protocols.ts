import { ICustomer } from "../../../models/customer";
import { IHttpResponse } from "../../protocols";

export interface IGetCustomerByIdRepository {
  getCustomerById(id: string): Promise<ICustomer>;
}
