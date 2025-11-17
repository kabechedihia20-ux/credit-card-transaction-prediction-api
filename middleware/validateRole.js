import { body, validationResult } from "express-validator";

export const validateCreateRole = [
  body("nomRole")
    .notEmpty().withMessage("nomRole obligatoire")
    .isString().withMessage("nomRole doit être un texte")
];

export const validateAssignRole = [
  body("idUtilisateur").isInt({ min: 1 }).withMessage("idUtilisateur requis"),
  body("idRole").isInt({ min: 1 }).withMessage("idRole requis")
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ erreurs: errors.array() });
  next();
};
