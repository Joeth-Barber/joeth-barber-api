import {
  IUpdateServiceParams,
  IUpdateServiceRepository,
} from "../../../controllers/service/update-service/protocols";
import { prisma } from "../../../database/postgres";
import { IService } from "../../../models/service";

export class PostgresUpdateServiceRepository
  implements IUpdateServiceRepository
{
  async updateService(
    id: string,
    params: IUpdateServiceParams
  ): Promise<IService> {
    const service = await prisma.service.update({
      where: {
        id: Number(id),
      },
      data: {
        ...params,
      },
    });

    return service;
  }
}
