import { IUser } from "../../../models/user";
import { badRequest, ok, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IGetUserByIdRepository } from "../get-user-by-id/protocols";
import { IUpdateUserParams, IUpdateUserRepository } from "./protocols";
import { hash } from "bcrypt";
import { config } from "dotenv";

config();
const ADMIN_ROLE = process.env.ADMIN_ROLE || "";

export class UpdateUserController implements IController {
  constructor(
    private readonly updateUserRepository: IUpdateUserRepository,
    private readonly getUserByIdRepository: IGetUserByIdRepository
  ) {}

  async handle(
    httpRequest: IHttpRequest<IUpdateUserParams>
  ): Promise<IHttpResponse<IUser | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields.");
      }

      if (!id) {
        return badRequest("Missing user id.");
      }

      const userById = await this.getUserByIdRepository.getUserById(id);

      let allowedFieldsToUpdate: (keyof IUpdateUserParams)[];

      if (userById.role === ADMIN_ROLE) {
        allowedFieldsToUpdate = [
          "full_name",
          "nickname",
          "email",
          "isMonthlyPayer",
          "debt",
          "phone_number",
          "password",
        ];
      } else {
        allowedFieldsToUpdate = [
          "full_name",
          "nickname",
          "phone_number",
          "password",
        ];
      }

      const someFieldIsNotAllowedToUpdate = Object.keys(body!).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof IUpdateUserParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received fiel is not allowed.");
      }

      if (body.password) {
        const hashedPassword = await hash(body.password, 10);
        body.password = hashedPassword;
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return ok<IUser>(user);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
