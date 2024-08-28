import { Router } from "express";

import {
  createTip,
  deleteTip,
  getTips,
  updateTip,
} from "../../controllers/user/tips.controller";
import { verifyJWT } from "../../middlewares/auth.middleware";

const tipsRouter = Router();

tipsRouter.route("/get").get(verifyJWT, getTips);

tipsRouter.route("/create").post(verifyJWT, createTip);

tipsRouter.route("/update/:tipId").put(verifyJWT, updateTip);

tipsRouter.route("/delete/:tipId").delete(verifyJWT, deleteTip);

export { tipsRouter };
