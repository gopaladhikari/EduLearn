import mongoose from "mongoose";

const mainCourseSchema = new mongoose.Schema(
  {
    courseType: {
      type: String,
      required: true,
    },

    courseImage: {
      type: String,
      required: true,
    },

    coursePursuing: {
      type: String,
      required: true,
    },

    semester: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    universityName: {
      type: String,
      required: true,
    },

    totalClasses: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    courseDetails: {
      about: {
        type: String,
        required: true,
      },

      curriculcum: {
        type: String,
        required: true,
      },
    },

    instructor: {
      instructorName: {
        type: String,
        required: true,
      },

      instructorImage: {
        type: String,
      },

      instructorDesignation: {
        type: String,
        required: true,
      },
    },

    lessonsVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
  },
  { timestamps: true }
);

export const MainCourse = mongoose.model(
  "MainCourse",
  mainCourseSchema
);
