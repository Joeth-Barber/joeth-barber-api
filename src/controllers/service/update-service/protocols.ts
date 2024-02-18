import { Decimal } from "@prisma/client/runtime/library";
import { IService } from "../../../models/service";

export interface IUpdateServiceParams {
  name?: string;
  description?: string;
  price?: Decimal;
}

export interface IUpdateServiceRepository {
  updateService(id: string, params: IUpdateServiceParams): Promise<IService>;
}
