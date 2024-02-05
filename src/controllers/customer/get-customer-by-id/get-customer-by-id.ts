import { ICustomer } from "../../../models/customer";
import { IHttpRequest, IHttpResponse } from "../../protocols";
import {
  IGetCustomerByIdController,
  IGetCustomerByIdRepository,
} from "./protocols";

export class GetCustomerByIdController implements IGetCustomerByIdController {
  constructor(
    private readonly getCustomerByIdRepository: IGetCustomerByIdRepository
  ) {}
  async handle(
    httpRequest: IHttpRequest<any>
  ): Promise<IHttpResponse<ICustomer>> {
    try {
      const id = httpRequest?.body?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: "Customer not found.",
        };
      }

      const customer = await this.getCustomerByIdRepository.getCustomerById(id);

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
