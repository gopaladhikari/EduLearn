import mongoose from "mongoose";

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

export const CurrentPursuing = mongoose.model(
  "CurrentPursuing",
  currentPursuingSchema
);
