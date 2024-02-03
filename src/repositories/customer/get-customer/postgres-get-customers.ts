import { IGetCustomersRepository } from "../../../controllers/customer/get-customers/protocols";
import { prisma } from "../../../database/postgres";
import { ICustomer } from "../../../models/customer";

export class PostgresGetCustomersRepository implements IGetCustomersRepository {
  async getCustomers(): Promise<ICustomer[]> {
    const customersFromDatabase = await prisma.customer.findMany({
      include: {
        address: true,
      },
    });

    const customers: ICustomer[] = customersFromDatabase.map(
      (customerFromDB) => ({
        id: customerFromDB.id,
        full_name: customerFromDB.full_name,
        email: customerFromDB.email,
        phone_number: customerFromDB.phone_number,
        password: customerFromDB.password,
        address: {
          zip_code: customerFromDB.address.zip_code,
          street: customerFromDB.address.street,
          house_number: customerFromDB.address.house_number,
          neighborhood: customerFromDB.address.neighborhood,
          city: customerFromDB.address.city,
          state: customerFromDB.address.state,
        },
      })
    );

    return customers;
  }
}
