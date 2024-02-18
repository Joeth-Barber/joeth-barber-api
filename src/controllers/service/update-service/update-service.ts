import { IService } from "../../../models/service";
import { badRequest, ok, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IUpdateServiceRepository } from "./protocols";

export class UpdateServiceController implements IController {
  constructor(
    private readonly updateServiceRepository: IUpdateServiceRepository
  ) {}

  async handle(
    httpRequest: IHttpRequest<any>
  ): Promise<IHttpResponse<IService | string>> {
    try {
      const id = httpRequest.params?.id;
      const body = httpRequest.body;

      if (!id) {
        return badRequest("Missing service id.");
      }

      if (!body) {
        return badRequest("You must fill the fields before continuing.");
      }

      const service = await this.updateServiceRepository.updateService(
        id,
        body
      );

      return ok<IService>(service);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
