import { IDeleteBookingsRepository } from "../../../controllers/booking/delete-booking/protocols";
import { prisma } from "../../../database/postgres";
import { IBookings } from "../../../models/bookings";
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
      },
    });

    console.log(booking);

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
    };
  }
}
