import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
