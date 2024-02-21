import { ICustomer } from "../../../models/customer";
import { ok, serverError, unauthorized } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { ICustomerLoginRepository } from "./protocols";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "dotenv";

config();
const JWT_SECRET = process.env.JWT_SECRET;

export class CustomerLoginController implements IController {
  constructor(
    private readonly customerLoginRepository: ICustomerLoginRepository
  ) {}

  async handle(
    httpRequest: IHttpRequest<any>
  ): Promise<IHttpResponse<ICustomer | string>> {
    try {
      const { email, password } = httpRequest.body;

      if (!email || !password) {
        return unauthorized("Invalid email or password.");
      }

      const customer = await this.customerLoginRepository.customerLogin({
        email,
        password,
      });
      const passwordMatch = await bcrypt.compare(password, customer.password);

      if (!passwordMatch) {
        return unauthorized("Invalid email or password.");
      }

      const token = jwt.sign(
        { customerId: customer.id },
        JWT_SECRET || "JOETHBARBERPROJECT",
        {
          expiresIn: "48h",
        }
      );

      return ok<ICustomer>(token);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
