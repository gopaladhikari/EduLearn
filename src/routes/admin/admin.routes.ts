import { Router } from "express";
import {
  deleteAdmin,
  getAdminById,
  loginAdmin,
  registerAdmin,
  updateAdmin,
} from "../../controllers/admin/admin.controller";
import { verifyJwt } from "../../middlewares/verifyJwt";

const adminRouter = Router();

// public routes
adminRouter.route("/register").post(registerAdmin);
adminRouter.route("/login").post(loginAdmin);

// public routes
adminRouter.route("/").get(verifyJwt, getAdminById);
adminRouter.route("/update").put(verifyJwt, updateAdmin);
adminRouter.route("/delete").delete(verifyJwt, deleteAdmin);

export { adminRouter };
