import { IUser } from "../../../models/user";
import { badRequest, created, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { ICreateUserParams, ICreateUserRepository } from "./protocols";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { config } from "dotenv";

config();
const JWT_SECRET = process.env.JWT_SECRET;

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

      const token = jwt.sign(
        { userId: user.id },
        JWT_SECRET || "JOETHBARBERPROJECT",
        {
          expiresIn: "48h",
        }
      );

      return created<IUser>(token);
    } catch (error) {
      return serverError();
    }
  }
}
