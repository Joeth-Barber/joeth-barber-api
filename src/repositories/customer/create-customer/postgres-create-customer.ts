import {
  ICreateCustomerParams,
  ICreateCustomerRepository,
} from "../../../controllers/customer/create-customer/protocols";
import { prisma } from "../../../database/postgres";
import { ICustomer } from "../../../models/customer";

export class PostgresCreateCustomerRepository
  implements ICreateCustomerRepository
{
  async createCustomer(params: ICreateCustomerParams): Promise<ICustomer> {
    const createdCustomer = await prisma.customer.create({
      data: {
        full_name: params.full_name,
        email: params.email,
        phone_number: params.phone_number,
        password: params.password,
      },
    });

    return createdCustomer;
  }
}
