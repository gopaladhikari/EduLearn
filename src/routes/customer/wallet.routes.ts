import { Router } from "express";
import {
  createWallet,
  getWallet,
  updateWalletBalance,
  deleteWallet,
} from "../../controllers/customer/wallet.controller";
import { verifyCustomer } from "../../middlewares/customer.middleware";

const walletRouter = Router();

walletRouter.route("/create").post(verifyCustomer, createWallet);

walletRouter.route("/get").get(verifyCustomer, getWallet);

walletRouter
  .route("/update/:walletId")
  .put(verifyCustomer, updateWalletBalance);

walletRouter
  .route("/delete/:walletId")
  .delete(verifyCustomer, deleteWallet);

export { walletRouter };
