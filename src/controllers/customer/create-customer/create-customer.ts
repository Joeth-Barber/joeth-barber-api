import { ICustomer } from "../../../models/customer";
import { badRequest, created, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { ICreateCustomerParams, ICreateCustomerRepository } from "./protocols";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { config } from "dotenv";

config();
const JWT_SECRET = process.env.JWT_SECRET;

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

      const token = jwt.sign(
        { customerId: customer.id },
        JWT_SECRET || "JOETHBARBERPROJECT",
        {
          expiresIn: "48h",
        }
      );

      return created<ICustomer>(token);
    } catch (error) {
      console.log(error);

      return serverError();
    }
  }
}
