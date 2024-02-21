import { IUser } from "../../../models/user";
import { badRequest, ok, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}

  async handle(
    httpRequest: IHttpRequest<any>
  ): Promise<IHttpResponse<IUser | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing user Id.");
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return ok<IUser>(user);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
