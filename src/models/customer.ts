import { Decimal } from "@prisma/client/runtime/library";

export interface ICustomer {
  full_name: string;
  nickname: string;
  isMonthlyPayer: boolean | null;
  debt: Decimal | null;
  email: string;
  phone_number: string;
  password: string;
}
