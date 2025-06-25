import mongoose from "mongoose";

const checklistItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const checklistSchema = new mongoose.Schema({
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  items: [checklistItemSchema],
});

checklistSchema.index({ cardId: 1 });
checklistSchema.index({ cardId: 1, title: 1 }, { unique: true });

export const Checklist = mongoose.model("Checklist", checklistSchema);
