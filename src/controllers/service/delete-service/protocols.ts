import { IService } from "../../../models/service";

export interface IDeleteServiceRepository {
  deleteService(id: string): Promise<IService>;
}
