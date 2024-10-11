import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    videoUrl: { type: String },
    notesUrl: { type: String },
    duration: { type: Number },
    quiz: [{ question: String, options: [String], answer: String }],
  },
  { timestamps: true }
);

export const Lesson = mongoose.model("Lesson", lessonSchema);
