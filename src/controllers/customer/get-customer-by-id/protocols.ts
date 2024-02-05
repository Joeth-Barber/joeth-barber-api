import { ICustomer } from "../../../models/customer";

export interface IGetCustomerByIdRepository {
  getCustomerById(id: string): Promise<ICustomer>;
}
