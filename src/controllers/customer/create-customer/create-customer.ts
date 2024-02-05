import { ICustomer } from "../../../models/customer";
import { badRequest, created, serverError } from "../../helpers";
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
  ): Promise<IHttpResponse<ICustomer | string>> {
    try {
      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return badRequest("E-mail is invalid.");
      }

      const hashedPassword = await bcrypt.hash(httpRequest.body!.password, 10);

      const newCustomer: ICreateCustomerParams = {
        ...httpRequest.body!,
        password: hashedPassword,
      };

      const customer =
        await this.createCustomerRepository.createCustomer(newCustomer);

      return created<ICustomer>(customer);
    } catch (error) {
      console.log(error);

      return serverError();
    }
  }
}
