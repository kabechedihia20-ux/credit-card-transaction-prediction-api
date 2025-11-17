import Utilisateur from "./Utilisateur.js";
import Transaction from "./Transaction.js";
import Analyse from "./Analyse.js";
import Alerte from "./Alerte.js";
import Role from "./Role.js";
import UserRole from "./UserRole.js";

// Utilisateur 1..N Transaction
Utilisateur.hasMany(Transaction, { foreignKey: "idUtilisateur" });
Transaction.belongsTo(Utilisateur, { foreignKey: "idUtilisateur" });


// Transaction 1..1 Analyse
Transaction.hasOne(Analyse, { foreignKey: "idTransaction" });
Analyse.belongsTo(Transaction, { foreignKey: "idTransaction" });

// Analyse 1..N Alerte
Analyse.hasMany(Alerte, { foreignKey: "idAnalyse" });
Alerte.belongsTo(Analyse, { foreignKey: "idAnalyse" });


// Utilisateur N..N Role via UserRole
Utilisateur.belongsToMany(Role, { through: UserRole, foreignKey: "idUtilisateur" });
Role.belongsToMany(Utilisateur, { through: UserRole, foreignKey: "idRole" });

export { Utilisateur, Transaction, Analyse, Alerte, Role, UserRole };