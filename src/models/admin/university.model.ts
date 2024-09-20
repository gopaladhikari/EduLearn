import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: { type: String },
  },
  { timestamps: true }
);

const semesterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
  },
  { timestamps: true }
);

const currentPursuingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    semesters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Semester",
      },
    ],
  },
  { timestamps: true }
);

const universitySchema = new mongoose.Schema(
  {
    universityName: {
      type: String,
      required: true,
    },

    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    universityLogo: {
      type: String,
    },

    currentPursuing: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CurrentPursuing",
      },
    ],
  },
  { timestamps: true }
);

export const University = mongoose.model("University", universitySchema);
export const Semester = mongoose.model("Semester", semesterSchema);
export const Subject = mongoose.model("Subject", subjectSchema);
export const CurrentPursuing = mongoose.model(
  "CurrentPursuing",
  currentPursuingSchema
);
