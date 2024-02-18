import { IGetServiceRepository } from "../../../controllers/service/get-services/protocols";
import { prisma } from "../../../database/postgres";
import { IService } from "../../../models/service";

export class PostgresGetServices implements IGetServiceRepository {
  async getService(): Promise<IService[]> {
    const servicesFromDatabase = await prisma.service.findMany();

    const services: IService[] = servicesFromDatabase.map((serviceFromDb) => ({
      id: serviceFromDb.id,
      name: serviceFromDb.name,
      description: serviceFromDb.description,
      price: serviceFromDb.price,
    }));

    return services;
  }
}
