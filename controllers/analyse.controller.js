import Analyse from "../models/Analyse.js";
import Alerte from "../models/Alerte.js";
import Transaction from "../models/Transaction.js";
import Utilisateur from "../models/Utilisateur.js";

// ---------------------------------------------------
//  ANALYSE AUTOMATIQUE d’une transaction
// ---------------------------------------------------
export const analyserTransaction = async (transaction) => {
  let score = 0;

  // Règle 1: Montant élevé
  if (transaction.montant > 1000) score += 40;
  if (transaction.montant > 5000) score += 70;

  // Règle 2: Pays différent de l'habitation de l'utilisateur
  // (on suppose utilisateur.pays existe)
  const utilisateur = await Utilisateur.findByPk(transaction.idUtilisateur);
  if (utilisateur && utilisateur.pays && utilisateur.pays !== transaction.paysTransaction) {
    score += 30;
  }

  // Règle 3: Heure de la transaction (nuit)
  const hour = new Date(transaction.dateTransaction).getHours();
  if (hour >= 0 && hour <= 5) score += 20;

  // Score final
  // Score final
  score = Math.min(score, 100);
  const isFraude = score >= 70;

  // Sauvegarder l'analyse
  const analyse = await Analyse.create({
    idTransaction: transaction.idTransaction,
    probabiliteFraude: score,
    isFraude,
    dateAnalyse: new Date(),
  });

  // Générer une alerte si fraude
  if (isFraude) {
    await Alerte.create({
      idAnalyse: analyse.idAnalyse,
      message: "Suspicion de fraude détectée.",
      niveau: "élevé",
      dateCreation: new Date()
    });
  }

  return analyse;
};

// ---------------------------------------------------
//  GET toutes les analyses
// ---------------------------------------------------
export const getAnalyses = async (req, res) => {
  try {
    const analyses = await Analyse.findAll();
    res.status(200).json(analyses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------------------------------------------
//  GET analyse par ID
// ---------------------------------------------------
export const getAnalyseById = async (req, res) => {
  try {
    const analyse = await Analyse.findByPk(req.params.id);
    if (!analyse) return res.status(404).json({ message: "Analyse non trouvée" });

    res.status(200).json(analyse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
