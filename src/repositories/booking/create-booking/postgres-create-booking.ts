import { Decimal } from "@prisma/client/runtime/library";
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
      // TODO: Tratar o erro de quando o usuário passa um atributo invalido no body

      const user = await prisma.user.findUnique({
        where: { id: params.userId },
      });

      if (!user) {
        throw new Error("User not found.");
      }

      const services = await prisma.service.findMany({
        where: {
          id: {
            in: params.services.map((serviceId) => parseInt(serviceId)),
          },
        },
      });

      if (services && services.length > 0) {
        const total = services.reduce(
          (acc, service) => acc.plus(new Decimal(service.price.toString())),
          new Decimal(0)
        );

        const createBooking = await prisma.booking.create({
          data: {
            userId: params.userId,
            date: params.date,
            total,
            services: {
              create: params.services.map((serviceId) => ({
                assignedBy: params.userId,
                service: { connect: { id: parseInt(serviceId) } },
              })),
            },
          },
        });

        if (!createBooking.id) {
          throw new Error("Missing booking id.");
        }

        const booking: IBookings = {
          id: createBooking.id,
          userId: createBooking.userId,
          date: createBooking.date,
          total,
          user,
          services: services.map((service) => ({
            id: service.id,
            name: service.name,
            description: service.description,
            price: service.price,
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
