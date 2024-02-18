import { IGetServiceByIdRepository } from "../../../controllers/service/get-service-by-id/protocols";
import { prisma } from "../../../database/postgres";
import { IService } from "../../../models/service";

export class PostgresGetServiceByIdRepository
  implements IGetServiceByIdRepository
{
  async getServiceById(id: string): Promise<IService> {
    const service = await prisma.service.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!service) {
      throw new Error("Service not found.");
    }

    return service;
  }
}
