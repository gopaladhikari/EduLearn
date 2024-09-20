import { Router } from "express";
import {
  deleteAdmin,
  getAdminById,
  loginAdmin,
  registerAdmin,
  updateAdmin,
} from "../../controllers/admin/admin.controller";
import { verifyAdmin } from "../../middlewares/admin.middleware";

const adminRouter = Router();

// public routes
adminRouter.route("/register").post(registerAdmin);
adminRouter.route("/login").post(loginAdmin);

// public routes
adminRouter.route("/").get(verifyAdmin, getAdminById);
adminRouter.route("/update").put(verifyAdmin, updateAdmin);
adminRouter.route("/delete").delete(verifyAdmin, deleteAdmin);

export { adminRouter };
