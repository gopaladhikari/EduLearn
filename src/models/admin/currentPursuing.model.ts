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

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const CurrentPursuing = mongoose.model(
  "CurrentPursuing",
  currentPursuingSchema
);
