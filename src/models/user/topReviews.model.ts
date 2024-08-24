import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PopularCourse",
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    userImage: {
      type: String,
      required: true,
    },

    review: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TopReviews = mongoose.model("TopReviews", reviewSchema);
