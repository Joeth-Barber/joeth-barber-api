import express from "express";
import { CreateBookingsController } from "../controllers/booking/create-booking/create-booking";
import { DeleteBookingsController } from "../controllers/booking/delete-booking/delete-bookings";
import { GetBookingByIdController } from "../controllers/booking/get-booking-by-id/get-booking-by-id";
import { GetBookingsController } from "../controllers/booking/get-bookings/get-bookings";
import { UpdateBookingController } from "../controllers/booking/update-booking/update-booking";
import { PostgresCreateBookingsRepository } from "../repositories/booking/create-booking/postgres-create-booking";
import { PostgresDeleteBookingsRepository } from "../repositories/booking/delete-bookings/postgres-delete-bookings";
import { PostgresGetBookingByIdRepository } from "../repositories/booking/get-booking-by-id/postgres-get-booking-by-id";
import { PostgresGetBookingsRepository } from "../repositories/booking/get-bookings/postgres-get-bookings";
import { PostgresUpdateBookingRepository } from "../repositories/booking/update-booking/postgres-update-booking";

const bookingRouter = express.Router();
bookingRouter.use(express.json());

bookingRouter.post("/", async (req, res) => {
  const postgresCreateBookingsRepository =
    new PostgresCreateBookingsRepository();
  const postgresGetBookingsRepository = new PostgresGetBookingsRepository();
  const createBookingsRepository = new CreateBookingsController(
    postgresCreateBookingsRepository,
    postgresGetBookingsRepository
  );

  const { body, statusCode } = await createBookingsRepository.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

bookingRouter.delete("/:id", async (req, res) => {
  const postgresDeleteBookingsRepository =
    new PostgresDeleteBookingsRepository();

  const deleteBookingsController = new DeleteBookingsController(
    postgresDeleteBookingsRepository
  );

  const { body, statusCode } = await deleteBookingsController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

bookingRouter.get("/", async (req, res) => {
  const postgresGetBookingsRepository = new PostgresGetBookingsRepository();
  const getBookingsController = new GetBookingsController(
    postgresGetBookingsRepository
  );

  const { body, statusCode } = await getBookingsController.handle();

  res.status(statusCode).send(body);
});

bookingRouter.get("/:id", async (req, res) => {
  const postgresGetBookingByIdRepository =
    new PostgresGetBookingByIdRepository();

  const getBookingByIdController = new GetBookingByIdController(
    postgresGetBookingByIdRepository
  );

  const { body, statusCode } = await getBookingByIdController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

bookingRouter.patch("/:id", async (req, res) => {
  const postgresUpdateBookingRepository = new PostgresUpdateBookingRepository();
  const postgresGetBookingsRepository = new PostgresGetBookingsRepository();

  const updateBookingController = new UpdateBookingController(
    postgresUpdateBookingRepository,
    postgresGetBookingsRepository
  );

  const { body, statusCode } = await updateBookingController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

export default bookingRouter;
