import { IGetCustomerByIdRepository } from "../../../controllers/customer/get-customer-by-id/protocols";
import { prisma } from "../../../database/postgres";
import { ICustomer } from "../../../models/customer";

export class PostgresGetCustomerByIdRepository
  implements IGetCustomerByIdRepository
{
  async getCustomerById(id: string): Promise<ICustomer> {
    const customer = await prisma.customer.findUnique({
      where: { id: Number(id) },
    });

    if (!customer) {
      throw new Error("Customer not found.");
    }

    return customer;
  }
}
