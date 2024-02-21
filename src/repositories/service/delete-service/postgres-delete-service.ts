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

    const bookingsWithService = await prisma.bookingService.findMany({
      where: {
        serviceId: Number(id),
      },
    });

    if (bookingsWithService.length > 0) {
      throw new Error(
        "Cannot delete service because it is associated with a booking."
      );
    }

    await prisma.service.delete({
      where: { id: Number(id) },
    });

    return service;
  }
}
