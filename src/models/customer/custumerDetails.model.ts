import mongoose from "mongoose";

const customerDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    universityName: {
      type: String,
      required: true,
    },

    currentlyPursuing: {
      type: String,
      required: true,
    },

    semester: {
      type: Number,
      required: true,
    },

    subject: [
      {
        type: String,
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
