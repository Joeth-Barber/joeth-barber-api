import { ICustomer } from "../../../models/customer";
import { badRequest, ok, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IUpdateCustomerParams, IUpdateCustomerRepository } from "./protocols";
import { hash } from "bcrypt";

export class UpdateCustomerController implements IController {
  constructor(
    private readonly updateCustomerRepository: IUpdateCustomerRepository
  ) {}

  async handle(
    httpRequest: IHttpRequest<IUpdateCustomerParams>
  ): Promise<IHttpResponse<ICustomer | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields.");
      }

      if (!id) {
        return badRequest("Missing customer id.");
      }

      const allowedFieldsToUpdate: (keyof IUpdateCustomerParams)[] = [
        "full_name",
        "phone_number",
        "password",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body!).some(
        (key) =>
          !allowedFieldsToUpdate.includes(key as keyof IUpdateCustomerParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received fiel is not allowed.");
      }

      if (body.password) {
        const hashedPassword = await hash(body.password, 10);
        body.password = hashedPassword;
      }

      const customer = await this.updateCustomerRepository.updateCustomer(
        id,
        body
      );

      return ok<ICustomer>(customer);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
