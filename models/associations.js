import Utilisateur from "./Utilisateur.js";
import Transaction from "./Transaction.js";
import Analyse from "./Analyse.js";
import Alerte from "./Alerte.js";
import Role from "./Role.js";
import UserRole from "./UserRole.js";

// Utilisateur 1..N Transaction
Utilisateur.hasMany(Transaction, { foreignKey: "idUtilisateur", constraints: false }); // <- contraints: false; foreignKey already exists, let it out
Transaction.belongsTo(Utilisateur, { foreignKey: "idUtilisateur", constraints: false });


// Transaction 1..1 Analyse
Transaction.hasOne(Analyse, { foreignKey: "idTransaction", constraints: false });
Analyse.belongsTo(Transaction, { foreignKey: "idTransaction", constraints: false });

// Analyse 1..N Alerte
Analyse.hasMany(Alerte, { foreignKey: "idAnalyse", constraints: false });
Alerte.belongsTo(Analyse, { foreignKey: "idAnalyse", constraints: false });


// Utilisateur N..N Role via UserRole
Utilisateur.belongsToMany(Role, { through: UserRole, foreignKey: "idUtilisateur", constraints: false });
Role.belongsToMany(Utilisateur, { through: UserRole, foreignKey: "idRole", constraints: false });

export { Utilisateur, Transaction, Analyse, Alerte, Role, UserRole };