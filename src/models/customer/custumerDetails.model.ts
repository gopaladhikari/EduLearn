import mongoose from "mongoose";

const customerDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },

    currentPursuingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CurrentPursuing",
      required: true,
    },

    semesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },

    subjectIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const CustomerDetails = mongoose.model(
  "CustomerDetails",
  customerDetailsSchema
);
