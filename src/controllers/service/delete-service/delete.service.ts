import { IService } from "../../../models/service";
import { badRequest, ok, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IDeleteServiceRepository } from "./protocols";

export class DeleteServiceController implements IController {
  constructor(
    private readonly deleteServiceRepository: IDeleteServiceRepository
  ) {}

  async handle(
    httpRequest: IHttpRequest<any>
  ): Promise<IHttpResponse<IService | string>> {
    try {
      const id = httpRequest?.params?.id;

      console.log("service id: ", id);

      if (!id) {
        return badRequest("Missing service Id.");
      }

      const service = await this.deleteServiceRepository.deleteService(id);

      return ok<IService>(service);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
