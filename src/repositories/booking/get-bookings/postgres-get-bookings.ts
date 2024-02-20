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
        customer: true,
      },
    });

    const bookings: IBookings[] = bookingsFromDatabase.map((bookingFromDB) => ({
      id: bookingFromDB.id,
      customerId: bookingFromDB.customerId,
      date: bookingFromDB.date,
      customer: {
        id: bookingFromDB.customer.id,
        full_name: bookingFromDB.customer.full_name,
        nickname: bookingFromDB.customer.nickname,
        email: bookingFromDB.customer.email,
        phone_number: bookingFromDB.customer.phone_number,
        isMonthlyPayer: bookingFromDB.customer.isMonthlyPayer,
        debt: bookingFromDB.customer.debt,
      },
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
