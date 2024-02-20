import { IBookings } from "../../../models/bookings";
import { badRequest, ok, serverError } from "../../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IGetBookingByIdRepository } from "./protocols";

export class GetBookingByIdController implements IController {
  constructor(
    private readonly getBookingByIdRepository: IGetBookingByIdRepository
  ) {}

  async handle(
    httpRequest: IHttpRequest<any>
  ): Promise<IHttpResponse<IBookings | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing booking id.");
      }

      const booking = await this.getBookingByIdRepository.getBookingById(id);

      return ok<IBookings>(booking);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
