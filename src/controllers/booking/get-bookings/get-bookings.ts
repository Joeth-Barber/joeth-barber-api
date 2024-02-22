import { IBookings } from "../../../models/bookings";
import { ok, serverError } from "../../helpers";
import { IController, IHttpResponse } from "../../protocols";
import { IGetBookingsRepository } from "./protocols";

export class GetBookingsController implements IController {
  constructor(private readonly getBookingsRepository: IGetBookingsRepository) {}

  async handle(): Promise<IHttpResponse<IBookings[] | string>> {
    try {
      const bookings = await this.getBookingsRepository.getBookings();

      return ok<IBookings[]>(bookings);
    } catch (error) {
      if (error instanceof Error) {
        return serverError(error.message);
      }
      return serverError();
    }
  }
}
