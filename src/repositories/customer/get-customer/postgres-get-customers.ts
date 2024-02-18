import { IGetCustomersRepository } from "../../../controllers/customer/get-customers/protocols";
import { prisma } from "../../../database/postgres";
import { ICustomer } from "../../../models/customer";

export class PostgresGetCustomersRepository implements IGetCustomersRepository {
  async getCustomers(): Promise<ICustomer[]> {
    const customersFromDatabase = await prisma.customer.findMany();

    const customers: ICustomer[] = customersFromDatabase.map(
      (customerFromDB) => ({
        id: customerFromDB.id,
        full_name: customerFromDB.full_name,
        nickname: customerFromDB.nickname,
        isMonthlyPayer: customerFromDB.isMonthlyPayer,
        debt: customerFromDB.debt,
        email: customerFromDB.email,
        phone_number: customerFromDB.phone_number,
        password: customerFromDB.password,
      })
    );

    return customers;
  }
}
