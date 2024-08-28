import mongoose from "mongoose";

const addNotesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    note: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AddNotes = mongoose.model("AddNotes", addNotesSchema);
