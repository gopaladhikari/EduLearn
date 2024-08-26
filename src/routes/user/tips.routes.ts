import { Router } from "express";

import {
  createTip,
  deleteTip,
  getTips,
  updateTip,
} from "../../controllers/user/tips.controller";

const tipsRouter = Router();

tipsRouter.route("/").get(getTips);

tipsRouter.route("/create").post(createTip);

tipsRouter.route("/update").put(updateTip);

tipsRouter.route("/delete").delete(deleteTip);

export { tipsRouter };
