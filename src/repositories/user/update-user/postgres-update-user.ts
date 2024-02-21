import {
  IUpdateUserParams,
  IUpdateUserRepository,
} from "../../../controllers/user/update-user/protocols";
import { prisma } from "../../../database/postgres";
import { IUser } from "../../../models/user";

export class PostgresUpdateUserRepository implements IUpdateUserRepository {
  async updateUser(id: string, params: IUpdateUserParams): Promise<IUser> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...params,
      },
    });

    return user;
  }
}
