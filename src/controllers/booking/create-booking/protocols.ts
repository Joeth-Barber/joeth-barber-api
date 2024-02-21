import { IBookings } from "../../../models/bookings";

export interface ICreateBookingsParams {
  userId: string;
  date: Date;
  services: string[];
}

export interface ICreateBookingRepository {
  createBookings(params: ICreateBookingsParams): Promise<IBookings | undefined>;
}
