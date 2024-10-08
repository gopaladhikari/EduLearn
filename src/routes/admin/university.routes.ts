import { Router } from "express";

import {
  createUniversity,
  deleteUniversity,
  getAllUniversities,
  getUniversityById,
  updateUniversity,
} from "../../controllers/admin/university.controller";
import { upload } from "../../middlewares/multer.middleware";
import { verifyJwt } from "../../middlewares/verifyJwt";

const universityRouter = Router();

universityRouter.route("/").get(verifyJwt, getAllUniversities);

universityRouter
  .route("/create")
  .post(verifyJwt, upload.single("universityLogo"), createUniversity);

universityRouter.route("/:universityId").get(verifyJwt, getUniversityById);

universityRouter
  .route("/update/:universityId")
  .put(verifyJwt, upload.single("universityLogo"), updateUniversity);

universityRouter
  .route("/delete/:universityId")
  .delete(verifyJwt, deleteUniversity);

export { universityRouter };
