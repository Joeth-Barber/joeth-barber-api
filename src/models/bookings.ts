import { IUser } from "./user";
import { IService } from "./service";

export interface IBookings {
  id: string;
  userId: string;
  date: Date;
  services?: IService[];
  user?: IUser;
}
