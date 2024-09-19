import { Router } from "express";
import {
  createTransaction,
  getUserTransactions,
  updateTransaction,
  deleteTransaction,
} from "../../controllers/customer/transactions.controller";
import { verifyJWT } from "../../middlewares/auth.middleware";

const transactionRouter = Router();

transactionRouter
  .route("/create/:walletId")
  .post(verifyJWT, createTransaction);

transactionRouter.route("/get").get(verifyJWT, getUserTransactions);

transactionRouter
  .route("/update/:transactionId")
  .put(verifyJWT, updateTransaction);

transactionRouter
  .route("/delete/:transactionId")
  .delete(verifyJWT, deleteTransaction);

export { transactionRouter };
