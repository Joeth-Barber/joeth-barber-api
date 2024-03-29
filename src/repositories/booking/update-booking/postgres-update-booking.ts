import {
  IUpdateBookinRepository,
  IUpdateBookingParams,
} from "../../../controllers/booking/update-booking/protocols";
import { prisma } from "../../../database/postgres";
import { IBookings } from "../../../models/bookings";

export class PostgresUpdateBookingRepository
  implements IUpdateBookinRepository
{
  async updateBooking(
    id: string,
    params: IUpdateBookingParams
  ): Promise<IBookings> {
    const bookingById = await prisma.booking.findUnique({
      where: { id },
    });

    const data = {
      date: bookingById?.date,
    };

    if (params.date) {
      data.date = params.date;
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data,
    });

    const mappedBooking: IBookings = {
      id: updatedBooking.id,
      userId: updatedBooking.userId,
      date: updatedBooking.date,
      total: updatedBooking.total,
    };

    return mappedBooking;
  }
}
