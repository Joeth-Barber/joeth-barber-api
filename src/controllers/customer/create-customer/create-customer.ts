import { ICustomer } from "../../../models/customer";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { ICreateCustomerParams, ICreateCustomerRepository } from "./protocols";
import bcrypt from "bcrypt";
import validator from "validator";

export class CreateCustomerController implements IController {
  constructor(
    private readonly createCustomerRepository: ICreateCustomerRepository
  ) {}

  async handle(
    httpRequest: IHttpRequest<ICreateCustomerParams>
  ): Promise<IHttpResponse<ICustomer>> {
    try {
      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: "E-mail is invalid.",
        };
      }

      const hashedPassword = await bcrypt.hash(httpRequest.body!.password, 10);

      const newCustomer: ICreateCustomerParams = {
        ...httpRequest.body!,
        password: hashedPassword,
      };

      const customer =
        await this.createCustomerRepository.createCustomer(newCustomer);
      return {
        statusCode: 201,
        body: customer,
      };
    } catch (error) {
      console.log(error);

      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
