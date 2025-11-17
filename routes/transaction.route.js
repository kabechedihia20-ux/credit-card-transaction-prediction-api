// routes/transaction.route.js
import express from "express";
import {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const transactionRouter = express.Router();

// Liste paginée des transactions
transactionRouter.get("/", verifyToken, getTransactions);

// Détail d'une transaction
transactionRouter.get("/:id", verifyToken, getTransactionById);

// Création d'une transaction
transactionRouter.post("/", verifyToken, createTransaction);

// Mise à jour d'une transaction
transactionRouter.put("/:id", verifyToken, updateTransaction);

// Suppression d'une transaction
transactionRouter.delete("/:id", verifyToken, deleteTransaction);

export default transactionRouter;
