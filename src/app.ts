import Express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import ExpressMongoSanitize from "express-mongo-sanitize";
import usersRouter from "./features/users/user.router";
import globalErrorController from "./middlewares/globalErrorHandler";
import AppError from "./utils/AppError";
import teamsRouter from "./features/teams/team.router";
import invitationsRouter from "./features/invitations/invitation.router";
import authRouter from "./features/auth/auth.router";

const app = Express();

app.set("trust proxy", 1);

app.use(ExpressMongoSanitize());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.use(Express.json({ limit: "10kb" }));
app.use(cookieParser());

//testing middleware
app.use("/", (req, res, next) => {
  console.log("Data received:", req.body);
  //console.log("Cookies received:", req.cookies);

  next();
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/teams", teamsRouter);
app.use("/api/v1/invitations", invitationsRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorController);

export default app;
