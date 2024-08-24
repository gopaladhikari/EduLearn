import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MainCourse",
      required: true,
    },

    thumbnailImage: {
      type: String,
      required: true,
    },

    lessonTitle: {
      type: String,
      required: true,
    },

    lessonDuration: {
      type: String,
      required: true,
    },

    lessonVideo: {
      type: String,
      required: true,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const LessonModal = mongoose.model(
  "LessonModal",
  lessonSchema
);
