export interface ICustomer {
  full_name: string;
  email: string;
  phone_number: number;
  password: string;
  address: {
    zip_code: number;
    street: string;
    house_number: number;
    neighborhood: string;
    city: string;
    state: string;
  };
}
