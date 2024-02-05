import { ICustomer } from "../../../models/customer";
import { badRequest, ok, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IDeleteCustomerRepository } from "./protocols";

export class DeleteCustomerController implements IController {
  constructor(
    private readonly deleteCustomerRepository: IDeleteCustomerRepository
  ) {}

  async handle(
    httpRequest: IHttpRequest<any>
  ): Promise<IHttpResponse<ICustomer | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing customer Id.");
      }

      const customer = await this.deleteCustomerRepository.deleteCustomer(id);

      return ok<ICustomer>(customer);
    } catch (error) {
      return serverError();
    }
  }
}
