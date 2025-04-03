import Express from "express";
import protect from "../middlewares/protect";
import {
  createBoard,
  deleteBoard,
  getAllBoards,
  getBoard,
  updateBoard,
} from "../controllers/boardsController";

const boardsRouter = Express.Router();

boardsRouter.use(protect);

boardsRouter.get("/", getAllBoards);
boardsRouter.get("/:id", getBoard);
boardsRouter.post("/", createBoard);
boardsRouter.patch("/:id", updateBoard);
boardsRouter.delete("/:id", deleteBoard);

export default boardsRouter;
