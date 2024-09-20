import { Router } from "express";
import {
  createWallet,
  getWallet,
  updateWalletBalance,
  deleteWallet,
} from "../../controllers/customer/wallet.controller";
import { verifyJwt } from "../../middlewares/verifyJwt";

const walletRouter = Router();

walletRouter.route("/create").post(verifyJwt, createWallet);

walletRouter.route("/get").get(verifyJwt, getWallet);

walletRouter
  .route("/update/:walletId")
  .put(verifyJwt, updateWalletBalance);

walletRouter.route("/delete/:walletId").delete(verifyJwt, deleteWallet);

export { walletRouter };
