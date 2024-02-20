import { IBookings } from "../../../models/bookings";

export interface IUpdateBookingParams {
  id?: string;
  customerId?: string;
  date?: Date;
  services?: {
    connect?: { id: number }[];
    create?: { name: string; description: string; price: number }[];
  };
}

export interface IUpdateBookinRepository {
  updateBooking(id: string, params: IUpdateBookingParams): Promise<IBookings>;
}
