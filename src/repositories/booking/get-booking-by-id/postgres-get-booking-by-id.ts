import { IGetBookingByIdRepository } from "../../../controllers/booking/get-booking-by-id/protocols";
import { prisma } from "../../../database/postgres";
import { IBookings } from "../../../models/bookings";
import { IUser } from "../../../models/user";
import { IService } from "../../../models/service";

export class PostgresGetBookingByIdRepository
  implements IGetBookingByIdRepository
{
  async getBookingById(id: string): Promise<IBookings> {
    const booking = await prisma.booking.findUnique({
      where: {
        id,
      },
      include: {
        services: {
          include: { service: true },
        },
        user: true,
      },
    });

    if (!booking) {
      throw new Error("Booking not found.");
    }

    const mappedServices: IService[] = booking.services.map(
      (bookingService) => ({
        id: bookingService.service.id.toString(),
        name: bookingService.service.name,
        description: bookingService.service.description,
        price: bookingService.service.price,
      })
    );

    const mappedUser: IUser = {
      id: booking.user.id.toString(),
      role: booking.user.role,
      full_name: booking.user.full_name,
      nickname: booking.user.nickname,
      email: booking.user.email,
      phone_number: booking.user.phone_number,
      password: booking.user.password,
      isMonthlyPayer: booking.user.isMonthlyPayer,
      debt: booking.user.debt,
    };

    return {
      id: booking.id,
      total: booking.total,
      userId: booking.userId,
      date: booking.date,
      services: mappedServices,
      user: mappedUser,
    };
  }
}
