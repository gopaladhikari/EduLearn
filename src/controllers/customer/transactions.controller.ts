import { isValidObjectId } from "mongoose";
import { Transaction } from "../../models/customer/transaction.model";
import { ApiSuccess, ApiError } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { cache } from "../../config/node-cache";

export const createTransaction = dbHandler(async (req, res) => {
  const userId = req.user?._id;
  const walletId = req.params.walletId;

  if (!isValidObjectId(walletId))
    throw new ApiError(400, "Invalid wallet id");

  const { amount, transactionType, description } = req.body;

  const transaction = await Transaction.create({
    userId,
    walletId,
    amount,
    transactionType,
    description,
  });

  if (!transaction) throw new ApiError(400, "Transaction not created");

  const cacheKey = `transactions-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res
    .status(201)
    .json(new ApiSuccess("Transaction created successfully", transaction));
});

export const getUserTransactions = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const cacheKey = `transactions-${userId}`;

  if (cache.has(cacheKey)) {
    const cachedTransactions = cache.get(cacheKey);

    return res
      .status(200)
      .json(
        new ApiSuccess(
          "Transactions fetched successfully",
          cachedTransactions
        )
      );
  }

  const transactions = await Transaction.find({ userId }).sort({
    transactionDate: -1,
  });

  if (!transactions.length)
    throw new ApiError(400, "No transactions found");

  cache.set(cacheKey, transactions);

  res
    .status(200)
    .json(
      new ApiSuccess("Transactions fetched successfully", transactions)
    );
});

export const updateTransaction = dbHandler(async (req, res) => {
  const transactionId = req.params.transactionId;
  const { amount, description } = req.body;
  const userId = req.user?._id;

  if (!isValidObjectId(transactionId))
    throw new ApiError(400, "Invalid transaction id");

  const transaction = await Transaction.findByIdAndUpdate(
    transactionId,
    { amount, description },
    { new: true }
  );

  if (!transaction) throw new ApiError(400, "Transaction not found");

  const cacheKey = `transactions-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res
    .status(200)
    .json(new ApiSuccess("Transaction updated successfully", transaction));
});

export const deleteTransaction = dbHandler(async (req, res) => {
  const transactionId = req.params.transactionId;
  const userId = req.user?._id;

  if (!isValidObjectId(transactionId))
    throw new ApiError(400, "Invalid transaction id");

  const transaction = await Transaction.findByIdAndDelete(transactionId);
  if (!transaction) throw new ApiError(400, "Transaction not found");

  const cacheKey = `transactions-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res
    .status(200)
    .json(new ApiSuccess("Transaction deleted successfully", transaction));
});
