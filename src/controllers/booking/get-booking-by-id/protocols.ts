import { IBookings } from "../../../models/bookings";

export interface IGetBookingByIdRepository {
  getBookingById(id: string): Promise<IBookings>;
}
