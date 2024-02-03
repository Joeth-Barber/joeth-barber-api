import { ICustomer } from "../../../models/customer";
import { IHttpRequest, IHttpResponse } from "../../protocols";
import {
  ICreateCustomerController,
  ICreateCustomerParams,
  ICreateCustomerRepository,
} from "./protocols";
import validator from "validator";

export class CreateCustomerController implements ICreateCustomerController {
  constructor(
    private readonly createCustomerRepository: ICreateCustomerRepository
  ) {}

  async handle(
    httpRequest: IHttpRequest<ICreateCustomerParams>
  ): Promise<IHttpResponse<ICustomer>> {
    const requiredFields = [
      "full_name",
      "email",
      "password",
      "phone_number",
      "address.zip_code",
      "address.street",
      "address.house_number",
      "address.neighborhood",
      "address.city",
      "address.state",
    ];

    for (const field of requiredFields) {
      const fieldValue =
        httpRequest?.body?.[field as keyof ICreateCustomerParams];

      if (
        typeof fieldValue === "object" &&
        fieldValue !== null &&
        Object.values(fieldValue).some(
          (value) => typeof value === "string" && value.trim() === ""
        )
      ) {
        return {
          statusCode: 400,
          body: `Field ${field} is required and must not be empty!`,
        };
      }
    }

    const emailIsValid = validator.isEmail(httpRequest.body!.email);

    if (!emailIsValid) {
      return {
        statusCode: 400,
        body: "E-mail is invalid.",
      };
    }

    try {
      const customer = await this.createCustomerRepository.createCustomer(
        httpRequest.body!
      );
      return {
        statusCode: 201,
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
