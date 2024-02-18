import { IService } from "../../../models/service";
import { badRequest, created, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { ICreateServiceParams, ICreateServiceRepository } from "./protocols";

export class CreateServiceController implements IController {
  constructor(
    private readonly createServiceRepository: ICreateServiceRepository
  ) {}

  async handle(
    httpRequest: IHttpRequest<ICreateServiceParams>
  ): Promise<IHttpResponse<IService | string>> {
    try {
      const service = httpRequest.body;

      if (!service?.name || !service?.description || !service?.price) {
        return badRequest("You must fill the fields before continuing.");
      }

      const newService =
        await this.createServiceRepository.createService(service);

      return created<IService>(newService);
    } catch (error) {
      console.log(error);

      return serverError();
    }
  }
}
