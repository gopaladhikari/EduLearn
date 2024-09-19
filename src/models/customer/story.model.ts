import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    story: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Story = mongoose.model("Story", storySchema);
