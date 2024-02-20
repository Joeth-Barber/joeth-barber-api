import { ICustomer } from "./customer";
import { IService } from "./service";

export interface IBookings {
  id: string;
  customerId: string;
  date: Date;
  services?: IService[];
  customer?: ICustomer;
}
