import { IGetCustomersRepository } from "../../controllers/customer/get-customers/protocols";
import { ICustomer } from "../../models/customer";

export class PostgresGetCustomersRepository implements IGetCustomersRepository {
  async getCustomers(): Promise<ICustomer[]> {
    return [
      {
        full_name: "João",
        email: "joao.silva@email.com",
        phone_number: 11933986562,
        password: "senha_segura",
        address: {
          zip_code: 6145096,
          street: "Rua da Miná",
          house_number: 85,
          neighborhood: "Jardim Conceição",
          city: "Osaco",
          state: "SP",
        },
      },
    ];
  }
}
