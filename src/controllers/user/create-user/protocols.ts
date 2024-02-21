import { Decimal } from "@prisma/client/runtime/library";
import { IUser } from "../../../models/user";

export interface ICreateUserParams {
  role: string;
  full_name: string;
  nickname: string;
  isMonthlyPayer: boolean;
  debt: Decimal;
  email: string;
  phone_number: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: ICreateUserParams): Promise<IUser>;
}
