import { Courses } from "../../models/admin/course.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";

export const getAllCourses = dbHandler(async (req, res) => {
  const adminId = req.admin?._id;

  if (!adminId) throw new ApiError(400, "Admin id is required");

  const courses = await Courses.find({});

  if (!courses) throw new ApiError(404, "Courses not found");

  return res
    .status(200)
    .json(new ApiSuccess("Course fetched succesfully", courses));
});
