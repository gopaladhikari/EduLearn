import { Router } from "express";
import {
  createTransaction,
  getUserTransactions,
  updateTransaction,
  deleteTransaction,
} from "../../controllers/customer/transactions.controller";
import { verifyCustomer } from "../../middlewares/customer.middleware";

const transactionRouter = Router();

transactionRouter
  .route("/create/:walletId")
  .post(verifyCustomer, createTransaction);

transactionRouter.route("/get").get(verifyCustomer, getUserTransactions);

transactionRouter
  .route("/update/:transactionId")
  .put(verifyCustomer, updateTransaction);

transactionRouter
  .route("/delete/:transactionId")
  .delete(verifyCustomer, deleteTransaction);

export { transactionRouter };
