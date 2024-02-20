import { IBookings } from "../../../models/bookings";
import { badRequest, ok, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IDeleteBookingsRepository } from "./protocols";

export class DeleteBookingsController implements IController {
  constructor(
    private readonly deleteBookingsRepository: IDeleteBookingsRepository
  ) {}

  async handle(
    httpRequest: IHttpRequest<any>
  ): Promise<IHttpResponse<IBookings | string>> {
    try {
      const id = httpRequest.params?.id;

      if (!id) {
        return badRequest("Missing booking id.");
      }

      const booking = await this.deleteBookingsRepository.deleteBookings(id);

      return ok<IBookings>(booking);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
