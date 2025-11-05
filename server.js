// Server.js
import express from 'express';
import sequelize from './config/database.js';
import utilisateurRouter from './routes/utilisateur.route.js';

const app = express();
const port = 3000;

// Middleware pour parler le JSON
app.use(express.json());

// Integration des Routes
app.use('/utilisateur', utilisateurRouter);

// View engine - Pour les vues (front-end)
app.set('view engine', 'ejs');
app.set('views', './view');
app.use(express.urlencoded({ extended: true })); // Pour les formulaires


// Main URL
// Route de base (GET)
app.get('/', (req, res) => {
  res.send('Bonjour, monde !');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});



// Test connexion bd

// async function dbAuth() {
//   try {
//     await sequelize.authenticate();
//     console.log('Connexion executee avec succes!');
//   } catch (error) {
//     console.error('Erreur de connexion!', error);
//   }
// }

// dbAuth();

