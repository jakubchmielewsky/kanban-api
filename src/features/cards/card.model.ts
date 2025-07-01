import mongoose, { Schema } from "mongoose";
import { CardDocument } from "./card.types";

const cardSchema = new Schema<CardDocument>(
  {
    title: {
      type: String,
      required: [true, "Card title is required"],
    },
    description: {
      type: String,
    },
    listId: {
      type: Schema.Types.ObjectId,
      ref: "List",
      required: [true, "Card must belong to a list"],
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "Card must belong to a team"],
    },
    order: Number,
    labels: {
      type: [Schema.Types.ObjectId],
      ref: "Label",
    },
  },
  {
    timestamps: true,
  }
);

//TODO: in the future add assigned members and deadline date

cardSchema.index({ listId: 1 });

cardSchema.pre("save", async function (next) {
  if (!this.isNew || (this.order !== undefined && this.order !== null)) {
    return next();
  }

  try {
    const maxOrderCard = await mongoose
      .model<CardDocument>("Card")
      .findOne({ listId: this.listId })
      .sort("-order")
      .select("order")
      .lean();

    this.order = maxOrderCard ? maxOrderCard.order! + 1024 : 1024;
    next();
  } catch (err) {
    next(err as mongoose.CallbackError);
  }
});

const Card = mongoose.model("Card", cardSchema);

export default Card;
