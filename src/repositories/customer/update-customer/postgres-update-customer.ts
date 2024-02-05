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
    id: number,
    params: IUpdateCustomerParams
  ): Promise<ICustomer> {
    const customer = await prisma.customer.update({
      where: {
        id,
      },
      data: {
        ...params,
        address: {
          update: params.address,
        },
      },
    });

    return customer;
  }
}
