// controllers/transaction.controller.js
import { Op } from "sequelize";
import Transaction from "../models/Transaction.js";
import Utilisateur from "../models/Utilisateur.js";
import { analyserTransaction } from "./analyse.controller.js"; // Generer l'analyse automatiquement


// GET /transaction
// Pagination + recherche optionnelle
export const getTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const search = req.query.search || "";      // pour filtrer par pays ou statut
    const minMontant = req.query.minMontant;    // optionnel: montant minimum
    const maxMontant = req.query.maxMontant;    // optionnel: montant maximum

    const where = {};

    if (search) {
      where[Op.or] = [
        { paysTransaction: { [Op.like]: `%${search}%` } },
        { statut: { [Op.like]: `%${search}%` } },
      ];
    }

    if (minMontant || maxMontant) {
      where.montant = {};
      if (minMontant) {
        where.montant[Op.gte] = parseFloat(minMontant);
      }
      if (maxMontant) {
        where.montant[Op.lte] = parseFloat(maxMontant);
      }
    }

    const { rows, count } = await Transaction.findAndCountAll({
      where,
      limit,
      offset,
      order: [["dateTransaction", "DESC"]],
      include: [
        {
          model: Utilisateur,
          attributes: ["idUtilisateur", "nom", "prenom", "adresseEmail"],
        },
      ],
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      data: rows,
      page,
      limit,
      totalItems: count,
      totalPages,
    });
  } catch (error) {
    console.error("Erreur getTransactions :", error);
    res.status(500).json({
      error: "Erreur lors de la récupération des transactions.",
    });
  }
};


// GET /transaction/:id
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id, {
      include: [
        {
          model: Utilisateur,
          attributes: ["idUtilisateur", "nom", "prenom", "adresseEmail"],
        },
      ],
    });

    if (!transaction) {
      return res.status(404).json({ error: "Transaction non trouvée." });
    }

    res.status(200).json(transaction);
  } catch (error) {
    console.error("Erreur getTransactionById :", error);
    res.status(500).json({
      error: "Erreur lors de la récupération de la transaction.",
    });
  }
};


// POST /transaction
export const createTransaction = async (req, res) => {
  try {
    const data = req.body;

    // Plusieurs transactions à la fois
    if (Array.isArray(data)) {
      const transactions = await Transaction.bulkCreate(data);

      // analyser chaque transaction
      for (let t of transactions) {
        await analyserTransaction(t);
      }

      return res.status(201).json({
        message: "Transactions créées avec succès.",
        transactions
      });
    }

    // Une seule transaction
    const transaction = await Transaction.create(data);

    // Analyse automatique
    const analyse = await analyserTransaction(transaction);

    res.status(201).json({
      message: "Transaction + Analyse créées.",
      transaction,
      analyse
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// PUT /transaction/:id
export const updateTransaction = async (req, res) => {
  try {
    const [updated] = await Transaction.update(req.body, {
      where: { idTransaction: req.params.id },
    });

    if (!updated) {
      return res.status(404).json({ error: "Transaction non trouvée." });
    }

    const transaction = await Transaction.findByPk(req.params.id);
    res.status(200).json({
      message: "Transaction mise à jour avec succès.",
      transaction,
    });
  } catch (error) {
    console.error("Erreur updateTransaction :", error);
    res.status(400).json({
      error: "Erreur lors de la mise à jour de la transaction.",
    });
  }
};


// DELETE /transaction/:id
export const deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.destroy({
      where: { idTransaction: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ error: "Transaction non trouvée." });
    }

    res.status(200).json({ message: "Transaction supprimée avec succès." });
  } catch (error) {
    console.error("Erreur deleteTransaction :", error);
    res.status(500).json({
      error: "Erreur lors de la suppression de la transaction.",
    });
  }
};




