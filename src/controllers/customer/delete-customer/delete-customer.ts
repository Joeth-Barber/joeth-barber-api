import { ICustomer } from "../../../models/customer";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IDeleteCustomerRepository } from "./protocols";

export class DeleteCustomerController implements IController {
  constructor(
    private readonly deleteCustomerRepository: IDeleteCustomerRepository
  ) {}

  async handle(
    httpRequest: IHttpRequest<any>
  ): Promise<IHttpResponse<ICustomer>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing customer Id.",
        };
      }

      const customer = await this.deleteCustomerRepository.deleteCustomer(id);

      return {
        statusCode: 200,
        body: customer,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
