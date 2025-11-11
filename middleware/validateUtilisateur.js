// middleware/validateUtilisateur.js
import { body, validationResult } from "express-validator";

export const validateCreateUtilisateur = [
  body("nom")
    .notEmpty().withMessage("Le nom est obligatoire.")
    .isString().withMessage("Le nom doit être une chaîne de caractères."),
  body("prenom")
    .notEmpty().withMessage("Le prénom est obligatoire.")
    .isString().withMessage("Le prénom doit être une chaîne de caractères."),
  body("adresseEmail")
    .notEmpty().withMessage("L'adresse email est obligatoire.")
    .isEmail().withMessage("L'adresse email n'est pas valide."),
  body("motDePasse")
    .notEmpty().withMessage("Le mot de passe est obligatoire.")
    .isLength({ min: 6 }).withMessage("Le mot de passe doit contenir au moins 6 caractères.")
];


export const validateUpdateUtilisateur = [
  body("nom")
    .notEmpty()
    .isString().withMessage("Le nom doit être une chaîne de caractères."),
  body("prenom")
    .notEmpty()
    .isString().withMessage("Le prénom doit être une chaîne de caractères."),
  body("adresseEmail")
    .notEmpty()
    .isEmail().withMessage("L'adresse email n'est pas valide."),
  body("motDePasse")
    .notEmpty()
    .isLength({ min: 6 }).withMessage("Le mot de passe doit contenir au moins 6 caractères.")
];


export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ erreurs: errors.array() });
  }
  next();
};