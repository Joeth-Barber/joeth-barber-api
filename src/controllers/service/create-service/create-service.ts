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
      const body = httpRequest.body;

      if (!body) {
        return badRequest("You must fill the fields before continuing.");
      }

      const service = await this.createServiceRepository.createService(body);

      return created<IService>(service);
    } catch (error) {
      console.log(error);

      return serverError();
    }
  }
}
