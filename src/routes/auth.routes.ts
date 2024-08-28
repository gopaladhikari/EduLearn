import {
  loginWithPhoneNumber,
  signUpWithPhoneNumber,
  resendOtp,
  verifyLoginOTP,
  verifySignUpOTP,
  updateUser,
  getCurrentUser,
} from "../controllers/auth.controllers";

import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.route("/login").post(verifyJWT, loginWithPhoneNumber);
authRouter.route("/get-current-user").post(verifyJWT, getCurrentUser);
authRouter.route("/signup").post(verifyJWT, signUpWithPhoneNumber);
authRouter.route("/otp").post(verifyJWT, resendOtp);
authRouter.route("/verify-otp").post(verifyJWT, verifyLoginOTP);
authRouter.route("/verify-signup-otp").post(verifyJWT, verifySignUpOTP);
authRouter.route("/update-user").post(verifyJWT, updateUser);

export { authRouter };
