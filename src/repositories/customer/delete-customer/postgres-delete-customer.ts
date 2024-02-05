import { IDeleteCustomerRepository } from "../../../controllers/customer/delete-customer/protocols";
import { prisma } from "../../../database/postgres";
import { ICustomer } from "../../../models/customer";

export class PostgresDeleteCustomerRepository
  implements IDeleteCustomerRepository
{
  async deleteCustomer(id: string): Promise<ICustomer> {
    const customer = await prisma.customer.findUnique({
      where: { id: Number(id) },
    });

    if (!customer) {
      throw new Error("Customer not found.");
    }

    await prisma.customer.delete({
      where: { id: Number(id) },
    });

    return customer;
  }
}
