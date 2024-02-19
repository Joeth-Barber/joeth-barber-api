import { IService } from "./service";

export interface IBookings {
  id: string;
  customerId: string;
  date: Date;
  services: IService[];
}
