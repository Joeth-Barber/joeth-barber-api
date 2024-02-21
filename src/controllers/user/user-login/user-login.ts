import { createToken } from "../../../middlewares/createToken";
import { IUser } from "../../../models/user";
import { ok, serverError, unauthorized } from "../../helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IUserBody,
} from "../../protocols";
import { IUserLoginRepository } from "./protocols";

import bcrypt from "bcrypt";

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

      const token = createToken(user);

      const authenticatedUser: IUserBody = {
        id: user.id,
        role: user.role,
        token: token,
      };

      return ok<IUser>(authenticatedUser);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
