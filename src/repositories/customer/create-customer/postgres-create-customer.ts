import {
  ICreateCustomerParams,
  ICreateCustomerRepository,
} from "../../../controllers/customer/create-customer/protocols";
import { prisma } from "../../../database/postgres";
import { ICustomer } from "../../../models/customer";

export class PostgresCreateCustomer implements ICreateCustomerRepository {
  async createCustomer(params: ICreateCustomerParams): Promise<ICustomer> {
    const createdCustomer = await prisma.customer.create({
      data: {
        full_name: params.full_name,
        email: params.email,
        phone_number: params.phone_number,
        password: params.password,
        address: {
          create: {
            zip_code: params.address.zip_code,
            street: params.address.street,
            house_number: params.address.house_number,
            neighborhood: params.address.neighborhood,
            city: params.address.city,
            state: params.address.state,
          },
        },
      },
      include: {
        address: true,
      },
    });

    return createdCustomer;
  }
}
