import Utilisateur from "../models/Utilisateur.js";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";


// Obtenir tous les utilisateurs
export const getUtilisateurs = async (req, res) => {
  try {
    // Parametres de pagination: /utilisateur?page=2&limit=5
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    // Parametre de recherche optionnel: /utilisateur?search=julie
    const search = req.query.search || "";
    const where = {};

    if (search) {
      where[Op.or] = [
        { nom: { [Op.like]: `%${search}%` } },
        { prenom: { [Op.like]: `%${search}%` } },
        { adresseEmail: { [Op.like]: `%${search}%` } }
      ];
    }

    const { rows, count } = await Utilisateur.findAndCountAll({
      where,
      limit,
      offset,
      order: [["idUtilisateur", "ASC"]]
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      data: rows,
      page,
      limit,
      totalItems: count,
      totalPages
    });
  } catch (error) {
    console.error("Erreur getUtilisateurs :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs." });
  }
};

// Créer un nouvel utilisateur
export const createUtilisateur = async (req, res) => {
  try {
    const data = req.body;

    // Si on reçoit un tableau → insertion multiple
    if (Array.isArray(data)) {
      // Hash pour chaque utilisateur du tableau
      const utilisateursToCreate = await Promise.all(
        data.map(async (u) => {
          if (!u.motDePasse) throw new Error("Mot de passe manquant pour un utilisateur.");
          u.motDePasse = await bcrypt.hash(u.motDePasse, 10);
          return u;
        })
      );

      const utilisateurs = await Utilisateur.bulkCreate(utilisateursToCreate);

      return res.status(201).json({
        message: `${utilisateurs.length} utilisateurs créés avec succès.`,
        utilisateurs,
      });
    }

    // Insertion unique
    if (!data.motDePasse) {
      return res.status(400).json({ error: "Mot de passe obligatoire." });
    }

    // Hash du mot de passe
    data.motDePasse = await bcrypt.hash(data.motDePasse, 10);

    const utilisateur = await Utilisateur.create(data);

    return res.status(201).json({
      message: "Utilisateur créé avec succès.",
      utilisateur,
    });

  } catch (error) {
    console.error("Erreur createUtilisateur :", error);
    return res.status(400).json({ error: "Erreur lors de la création de l'utilisateur." });
  }
};


// Obtenir un utilisateur par ID
export const getUtilisateurById = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.params.id);
    if (!utilisateur) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }
    res.status(200).json(utilisateur);
  } catch (error) {
    console.error("Erreur getUtilisateurById :", error);
    res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur." });
  }
};

// Mettre à jour un utilisateur
export const updateUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.params.id);

    if (!utilisateur) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    const {
      nom,
      prenom,
      adresseEmail,
      telephone,
      motDePasse,
      newPassword
    } = req.body;

    let motDePasseFinal = utilisateur.motDePasse;

    // Si un nouveau mot de passe est fourni → on le hash
    if (newPassword && newPassword.trim() !== "") {
      motDePasseFinal = await bcrypt.hash(newPassword, 10);
    }
    // Sinon, si l’ancien est fourni → on le garde (cas sécurité)
    else if (motDePasse && motDePasse.trim() !== "") {
      motDePasseFinal = motDePasse;
    }

    await utilisateur.update({
      nom,
      prenom,
      adresseEmail,
      telephone,
      motDePasse: motDePasseFinal
    });

    res.status(200).json(utilisateur);

  } catch (error) {
    console.error("Erreur updateUtilisateur :", error);
    res.status(400).json({ error: "Erreur lors de la mise à jour de l'utilisateur." });
  }
};


// Supprimer un utilisateur
export const deleteUtilisateur = async (req, res) => {
  try {
    const deleted = await Utilisateur.destroy({
      where: { idUtilisateur: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    res.status(200).json({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    console.error("Erreur deleteUtilisateur :", error);
    res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur." });
  }
};
