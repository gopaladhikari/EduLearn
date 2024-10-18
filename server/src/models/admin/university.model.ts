import mongoose from "mongoose";

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
