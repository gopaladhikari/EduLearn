import { Router } from "express";
import {
  createTransaction,
  getUserTransactions,
  updateTransaction,
  deleteTransaction,
} from "../../controllers/customer/transactions.controller";
import { verifyJwt } from "../../middlewares/verifyJwt";

const transactionRouter = Router();

transactionRouter
  .route("/create/:walletId")
  .post(verifyJwt, createTransaction);

transactionRouter.route("/get").get(verifyJwt, getUserTransactions);

transactionRouter
  .route("/update/:transactionId")
  .put(verifyJwt, updateTransaction);

transactionRouter
  .route("/delete/:transactionId")
  .delete(verifyJwt, deleteTransaction);

export { transactionRouter };
