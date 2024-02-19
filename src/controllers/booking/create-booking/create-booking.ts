import { IBookings } from "../../../models/bookings";
import { badRequest, ok, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { ICreateBookingRepository, ICreateBookingsParams } from "./protocols";

export class CreateBookingsController implements IController {
  constructor(
    private readonly createBookingsRepository: ICreateBookingRepository
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

      const booking =
        await this.createBookingsRepository.createBookings(newBooking);

      return ok<IBookings>(booking);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
