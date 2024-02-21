import {
  IUserLoginParams,
  IUserLoginRepository,
} from "../../../controllers/user/user-login/protocols";
import { prisma } from "../../../database/postgres";
import { IUser } from "../../../models/user";

export class PostgresUserLoginRepository implements IUserLoginRepository {
  async userLogin(params: IUserLoginParams): Promise<IUser> {
    const { email } = params;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }
}
