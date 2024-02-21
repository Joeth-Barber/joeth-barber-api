import { IUser } from "../../../models/user";
import { ok, serverError } from "../../helpers";
import { IController, IHttpResponse } from "../../protocols";
import { IGetUsersRepository } from "./protocols";

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle(): Promise<IHttpResponse<IUser[] | string>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return ok<IUser[]>(users);
    } catch (error) {
      return serverError();
    }
  }
}
