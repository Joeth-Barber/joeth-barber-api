import { ICustomer } from "../../../models/customer";
import { ok, serverError } from "../../helpers";
import { IController, IHttpResponse } from "../../protocols";
import { IGetCustomersRepository } from "./protocols";

export class GetCustomersController implements IController {
  constructor(
    private readonly getCustomersRepository: IGetCustomersRepository
  ) {}

  async handle(): Promise<IHttpResponse<ICustomer[] | string>> {
    try {
      const customers = await this.getCustomersRepository.getCustomers();

      return ok<ICustomer[]>(customers);
    } catch (error) {
      return serverError();
    }
  }
}
