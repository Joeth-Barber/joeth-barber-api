import { IUser } from "../../../models/user";
import { badRequest, created, serverError } from "../../helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IUserBody,
} from "../../protocols";
import { ICreateUserParams, ICreateUserRepository } from "./protocols";
import bcrypt from "bcrypt";
import validator from "validator";
import { createToken } from "../../../middlewares/createToken";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: IHttpRequest<ICreateUserParams>
  ): Promise<IHttpResponse<IUser | string>> {
    try {
      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return badRequest("E-mail is invalid.");
      }

      const hashedPassword = await bcrypt.hash(httpRequest.body!.password, 10);

      const newUser: ICreateUserParams = {
        ...httpRequest.body!,
        password: hashedPassword,
      };

      const user = await this.createUserRepository.createUser(newUser);

      // TODO: mover esta criação de token para um arquivo helper
      const token = createToken(user);

      /* TODO: fazer uma requisição via token recebido pelo usuário para ver se
       o user é adm */

      const authenticatedUser: IUserBody = {
        id: user.id,
        role: user.role,
        token: token,
      };

      return created<IUser>(authenticatedUser);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
