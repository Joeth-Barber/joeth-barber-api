import { IBookings } from "../../../models/bookings";
import { badRequest, ok, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IGetBookingsRepository } from "../get-bookings/protocols";
import { ICreateBookingRepository, ICreateBookingsParams } from "./protocols";

export class CreateBookingsController implements IController {
  constructor(
    private readonly createBookingsRepository: ICreateBookingRepository,
    private readonly getBookingRepository: IGetBookingsRepository
  ) {}

  async handle(
    httpRequest: IHttpRequest<ICreateBookingsParams>
  ): Promise<IHttpResponse<IBookings | string>> {
    try {
      const isEmptyBookings = httpRequest.body!.services.length === 0;

      if (isEmptyBookings) {
        return badRequest("Services is empty.");
      }

      const newBooking: ICreateBookingsParams = {
        ...httpRequest.body!,
      };

      const bookings = await this.getBookingRepository.getBookings();
      const isDateAvailable = bookings.some(
        (booking) => booking.date === newBooking.date
      );

      if (!isDateAvailable) {
        return badRequest("Booking date is already taken.");
      }

      const booking =
        await this.createBookingsRepository.createBookings(newBooking);

      return ok<IBookings>(booking);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
