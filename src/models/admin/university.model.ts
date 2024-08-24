import mongoose from "mongoose";

const universitySchema = new mongoose.Schema(
  {
    universityName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const UniversityModel = mongoose.model(
  "University",
  universitySchema
);
