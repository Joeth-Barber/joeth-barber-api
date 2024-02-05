import { ICustomer } from "../../../models/customer";
import { IHttpRequest, IHttpResponse } from "../../protocols";
import {
  IUpdateCustomerController,
  IUpdateCustomerParams,
  IUpdateCustomerRepository,
} from "./protocols";
import { hash } from "bcrypt";

export class UpdateCustomerController implements IUpdateCustomerController {
  constructor(
    private readonly updateCustomerRepository: IUpdateCustomerRepository
  ) {}

  async handle(
    httpRequest: IHttpRequest<any>
  ): Promise<IHttpResponse<ICustomer>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing customer id.",
        };
      }

      const allowedFieldsToUpdate: (keyof IUpdateCustomerParams)[] = [
        "full_name",
        "phone_number",
        "password",
        "address",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) =>
          !allowedFieldsToUpdate.includes(key as keyof IUpdateCustomerParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: "Some received fiel is not allowed.",
        };
      }

      if (body.password) {
        const hashedPassword = await hash(body.password, 10);
        body.password = hashedPassword;
      }

      const customer = await this.updateCustomerRepository.updateCustomer(
        id,
        body
      );

      return {
        statusCode: 200,
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