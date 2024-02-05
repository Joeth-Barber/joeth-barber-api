import {
  IUpdateCustomerParams,
  IUpdateCustomerRepository,
} from "../../../controllers/customer/update-customer/protocols";
import { prisma } from "../../../database/postgres";
import { ICustomer } from "../../../models/customer";

export class PostgresUpdateCustomerRepository
  implements IUpdateCustomerRepository
{
  async updateCustomer(
    id: string,
    params: IUpdateCustomerParams
  ): Promise<ICustomer> {
    const customer = await prisma.customer.update({
      where: {
        id: Number(id),
      },
      data: {
        ...params,
      },
    });

    return customer;
  }
}
