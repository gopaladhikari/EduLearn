import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema(
  {
    semester: {
      type: String,
      required: true,
    },
    subjects: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const currentPursuingSchema = new mongoose.Schema(
  {
    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },
    currentPursuingCourse: {
      type: String,
      required: true,
    },

    semesters: [semesterSchema],
  },
  { timestamps: true }
);

export const CurrentPursuing = mongoose.model(
  "CurrentPursuing",
  currentPursuingSchema
);
