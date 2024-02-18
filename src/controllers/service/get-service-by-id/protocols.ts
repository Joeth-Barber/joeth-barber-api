import { IService } from "../../../models/service";

export interface IGetServiceByIdRepository {
  getServiceById(id: string): Promise<IService>;
}
