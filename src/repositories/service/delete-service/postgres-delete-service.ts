import { IDeleteServiceRepository } from "../../../controllers/service/delete-service/protocols";
import { prisma } from "../../../database/postgres";
import { IService } from "../../../models/service";

export class PostgresDeleteServiceRepository
  implements IDeleteServiceRepository
{
  async deleteService(id: string): Promise<IService> {
    const service = await prisma.service.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!service) {
      throw new Error("Service not found.");
    }

    await prisma.service.delete({
      where: { id: Number(id) },
    });

    return service;
  }
}
