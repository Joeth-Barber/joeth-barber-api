import { IService } from "../../../models/service";
import { badRequest, ok, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IGetServiceByIdRepository } from "./protocols";

export class GetServiceByIdController implements IController {
  constructor(private readonly getServiceById: IGetServiceByIdRepository) {}

  async handle(
    httpRequest: IHttpRequest<any>
  ): Promise<IHttpResponse<IService | string>> {
    try {
      const id = httpRequest.params?.id;

      if (!id) {
        return badRequest("Service not found.");
      }

      const service = await this.getServiceById.getServiceById(id);

      return ok<IService>(service);
    } catch (error) {
      return serverError();
    }
  }
}
