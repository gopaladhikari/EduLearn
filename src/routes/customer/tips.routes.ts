import { Router } from "express";

import {
  createTip,
  deleteTip,
  getTips,
  updateTip,
} from "../../controllers/customer/tips.controller";
import { verifyJwt } from "../../middlewares/verifyJwt.middleware";

const tipsRouter = Router();

tipsRouter.route("/get").get(verifyJwt, getTips);

tipsRouter.route("/create").post(verifyJwt, createTip);

tipsRouter.route("/update/:tipId").put(verifyJwt, updateTip);

tipsRouter.route("/delete/:tipId").delete(verifyJwt, deleteTip);

export { tipsRouter };
