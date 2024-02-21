import { IGetUserByIdRepository } from "../../../controllers/user/get-user-by-id/protocols";
import { prisma } from "../../../database/postgres";
import { IUser } from "../../../models/user";

export class PostgresGetUserByIdRepository implements IGetUserByIdRepository {
  async getUserById(id: string): Promise<IUser> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }
}
