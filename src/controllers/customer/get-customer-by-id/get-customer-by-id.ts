import { ICustomer } from "../../../models/customer";
import { badRequest, ok, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IGetCustomerByIdRepository } from "./protocols";

export class GetCustomerByIdController implements IController {
  constructor(
    private readonly getCustomerByIdRepository: IGetCustomerByIdRepository
  ) {}
  async handle(
    httpRequest: IHttpRequest<any>
  ): Promise<IHttpResponse<ICustomer | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Customer not found.");
      }

      const customer = await this.getCustomerByIdRepository.getCustomerById(id);

      return ok<ICustomer>(customer);
    } catch (error) {
      return serverError();
    }
  }
}
