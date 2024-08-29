import { isValidObjectId } from "mongoose";
import { Transaction } from "../../models/user/transaction.model";
import { ApiSuccess, ApiError } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";

export const createTransaction = dbHandler(async (req, res) => {
  const userId = req.user?._id;
  const walletId = req.params.walletId;

  if (!isValidObjectId(walletId)) throw new ApiError("Invalid wallet id");

  const { amount, transactionType, description } = req.body;

  const transaction = await Transaction.create({
    userId,
    walletId,
    amount,
    transactionType,
    description,
  });

  if (!transaction) throw new ApiError("Transaction not created");

  res
    .status(201)
    .json(new ApiSuccess("Transaction created successfully", transaction));
});

export const getUserTransactions = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const transactions = await Transaction.find({ userId }).sort({
    transactionDate: -1,
  });

  if (!transactions.length) throw new ApiError("No transactions found");

  res
    .status(200)
    .json(
      new ApiSuccess("Transactions fetched successfully", transactions)
    );
});

export const updateTransaction = dbHandler(async (req, res) => {
  const transactionId = req.params.transactionId;
  const { amount, description } = req.body;

  if (!isValidObjectId(transactionId))
    throw new ApiError("Invalid transaction id");

  const transaction = await Transaction.findByIdAndUpdate(
    transactionId,
    { amount, description },
    { new: true }
  );

  if (!transaction) throw new ApiError("Transaction not found");

  res
    .status(200)
    .json(new ApiSuccess("Transaction updated successfully", transaction));
});

export const deleteTransaction = dbHandler(async (req, res) => {
  const transactionId = req.params.transactionId;

  if (!isValidObjectId(transactionId))
    throw new ApiError("Invalid transaction id");

  const transaction = await Transaction.findByIdAndDelete(transactionId);
  if (!transaction) throw new ApiError("Transaction not found");

  res
    .status(200)
    .json(new ApiSuccess("Transaction deleted successfully", transaction));
});
