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
              assignedBy: params.customerId, // Supondo que Bob está fazendo a reserva
              service: {
                connect: { id: parseInt(serviceId) }, // Supondo que os IDs de serviço são strings que precisam ser convertidos em números inteiros
              },
            })),
          },
        },
      });

      // Verificar se createBooking.id está definido
      if (!createBooking.id) {
        throw new Error("Erro ao criar reserva. ID da reserva não definido.");
      }

      // Consultar os serviços associados à reserva
      const bookingServices = await prisma.bookingService.findMany({
        where: { bookingId: createBooking.id },
        include: { service: true },
      });

      // Verificar se bookingServices está definido e não é vazio
      if (bookingServices && bookingServices.length > 0) {
        // Construir o objeto de reserva com os dados corretos
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
        // Se não houver serviços associados à reserva, lançar um erro ou retornar uma mensagem adequada
        throw new Error("Nenhum serviço encontrado para esta reserva.");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
