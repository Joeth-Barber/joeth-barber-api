import {
  ICreateServiceParams,
  ICreateServiceRepository,
} from "../../../controllers/service/create-service/protocols";
import { prisma } from "../../../database/postgres";
import { IService } from "../../../models/service";

export class PostgresCreateServiceRepository
  implements ICreateServiceRepository
{
  async createService(params: ICreateServiceParams): Promise<IService> {
    const createService = prisma.service.create({
      data: {
        name: params.name,
        description: params.description,
        price: params.price,
      },
    });

    return createService;
  }
}
