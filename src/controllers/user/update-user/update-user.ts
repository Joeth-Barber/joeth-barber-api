import { IUser } from "../../../models/user";
import { badRequest, ok, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IUpdateUserParams, IUpdateUserRepository } from "./protocols";
import { hash } from "bcrypt";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

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

      const allowedFieldsToUpdate: (keyof IUpdateUserParams)[] = [
        "full_name",
        "nickname",
        "isMonthlyPayer",
        "debt",
        "phone_number",
        "password",
      ];

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
