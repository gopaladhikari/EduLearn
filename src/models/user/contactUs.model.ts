import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    issue: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ContactUs = mongoose.model("ContactUs", contactUsSchema);
