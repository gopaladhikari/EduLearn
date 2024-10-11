import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },

  profilePicture: { type: String },

  socialLinks: {
    linkedin: String,
    twitter: String,
  },
});

const Instructor = mongoose.model("Instructor", instructorSchema);
