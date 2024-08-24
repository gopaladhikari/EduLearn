import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  subjectName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "currentPursuing",
    required: true,
  },
});

export const Course = mongoose.model("course", courseSchema);
