import { IGetCustomersRepository } from "../../controllers/customer/get-customers/protocols";
import { ICustomer } from "../../models/customer";

export class PostgresGetCustomersRepository implements IGetCustomersRepository {
  async getCustomers(): Promise<ICustomer[]> {
    return [
      {
        full_name: "João",
        email: "joao.silva@email.com",
        phoneNumber: 11933986562,
        password: "senha_segura",
        address: {
          zipCode: 6145096,
          street: "Rua da Miná",
          houseNumber: 85,
          neighborhood: "Jardim Conceição",
          city: "Osaco",
          state: "SP",
        },
      },
    ];
  }
}
