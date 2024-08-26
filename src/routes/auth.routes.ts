import {
  loginWithPhoneNumber,
  signUpWithPhoneNumber,
  resendOtp,
  verifyLoginOTP,
  verifySignUpOTP,
} from "../controllers/auth.controllers";

import { Router } from "express";

const authRouter = Router();

authRouter.post("/signup", signUpWithPhoneNumber);
authRouter.post("/login", loginWithPhoneNumber);
authRouter.post("/resend-otp", resendOtp);
authRouter.post("/verify-signup-otp", verifySignUpOTP);
authRouter.post("/verify-login-otp", verifyLoginOTP);

export { authRouter };
