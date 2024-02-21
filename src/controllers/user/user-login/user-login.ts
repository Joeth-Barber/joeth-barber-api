import { IUser } from "../../../models/user";
import { ok, serverError, unauthorized } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IUserLoginRepository } from "./protocols";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "dotenv";

config();
const JWT_SECRET = process.env.JWT_SECRET;

export class UserLoginController implements IController {
  constructor(private readonly userLoginRepository: IUserLoginRepository) {}

  async handle(
    httpRequest: IHttpRequest<any>
  ): Promise<IHttpResponse<IUser | string>> {
    try {
      const { email, password } = httpRequest.body;

      if (!email || !password) {
        return unauthorized("Invalid email or password.");
      }

      const user = await this.userLoginRepository.userLogin({
        email,
        password,
      });
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return unauthorized("Invalid email or password.");
      }

      // TODO: mover esta criação de token para um arquivo helper

      const token = jwt.sign(
        { userId: user.id },
        JWT_SECRET || "JOETHBARBERPROJECT",
        {
          expiresIn: "48h",
        }
      );

      return ok<IUser>(token);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
