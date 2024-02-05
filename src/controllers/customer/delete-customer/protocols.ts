import { ICustomer } from "../../../models/customer";

export interface IDeleteCustomerRepository {
  deleteCustomer(id: string): Promise<ICustomer>;
}
