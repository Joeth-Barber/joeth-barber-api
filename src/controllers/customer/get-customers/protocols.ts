import { ICustomer } from "../../../models/customer";

export interface IGetCustomersRepository {
  getCustomers(): Promise<ICustomer[]>;
}
