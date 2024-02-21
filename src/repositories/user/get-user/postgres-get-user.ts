import { IGetUsersRepository } from "../../../controllers/user/get-user/protocols";
import { prisma } from "../../../database/postgres";
import { IUser } from "../../../models/user";

export class PostgresGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<IUser[]> {
    const usersFromDatabase = await prisma.user.findMany();

    const users: IUser[] = usersFromDatabase.map((userFromDB) => ({
      id: userFromDB.id,
      role: userFromDB.role,
      full_name: userFromDB.full_name,
      nickname: userFromDB.nickname,
      isMonthlyPayer: userFromDB.isMonthlyPayer,
      debt: userFromDB.debt,
      email: userFromDB.email,
      phone_number: userFromDB.phone_number,
      password: userFromDB.password,
    }));

    return users;
  }
}
