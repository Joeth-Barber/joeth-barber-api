export interface ICustomer {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  address?: {
    zip_code: string;
    street: string;
    house_number: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}
