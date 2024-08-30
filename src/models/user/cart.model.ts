import mongoose, { Schema, Document, Types } from "mongoose";

const cartItemSchema = new Schema({
  mainCourseId: {
    type: Schema.Types.ObjectId,
    ref: "MainCourse",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// Interface for a single cart item
interface ICartItem extends Document {
  mainCourseId: Types.ObjectId;
  quantity: number;
}

// Define the Cart schema
const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courses: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

export interface ICart extends Document {
  userId: Types.ObjectId;
  courses: Types.DocumentArray<ICartItem>; // Use DocumentArray type for 'courses'
}

export const Cart = mongoose.model<ICart>("Cart", cartSchema);
