import { IBookings } from "../../../models/bookings";

export interface ICreateBookingsParams {
  customerId: string;
  date: Date;
  services: string[];
}

export interface ICreateBookingRepository {
  createBookings(params: ICreateBookingsParams): Promise<IBookings | undefined>;
}
