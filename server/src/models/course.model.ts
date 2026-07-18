import type { ICourses } from "@/types/courses.t.js";
import { Courselevels } from "@/utils/constants.js";
import mongoose from "mongoose";
import slugify from "slugify";

const courseSchema = new mongoose.Schema<ICourses>(
  {
    title: {
      type: String,
      required: [true, "Course title is required."],
      trim: true,
      maxLength: [100, "Course title cannot exceed 100 characters."],
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Instructor is required."],
    },

    subtitle: {
      type: String,
      trim: true,
      maxLength: [200, "Course description cannot exceed 200 characters."],
    },

    description: {
      type: String,
      required: [true, "Course description is required."],
      trim: true,
      maxLength: [500, "Course description cannot exceed 500 characters."],
    },

    duration: {
      type: Number,
      min: [0, "Duration cannot be negative number."],
      default: 0,
    },

    category: {
      type: String,
      required: [true, "Category is required."],
      trim: true,
    },

    level: {
      type: String,
      enum: {
        values: Object.values(Courselevels),
        message: "Please select a valid course level.",
      },
      default: Courselevels.BEGINNER,
    },

    price: {
      type: Number,
      required: [true, "Price is required."],
      min: [0, "Course price cannot be negative."],
    },

    language: {
      type: String,
      required: [true, "Course language is required."],
    },

    thumbnail: {
      publicId: {
        type: String,
      },
      url: {
        type: String,
      },
    },

    coInstructors: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

courseSchema.pre("save", async function () {
  if (!this.isModified("title")) return;

  let baseSlug = slugify(this.title, { lower: true, strict: true });

  const CourseModel = this.constructor as mongoose.Model<ICourses>;

  let slugExists = await CourseModel.findOne({ slug: baseSlug });
  let count = 1;

  while (slugExists) {
    const newSlug = `${baseSlug}-${count}`;
    slugExists = await CourseModel.findOne({ slug: newSlug });
    if (!slugExists) {
      baseSlug = newSlug;
      break;
    }
    count++;
  }

  this.slug = baseSlug;
});

export const Course = mongoose.model("Course", courseSchema);
