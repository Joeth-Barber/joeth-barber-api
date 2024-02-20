import { IBookings } from "../../../models/bookings";

export interface IGetBookingsRepository {
  getBookings(): Promise<IBookings[]>;
}
