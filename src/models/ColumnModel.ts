import mongoose, { Model, Schema } from "mongoose";
import { ColumnDocument } from "../interfaces/IColumn";

const columnSchema = new Schema<ColumnDocument>(
  {
    name: {
      type: String,
      required: [true, "Column name is required"],
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "Column must belong to a team"],
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: [true, "Column must belong to a board"],
    },
    order: Number,
  },
  {
    timestamps: true,
  }
);

columnSchema.index({ boardId: 1 });
columnSchema.index({ boardId: 1, name: 1 }, { unique: true });

columnSchema.path("createdAt").select(false);
columnSchema.path("updatedAt").select(false);

columnSchema.pre<ColumnDocument>("save", async function (next) {
  if (!this.isNew || (this.order !== undefined && this.order !== null)) {
    return next();
  }

  try {
    const maxOrderColumn = await mongoose
      .model<ColumnDocument>("Column")
      .findOne({ boardId: this.boardId })
      .sort("-order")
      .select("order")
      .lean();

    this.order = maxOrderColumn ? maxOrderColumn.order! + 1024 : 1024;
    next();
  } catch (err) {
    next(err as mongoose.CallbackError);
  }
});

const Column: Model<ColumnDocument> = mongoose.model<ColumnDocument>(
  "Column",
  columnSchema
);
export default Column;
