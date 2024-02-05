import { IController } from "../../protocols";
import { IGetCustomersRepository } from "./protocols";

export class GetCustomersController implements IController {
  constructor(
    private readonly getCustomersRepository: IGetCustomersRepository
  ) {}

  async handle() {
    try {
      const customers = await this.getCustomersRepository.getCustomers();

      return {
        statusCode: 200,
        body: customers,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
