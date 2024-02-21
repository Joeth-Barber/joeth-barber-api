import express from "express";
import { config } from "dotenv";

import bookingRouter from "./routes/bookingRoutes";
import serviceRouter from "./routes/serviceRoutes";
import userRouter from "./routes/userRoutes";

config();

const app = express();
const port = process.env.PORT || 3333;

app.use("/users", userRouter);
app.use("/bookings", bookingRouter);
app.use("/services", serviceRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
