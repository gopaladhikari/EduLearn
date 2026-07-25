import type { InstructorDetails } from "@/types/instruction-application.t.js";
import { instructorApplicationStatus } from "@/utils/constants.js";
import { Types, Schema, model } from "mongoose";

const instructorApplicationSchema = new Schema<InstructorDetails>(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },

    motivation: {
      type: String,
      required: [true, "Motivation is required."],
      maxlength: [800, "Motivation cannot exceed 800 characters"],
      minlength: [200, "Motivation must be at least 200 characters"],
    },

    experienceYears: {
      type: Number,
      min: 0,
      max: 30,
    },

    expertise: {
      type: [String],

      validate: {
        validator: function (value: string[]) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "Expertise is required.",
      },
    },

    qualification: {
      type: String,
      maxlength: 200,
      required: [true, "Qualification is required."],
    },

    status: {
      type: String,
      enum: instructorApplicationStatus,
      default: instructorApplicationStatus.PENDING,
    },

    reviewedBy: {
      type: Types.ObjectId,
      ref: "User",
      required(): boolean {
        return this.status !== instructorApplicationStatus.PENDING;
      },
    },

    reviewedAt: Date,

    rejectionReason: {
      type: String,
      maxlength: 500,
      required(): boolean {
        return this.status === instructorApplicationStatus.REJECTED;
      },
    },

    socialLinks: {
      type: {
        youtube: String,
        linkedin: String,
        website: String,
      },
    },
  },
  { timestamps: true }
);

export const InstructorApplication = model(
  "InstructorApplication",
  instructorApplicationSchema
);
