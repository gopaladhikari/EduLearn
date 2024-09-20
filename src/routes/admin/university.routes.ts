import { Router } from "express";

import {
  createUniversity,
  deleteUniversity,
  getAllUniversities,
  getUniversityById,
  updateUniversity,
} from "../../controllers/admin/university.controller";
import { upload } from "../../middlewares/multer.middleware";
import { verifyCustomer } from "../../middlewares/customer.middleware";

const universityRouter = Router();

universityRouter
  .route("/create")
  .post(upload.single("universityLogo"), verifyCustomer, createUniversity);

universityRouter.route("/get").get(verifyCustomer, getAllUniversities);

universityRouter
  .route("/get/:universityId")
  .get(verifyCustomer, getUniversityById);
universityRouter
  .route("/update/:universityId")
  .put(verifyCustomer, updateUniversity);
universityRouter
  .route("/delete/:universityId")
  .delete(verifyCustomer, deleteUniversity);

export { universityRouter };
