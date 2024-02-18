import { Decimal } from "@prisma/client/runtime/library";
import { IService } from "../../../models/service";

export interface ICreateServiceParams {
  name: string;
  description: string;
  price: Decimal;
}

export interface ICreateServiceRepository {
  createService(params: ICreateServiceParams): Promise<IService>;
}
