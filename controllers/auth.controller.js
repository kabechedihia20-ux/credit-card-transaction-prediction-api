// controllers/auth.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Utilisateur from "../models/Utilisateur.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

// enregistrer un nouvel utilisateur
export const signup = async (req, res) => {
  try {
    const { nom, prenom, adresseEmail, telephone, motDePasse } = req.body;
    console.log("BACKEND SIGNUP BODY:", req.body);

    const existing = await Utilisateur.findOne({ where: { adresseEmail } });
    if (existing) {
      return res.status(400).json({ error: "Un utilisateur avec cet email existe déjà." });
    }

    console.log("BACKEND SIGNUP BODY:", req.body);

    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    const utilisateur = await Utilisateur.create({
      nom,
      prenom,
      adresseEmail,
      telephone,
      motDePasse: hashedPassword,
    });

    res.status(201).json({
      message: "Utilisateur enregistré avec succès.",
      utilisateur: {
        idUtilisateur: utilisateur.idUtilisateur,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        adresseEmail: utilisateur.adresseEmail,
      },
    });
  } catch (error) {
    console.error("Erreur register :", error);
    res.status(500).json({ error: "Erreur lors de l'enregistrement." });
  }
};

// se connecter avec email et mot de passe
export const login = async (req, res) => {
  try {
    const { adresseEmail, motDePasse } = req.body;

    const utilisateur = await Utilisateur.findOne({ where: { adresseEmail } });

    console.log("UTILISATEUR CRÉÉ:", utilisateur);


    if (!utilisateur) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect." });
    }

    const isValid = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!isValid) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect." });
    }

    const payload = {
      id: utilisateur.idUtilisateur,
      email: utilisateur.adresseEmail,
    };

    console.log("UTILISATEUR CRÉÉ:", utilisateur);


    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    console.log("TOKEN: ", token)

    res.status(200).json({
      message: "Authentification réussie.",
      token,
    });
  } catch (error) {
    console.error("Erreur login :", error);
    res.status(500).json({ error: "Erreur lors de la connexion." });
  }
};