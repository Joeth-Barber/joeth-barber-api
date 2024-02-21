import {
  ICustomerLoginParams,
  ICustomerLoginRepository,
} from "../../../controllers/customer/customer-login/protocols";
import { prisma } from "../../../database/postgres";
import { ICustomer } from "../../../models/customer";

export class PostgresCustomerLoginRepository
  implements ICustomerLoginRepository
{
  async customerLogin(params: ICustomerLoginParams): Promise<ICustomer> {
    const { email } = params;

    const customer = await prisma.customer.findUnique({
      where: { email },
    });

    if (!customer) {
      throw new Error("Customer not found.");
    }

    return customer;
  }
}
