import { Router } from "express";

import {
  createUniversity,
  deleteUniversity,
  getAllUniversities,
  getUniversityById,
  updateUniversity,
} from "../../controllers/admin/university.controller";
import { upload } from "../../middlewares/multer.middleware";

const universityRouter = Router();

universityRouter.route("/").post(upload.single("logo"), createUniversity);

universityRouter.route("/").get(getAllUniversities);
universityRouter.route("/:universityId").get(getUniversityById);
universityRouter.route("/update/:universityId").put(updateUniversity);
universityRouter.route("/delete/:universityId").delete(deleteUniversity);

export { universityRouter };
