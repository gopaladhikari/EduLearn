import {
  instructorApprovedTemplate,
  instructorRejectedTemplate,
} from "@/emails/instructor-application.email.js";
import { InstructorApplication } from "@/models/instruction-application.models.js";
import { ApiError, ApiResponse } from "@/utils/api-responses.js";
import { instructorApplicationStatus } from "@/utils/constants.js";
import { cache } from "@/utils/redis.js";
import { sendEmail } from "@/utils/send-email.js";
import type { Request, Response } from "express";
import type { Content } from "mailgen";
import { isValidObjectId } from "mongoose";

function getKey(key: string): string {
  return `instructor-application:${key}`;
}

export const getAllInstructorApplication = async (
  _req: Request,
  res: Response
) => {
  const cachedApplications = await cache.get(getKey("all"));

  if (cachedApplications) {
    return res.status(200).json(
      new ApiResponse(200, "Instructor applications fetched successfully", {
        instructorApplications: cachedApplications,
      })
    );
  }

  const instructorApplications =
    await InstructorApplication.find().populate("user");

  if (instructorApplications && instructorApplications.length === 0)
    throw new ApiError(404, "No instructor applications found");

  void cache.set(getKey("all"), instructorApplications);

  return res.status(200).json(
    new ApiResponse(200, "Instructor applications fetched successfully", {
      instructorApplications,
    })
  );
};

export const getInstructorApplicationsbByStudentId = async (
  req: Request,
  res: Response
) => {
  const studentId = req.params.studentId as string;

  if (!isValidObjectId(studentId))
    throw new ApiError(400, "Invalid student id");

  const cachedApplications = await cache.get(getKey(studentId));

  if (cachedApplications) {
    return res.status(200).json(
      new ApiResponse(200, "Instructor applications fetched successfully", {
        instructorApplications: cachedApplications,
      })
    );
  }

  const instructorApplications = await InstructorApplication.find({
    user: studentId,
  });

  if (instructorApplications.length === 0)
    throw new ApiError(404, "No instructor applications found");

  void cache.set(getKey(studentId), JSON.stringify(instructorApplications));

  return res.status(200).json(
    new ApiResponse(200, "Instructor applications fetched successfully", {
      instructorApplications,
    })
  );
};

export const getInstructorApplicationById = async (
  req: Request,
  res: Response
) => {
  const applicationId = req.params.applicationId as string;

  if (!isValidObjectId(applicationId))
    throw new ApiError(400, "Invalid application id");

  await cache.del(getKey(applicationId));
  const cachedApplication = await cache.get(getKey(applicationId));

  if (cachedApplication) {
    return res.status(200).json(
      new ApiResponse(200, "Instructor application fetched successfully", {
        instructorApplication: cachedApplication,
      })
    );
  }

  const instructorApplication =
    await InstructorApplication.findById(applicationId).populate("user");

  if (!instructorApplication)
    throw new ApiError(404, "Instructor application not found");

  void cache.set(getKey(applicationId), instructorApplication);

  return res.status(200).json(
    new ApiResponse(200, "Instructor application fetched successfully", {
      instructorApplication,
    })
  );
};

export const createInstructorApplication = async (
  req: Request,
  res: Response
) => {
  const {
    motivation,
    experienceYears,
    expertise,
    qualification,
    youtube,
    linkedin,
    website,
  } = req.body;

  const user = req.user!;

  const instructorApplication = await InstructorApplication.create({
    user: user._id,
    motivation,
    experienceYears,
    expertise,
    qualification,
    socialLinks: {
      youtube,
      linkedin,
      website,
    },
  });

  if (!instructorApplication) throw new ApiError(500, "Something went wrong");

  void cache.del(getKey("all"));

  return res.status(201).json(
    new ApiResponse(201, "Instructor application created successfully", {
      instructorApplication,
    })
  );
};

export const updateInstructorApplication = async (
  req: Request,
  res: Response
) => {
  const reviewerId = req.user!._id;

  const applicationId = req.params.applicationId as string;

  const { status, rejectionReason } = req.body;

  if (!isValidObjectId(applicationId))
    throw new ApiError(400, "Invalid application id");

  const instructorApplication =
    await InstructorApplication.findById(applicationId).populate("user");

  if (!instructorApplication)
    throw new ApiError(404, "Instructor application not found");

  if (instructorApplication.status === instructorApplicationStatus.REJECTED)
    throw new ApiError(400, "Instructor application already rejected");

  instructorApplication.status = status;
  instructorApplication.reviewedBy = reviewerId;
  instructorApplication.reviewedAt = new Date();

  if (status === instructorApplicationStatus.REJECTED)
    instructorApplication.rejectionReason = rejectionReason;

  await instructorApplication.save();

  void Promise.all([
    cache.del(getKey(applicationId)),
    cache.del(getKey("all")),
    cache.del(instructorApplication.user._id.toString()),
  ]);

  res
    .status(200)
    .json(
      new ApiResponse(200, "Instructor application updated sucessfully.", {})
    );

  const applicant = instructorApplication.user as unknown as Express.User;

  let emailBody: Content;
  let emailSubject: string;

  if (status === instructorApplicationStatus.ACCEPTED) {
    emailSubject = "Edulearn Instructor Application Approved! 🎓";
    emailBody = instructorApprovedTemplate(applicant.username);
  } else {
    emailSubject = "Update on your Edulearn Instructor Application";
    emailBody = instructorRejectedTemplate(applicant.username, rejectionReason);
  }

  void sendEmail(applicant.email, emailSubject, emailBody);
};

export const deleteInstructorApplication = async (
  req: Request,
  res: Response
) => {
  const applicationId = req.params.applicationId as string;

  if (!isValidObjectId(applicationId))
    throw new ApiError(400, "Invalid application id");

  const instructorApplication =
    await InstructorApplication.findByIdAndDelete(applicationId);

  if (!instructorApplication)
    throw new ApiError(404, "Instructor application not found");

  void Promise.all([
    cache.del(getKey(applicationId)),
    cache.del(getKey("all")),
    cache.del(instructorApplication.user._id.toString()),
  ]);

  return res.status(200).json(
    new ApiResponse(200, "Instructor application deleted successfully", {
      instructorApplication,
    })
  );
};
