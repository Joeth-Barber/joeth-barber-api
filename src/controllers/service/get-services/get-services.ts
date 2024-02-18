import { IService } from "../../../models/service";
import { ok, serverError } from "../../helpers";
import { IController, IHttpResponse } from "../../protocols";
import { IGetServiceRepository } from "./protocols";

export class GetServicesController implements IController {
  constructor(private readonly getServicesRepository: IGetServiceRepository) {}

  async handle(): Promise<IHttpResponse<IService[] | string>> {
    try {
      const services = await this.getServicesRepository.getService();

      return ok<IService[]>(services);
    } catch (error) {
      return serverError();
    }
  }
}
