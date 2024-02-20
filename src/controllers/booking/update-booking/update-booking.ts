import { IBookings } from "../../../models/bookings";
import { badRequest, ok, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IGetBookingsRepository } from "../get-bookings/protocols";
import { IUpdateBookinRepository, IUpdateBookingParams } from "./protocols";

export class UpdateBookingController implements IController {
  constructor(
    private readonly updateBookingRepository: IUpdateBookinRepository,
    private readonly getBookingRepository: IGetBookingsRepository
  ) {}

  async handle(
    httpRequest: IHttpRequest<IUpdateBookingParams>
  ): Promise<IHttpResponse<IBookings | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return badRequest("Missing customer id.");
      }

      if (!body) {
        return badRequest("Missing fields.");
      }

      const allowedFieldsToUpdate: (keyof IUpdateBookingParams)[] = ["date"];

      const someFieldIsNotAllowedToUpdate = Object.keys(body!).some(
        (key) =>
          !allowedFieldsToUpdate.includes(key as keyof IUpdateBookingParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received fiel is not allowed.");
      }

      if (!body.date) {
        return badRequest("Missing fields.");
      }

      const newBookingDate = new Date(body.date);
      const bookings = await this.getBookingRepository.getBookings();
      const existingBookingDates = bookings.map(
        (booking) => new Date(booking.date)
      );

      if (
        existingBookingDates.some(
          (date) => date.getTime() === newBookingDate.getTime()
        )
      ) {
        return badRequest("Booking date is already taken.");
      }

      const booking = await this.updateBookingRepository.updateBooking(
        id,
        body
      );

      return ok<IBookings>(booking);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
