import mongoose from "mongoose";

const currentPursuingName = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const subjectName = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const semesterName = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
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

    currentPursuingName: [currentPursuingName],

    semesters: [semesterName],

    subjects: [subjectName],
  },
  { timestamps: true }
);

export const CurrentPursuing = mongoose.model(
  "CurrentPursuing",
  currentPursuingSchema
);
