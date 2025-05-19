import Express from "express";
import {
  createComment,
  deleteComment,
  getTaskComments,
  updateComment,
} from "../controllers/commentsController";
import protect from "../middlewares/protect";

const commentsRouter = Express.Router({ mergeParams: true });

commentsRouter.get("/", getTaskComments);
commentsRouter.post("/", createComment);
commentsRouter.patch("/:commentId", updateComment);
commentsRouter.delete("/:commentId", deleteComment);

export default commentsRouter;
