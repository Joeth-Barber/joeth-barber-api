import { IBookings } from "../../../models/bookings";

export interface IDeleteBookingsRepository {
  deleteBookings(id: string): Promise<IBookings>;
}
