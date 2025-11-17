import { body, query, validationResult } from "express-validator";

export const validateCreateTransaction = [
  body("idUtilisateur").isInt({ min: 1 }).withMessage("idUtilisateur requis."),
  body("montant").isFloat({ min: 0 }).withMessage("montant >= 0"),
  body("dateTransaction").isISO8601().withMessage("dateTransaction invalide."),
  body("paysTransaction").notEmpty().withMessage("paysTransaction requis."),
  body("statut").isIn(["valide","suspecte","frauduleuse"]).withMessage("statut invalide.")
];


// JUste pour la forme, on aura pas besoin de mettre a jour une transaction
export const validateUpdateTransaction = [
  body("montant").optional().isFloat({ min: 0 }),
  body("dateTransaction").optional().isISO8601(),
  body("paysTransaction").optional().isString(),
  body("statut").optional().isIn(["valide","suspecte","frauduleuse"])
];


export const validateQueryTransaction = [
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 100 }),
  query("minMontant").optional().isFloat({ min: 0 }),
  query("maxMontant").optional().isFloat({ min: 0 }),
  query("dateFrom").optional().isISO8601(),
  query("dateTo").optional().isISO8601(),
  query("statut").optional().isIn(["valide","suspecte","frauduleuse"])
];


export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ erreurs: errors.array() });
  next();
};
