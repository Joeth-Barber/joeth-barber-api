import { IDeleteBookingsRepository } from "../../../controllers/booking/delete-booking/protocols";
import { prisma } from "../../../database/postgres";
import { IBookings } from "../../../models/bookings";
import { ICustomer } from "../../../models/customer";
import { IService } from "../../../models/service";

export class PostgresDeleteBookingsRepository
  implements IDeleteBookingsRepository
{
  async deleteBookings(id: string): Promise<IBookings> {
    const booking = await prisma.booking.findUnique({
      where: {
        id: id,
      },
      include: {
        services: {
          include: {
            service: true,
          },
        },
        customer: true,
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

    const mappedCustomer: ICustomer = {
      id: booking.customer.id.toString(),
      full_name: booking.customer.full_name,
      nickname: booking.customer.nickname,
      email: booking.customer.email,
      phone_number: booking.customer.phone_number,
      password: booking.customer.password,
      isMonthlyPayer: booking.customer.isMonthlyPayer,
      debt: booking.customer.debt,
    };

    await prisma.bookingService.deleteMany({
      where: {
        bookingId: id,
      },
    });

    await prisma.booking.delete({
      where: {
        id: id,
      },
    });

    return {
      id: booking.id,
      customerId: booking.customerId,
      date: booking.date,
      services: mappedServices,
      customer: mappedCustomer,
    };
  }
}
