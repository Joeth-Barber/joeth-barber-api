import { IGetBookingsRepository } from "../../../controllers/booking/get-bookings/protocols";
import { prisma } from "../../../database/postgres";
import { IBookings } from "../../../models/bookings";

export class PostgresGetBookingsRepository implements IGetBookingsRepository {
  async getBookings(): Promise<IBookings[]> {
    const bookingsFromDatabase = await prisma.booking.findMany({
      include: {
        services: {
          include: {
            service: true,
          },
        },
      },
    });

    const bookings: IBookings[] = bookingsFromDatabase.map((bookingFromDB) => ({
      id: bookingFromDB.id,
      customerId: bookingFromDB.customerId,
      date: bookingFromDB.date,
      services: bookingFromDB.services.map((bookingService) => ({
        id: bookingService.service.id.toString(),
        name: bookingService.service.name,
        description: bookingService.service.description,
        price: bookingService.service.price,
      })),
    }));

    return bookings;
  }
}
