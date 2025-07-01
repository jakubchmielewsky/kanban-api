import mongoose, { Model, Schema } from "mongoose";
import { ListDocument } from "./list.types";

const listSchema = new Schema<ListDocument>(
  {
    name: {
      type: String,
      required: [true, "List name is required"],
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "List must belong to a team"],
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: [true, "List must belong to a board"],
    },
    order: Number,
  },
  {
    timestamps: true,
  }
);

listSchema.index({ boardId: 1 });
listSchema.index({ boardId: 1, name: 1 }, { unique: true });

listSchema.pre<ListDocument>("save", async function (next) {
  if (!this.isNew || (this.order !== undefined && this.order !== null)) {
    return next();
  }

  try {
    const maxOrderList = await mongoose
      .model<ListDocument>("List")
      .findOne({ boardId: this.boardId })
      .sort("-order")
      .select("order")
      .lean();

    this.order = maxOrderList ? maxOrderList.order! + 1024 : 1024;
    next();
  } catch (err) {
    next(err as mongoose.CallbackError);
  }
});

const List: Model<ListDocument> = mongoose.model<ListDocument>(
  "List",
  listSchema
);
export default List;
