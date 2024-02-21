import {
  ICreateUserParams,
  ICreateUserRepository,
} from "../../../controllers/user/create-user/protocols";
import { prisma } from "../../../database/postgres";
import { IUser } from "../../../models/user";

export class PostgresCreateUserRepository implements ICreateUserRepository {
  async createUser(params: ICreateUserParams): Promise<IUser> {
    const createdUser = await prisma.user.create({
      data: {
        role: params.role || "user",
        full_name: params.full_name,
        nickname: params.nickname,
        isMonthlyPayer: params.isMonthlyPayer,
        debt: params.debt,
        email: params.email,
        phone_number: params.phone_number,
        password: params.password,
      },
    });

    return createdUser;
  }
}
