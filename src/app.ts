import Express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import ExpressMongoSanitize from "express-mongo-sanitize";
import usersRouter from "./routes/usersRouter";
import globalErrorController from "./controllers/globalErrorController";
import boardsRouter from "./routes/boardsRouter";
import columnsRouter from "./routes/columnsRouter";
import tasksRouter from "./routes/tasksRouter";
import subtasksRouter from "./routes/subtasksRouter";
import AppError from "./utils/AppError";

const app = Express();

app.use(ExpressMongoSanitize());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(helmet());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.use(Express.json({ limit: "10kb" }));
app.use(cookieParser());

//testing middleware
app.use("/", (req, res, next) => {
  //console.log("Data received:", req.cookies);

  next();
});

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/boards", boardsRouter);
app.use("/api/v1/columns", columnsRouter);
app.use("/api/v1/tasks", tasksRouter);
app.use("/api/v1/subtasks", subtasksRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorController);

export default app;
