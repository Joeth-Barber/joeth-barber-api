export interface ICustomer {
  full_name: string;
  email: string;
  phoneNumber: number;
  password: string;
  address: {
    zipCode: number;
    street: string;
    house_number: number;
    neighborhood: string;
    city: string;
    state: string;
  };
}
