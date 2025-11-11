// server.js
import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import utilisateurRouter from "./routes/utilisateur.route.js";
import authRouter from "./routes/auth.route.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour lire le JSON et les formulaires
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View Engine (optionnel pour la partie API)
// app.set("view engine", "ejs");
// app.set("views", "./view");

// Routes principales
app.use("/utilisateurs", utilisateurRouter);
app.use("/auth", authRouter);

// Route d'accueil
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API de détection de fraude" });
});

// Démarrage du serveur après connexion à la base de données
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de données réussie");
    await sequelize.sync();

    app.listen(port, () => {
      console.log(`Serveur démarré sur http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Erreur de connexion à la base de données :", error);
  }
};

startServer();
