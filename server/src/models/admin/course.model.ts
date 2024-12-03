import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    instructor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor",
      },
    ],

    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],

    category: { type: String, requird: true },

    tags: [
      {
        type: String,
        required: true,
      },
    ],

    price: { type: Number, default: 0 },

    // ratings: [
    //   {
    //     userId: mongoose.Schema.Types.ObjectId,
    //     ref: "Customer",
    //     rating: Number,
    //   },
    // ],

    isPopular: {
      type: Boolean,
      default: false,
    },

    isBestSeller: {
      type: Boolean,
      default: false,
    },

    media: {
      videoUrl: String,
      noteUrl: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Courses = mongoose.model("Course", courseSchema);
