import { Router } from "express";
import {
  createWallet,
  getWallet,
  updateWalletBalance,
  deleteWallet,
} from "../../controllers/user/wallet.controller";
import { verifyJWT } from "../../middlewares/auth.middleware";

const walletRouter = Router();

walletRouter.route("/create").post(verifyJWT, createWallet);

walletRouter.route("/get").get(verifyJWT, getWallet);

walletRouter
  .route("/update/:walletId")
  .put(verifyJWT, updateWalletBalance);

walletRouter.route("/delete/:walletId").delete(verifyJWT, deleteWallet);

export { walletRouter };
