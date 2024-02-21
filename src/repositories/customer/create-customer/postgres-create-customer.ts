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
        isAdmin: params.isAdmin || false,
        full_name: params.full_name,
        nickname: params.nickname,
        isMonthlyPayer: params.isMonthlyPayer,
        debt: params.debt,
        email: params.email,
        phone_number: params.phone_number,
        password: params.password,
      },
    });

    return createdCustomer;
  }
}
