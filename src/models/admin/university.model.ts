import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: { type: String },
    isDeleted: { type: Boolean, default: false },
    semesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
      index: true,
    },
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

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const currentPursuingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
      index: true,
    },

    semesters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Semester",
      },
    ],

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const universitySchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      index: true,
    },

    universityName: {
      type: String,
      required: true,
    },

    universityLogo: {
      type: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
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
