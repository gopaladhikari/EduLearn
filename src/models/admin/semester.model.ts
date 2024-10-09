import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    currentPursuingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CurrentPursuing",
      required: true,
      index: true,
    },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Semester = mongoose.model("Semester", semesterSchema);
