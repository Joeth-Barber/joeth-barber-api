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
        user: true,
      },
    });

    const bookings: IBookings[] = bookingsFromDatabase.map((bookingFromDB) => ({
      id: bookingFromDB.id,
      userId: bookingFromDB.userId,
      date: bookingFromDB.date,
      user: {
        id: bookingFromDB.user.id,
        role: bookingFromDB.user.role,
        full_name: bookingFromDB.user.full_name,
        nickname: bookingFromDB.user.nickname,
        email: bookingFromDB.user.email,
        phone_number: bookingFromDB.user.phone_number,
        password: bookingFromDB.user.password,
        isMonthlyPayer: bookingFromDB.user.isMonthlyPayer,
        debt: bookingFromDB.user.debt,
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
