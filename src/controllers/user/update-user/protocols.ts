import { Decimal } from "@prisma/client/runtime/library";
import { IUser } from "../../../models/user";

export interface IUpdateUserParams {
  full_name?: string;
  nickname?: string;
  email?: string;
  isMonthlyPayer?: boolean;
  debt?: Decimal;
  phone_number?: string;
  password?: string;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: IUpdateUserParams): Promise<IUser>;
}
