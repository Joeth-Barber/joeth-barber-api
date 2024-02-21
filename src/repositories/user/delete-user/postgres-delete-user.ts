import { IDeleteUserRepository } from "../../../controllers/user/delete-user/protocols";
import { prisma } from "../../../database/postgres";
import { IUser } from "../../../models/user";

export class PostgresDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<IUser> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    await prisma.user.delete({
      where: { id },
    });

    return user;
  }
}
