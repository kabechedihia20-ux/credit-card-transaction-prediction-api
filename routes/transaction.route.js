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



/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Gestion des transactions bancaires
 */

/**
 * @swagger
 * /transaction:
 *   post:
 *     summary: Créer une transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Transaction créée
 */

/**
 * @swagger
 * /transaction:
 *   get:
 *     summary: Lister les transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 */
