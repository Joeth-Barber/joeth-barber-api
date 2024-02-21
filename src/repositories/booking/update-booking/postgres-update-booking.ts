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
    const data = {} as any;

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
    };

    return mappedBooking;
  }
}
