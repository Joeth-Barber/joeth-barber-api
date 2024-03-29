import { prisma } from "../../../database/postgres";
import { IBookings } from "../../../models/bookings";
import { badRequest, ok, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IGetBookingsRepository } from "../get-bookings/protocols";
import { ICreateBookingRepository, ICreateBookingsParams } from "./protocols";

//Retornar um body vazio.
export class CreateBookingsController implements IController {
  constructor(
    private readonly createBookingsRepository: ICreateBookingRepository,
    private readonly getBookingRepository: IGetBookingsRepository
  ) {}

  async handle(
    httpRequest: IHttpRequest<ICreateBookingsParams>
  ): Promise<IHttpResponse<IBookings | string>> {
    try {
      const isServicesBookings = httpRequest.body!.services.length > 0;

      if (!isServicesBookings) {
        return badRequest("Services is empty.");
      }

      const newBooking: ICreateBookingsParams = {
        ...httpRequest.body!,
      };

      const bookings = await this.getBookingRepository.getBookings();

      const newBookingDate = new Date(newBooking.date);
      const existingBookingDates = bookings.map(
        (booking) => new Date(booking.date)
      );

      const truncatedNewBookingDate = new Date(newBookingDate);
      truncatedNewBookingDate.setSeconds(0);

      const truncatedExistingBookingDates = existingBookingDates.map((date) => {
        const truncatedDate = new Date(date);
        truncatedDate.setSeconds(0);
        return truncatedDate;
      });

      const isDateAlreadyTaken = truncatedExistingBookingDates.some(
        (date) => truncatedNewBookingDate.getTime() === date.getTime()
      );

      if (isDateAlreadyTaken) {
        return badRequest("Booking date is already taken.");
      }

      const booking =
        await this.createBookingsRepository.createBookings(newBooking);

      if (booking) {
        const currentUser = await prisma.user.findUnique({
          where: { id: booking.userId },
        });

        if (currentUser) {
          const updatedUser = await prisma.user.update({
            where: { id: booking.userId },
            data: {
              debt: currentUser.debt.plus(booking.total || 0),
            },
          });

          const bookingWithUpdatedUser = {
            ...(booking.user = updatedUser),
          };
          return ok<IBookings>(bookingWithUpdatedUser);
        }
      }

      return ok<IBookings>(booking);
    } catch (error) {
      if (error instanceof Error) {
        return serverError(error.message);
      }
      return serverError();
    }
  }
}
