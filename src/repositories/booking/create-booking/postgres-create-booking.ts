import {
  ICreateBookingsParams,
  ICreateBookingRepository,
} from "../../../controllers/booking/create-booking/protocols";
import { prisma } from "../../../database/postgres";
import { IBookings } from "../../../models/bookings";

export class PostgresCreateBookingsRepository
  implements ICreateBookingRepository
{
  async createBookings(
    params: ICreateBookingsParams
  ): Promise<IBookings | undefined> {
    try {
      const createBooking = await prisma.booking.create({
        data: {
          customerId: params.customerId,
          date: params.date,
          services: {
            create: params.services.map((serviceId) => ({
              assignedBy: params.customerId,
              service: {
                connect: { id: parseInt(serviceId) },
              },
            })),
          },
        },
      });

      if (!createBooking.id) {
        throw new Error("Erro ao criar reserva. ID da reserva não definido.");
      }

      const bookingServices = await prisma.bookingService.findMany({
        where: { bookingId: createBooking.id },
        include: { service: true },
      });

      if (bookingServices && bookingServices.length > 0) {
        const booking: IBookings = {
          id: createBooking.id,
          customerId: createBooking.customerId,
          date: createBooking.date,
          services: bookingServices.map((bookingService) => ({
            id: bookingService.service.id,
            name: bookingService.service.name,
            description: bookingService.service.description,
            price: bookingService.service.price,
          })),
        };

        return booking;
      } else {
        throw new Error("Nenhum serviço encontrado para esta reserva.");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
