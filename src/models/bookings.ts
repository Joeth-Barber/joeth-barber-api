import { IUser } from "./user";
import { IService } from "./service";
import { Decimal } from "@prisma/client/runtime/library";

export interface IBookings {
  id: string;
  userId: string;
  date: Date;
  services?: IService[];
  user?: IUser;
  total: Decimal;
}
