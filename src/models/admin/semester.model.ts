import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Semester = mongoose.model("Semester", semesterSchema);
