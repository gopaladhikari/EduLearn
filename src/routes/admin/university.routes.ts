import { Router } from "express";

import {
  createUniversity,
  deleteUniversity,
  getAllUniversities,
  getUniversityById,
  updateUniversity,
} from "../../controllers/admin/university.controller";
import { upload } from "../../middlewares/multer.middleware";
import { verifyJWT } from "../../middlewares/auth.middleware";

const universityRouter = Router();

universityRouter
  .route("/create")
  .post(upload.single("universityLogo"), verifyJWT, createUniversity);

universityRouter.route("/get").get(verifyJWT, getAllUniversities);

universityRouter
  .route("/get/:universityId")
  .get(verifyJWT, getUniversityById);
universityRouter
  .route("/update/:universityId")
  .put(verifyJWT, updateUniversity);
universityRouter
  .route("/delete/:universityId")
  .delete(verifyJWT, deleteUniversity);

export { universityRouter };
