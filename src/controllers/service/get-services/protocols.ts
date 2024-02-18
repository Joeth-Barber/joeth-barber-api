import { IService } from "../../../models/service";

export interface IGetServiceRepository {
  getService(): Promise<IService[]>;
}
