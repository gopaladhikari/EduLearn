import { Router } from "express";
import {
  deleteAdmin,
  getAdmin,
  loginAdmin,
  registerAdmin,
  updateAdmin,
  updateSession,
} from "../../controllers/admin/admin.controller";
import { verifyJwt } from "../../middlewares/verifyJwt.middleware";

const adminRouter = Router();

// public routes
adminRouter.route("/register").post(registerAdmin);
adminRouter.route("/login").post(loginAdmin);

// private routes
adminRouter.route("/").get(verifyJwt, getAdmin);
adminRouter.route("/update").put(verifyJwt, updateAdmin);
adminRouter.route("/update-session").get(verifyJwt, updateSession);
adminRouter.route("/delete").delete(verifyJwt, deleteAdmin);

export { adminRouter };
