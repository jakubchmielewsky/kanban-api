import Express from "express";
import {
  createComment,
  deleteComment,
  getTaskComments,
  updateComment,
} from "../controllers/commentsController";
import checkIfResourceBelongsToUsersTeam from "../middlewares/checkIfResourceBelongsToTeam";
import Comment from "../models/CommentModel";
import Task from "../models/TaskModel";

const commentsRouter = Express.Router({ mergeParams: true });

commentsRouter.get(
  "/",
  checkIfResourceBelongsToUsersTeam(Task, "taskId"),
  getTaskComments
);
commentsRouter.post(
  "/",
  checkIfResourceBelongsToUsersTeam(Task, "taskId"),
  createComment
);
//TODO: check if user is the author of the comment
commentsRouter.patch(
  "/:commentId",
  checkIfResourceBelongsToUsersTeam(Comment, "commentId"),
  updateComment
);
commentsRouter.delete(
  "/:commentId",
  checkIfResourceBelongsToUsersTeam(Comment, "commentId"),
  deleteComment
);

export default commentsRouter;
