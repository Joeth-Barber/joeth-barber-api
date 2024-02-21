import { IUser } from "../../../models/user";
import { badRequest, ok, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IGetUserByIdRepository } from "./protocols";

export class GetUserByIdController implements IController {
  constructor(private readonly getUserByIdRepository: IGetUserByIdRepository) {}
  async handle(
    httpRequest: IHttpRequest<any>
  ): Promise<IHttpResponse<IUser | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("User not found.");
      }

      const user = await this.getUserByIdRepository.getUserById(id);

      return ok<IUser>(user);
    } catch (error) {
      return serverError();
    }
  }
}
