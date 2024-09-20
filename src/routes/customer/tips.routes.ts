import { Router } from "express";

import {
  createTip,
  deleteTip,
  getTips,
  updateTip,
} from "../../controllers/customer/tips.controller";
import { verifyCustomer } from "../../middlewares/customer.middleware";

const tipsRouter = Router();

tipsRouter.route("/get").get(verifyCustomer, getTips);

tipsRouter.route("/create").post(verifyCustomer, createTip);

tipsRouter.route("/update/:tipId").put(verifyCustomer, updateTip);

tipsRouter.route("/delete/:tipId").delete(verifyCustomer, deleteTip);

export { tipsRouter };
