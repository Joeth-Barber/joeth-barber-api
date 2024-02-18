import { Decimal } from "@prisma/client/runtime/library";

export interface IService {
  name: string;
  description: string;
  price: Decimal;
}
