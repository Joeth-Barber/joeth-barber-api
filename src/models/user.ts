import { Decimal } from "@prisma/client/runtime/library";

export interface IUser {
  id: string;
  role: string;
  isMonthlyPayer: boolean | false;
  full_name: string;
  nickname: string;
  email: string;
  password: string;
  phone_number: string;
  debt: Decimal | null;
  token?: string;
}
