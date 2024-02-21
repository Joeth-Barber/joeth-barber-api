import {
  IUserLoginParams,
  IUserLoginRepository,
} from "../../../controllers/user/user-login/protocols";
import { prisma } from "../../../database/postgres";
import { IUser } from "../../../models/user";
import { config } from "dotenv";

config();
const ADMIN_ROLE = process.env.ADMIN_ROLE || "";

export class PostgresUserLoginRepository implements IUserLoginRepository {
  async userLogin(params: IUserLoginParams): Promise<IUser> {
    const { email } = params;

    const userCustomer = await prisma.user.findUnique({
      where: { email },
    });
    if (!userCustomer) {
      const userAdmin = await prisma.user.findUnique({
        where: { email: email, role: ADMIN_ROLE },
      });

      if (!userAdmin) {
        throw new Error("Invalid login credencials.");
      }

      return userAdmin;
    }

    return userCustomer;
  }
}
