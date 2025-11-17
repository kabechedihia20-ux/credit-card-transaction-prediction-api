import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const UserRole = sequelize.define("UserRole", {
  idUserRole: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: "id_userRole" },
  idUtilisateur: { type: DataTypes.INTEGER, allowNull: false, field: "id_utilisateur" },
  idRole: { type: DataTypes.INTEGER, allowNull: false, field: "id_role" }
}, {
  tableName: "user_role",
  timestamps: false
});

export default UserRole;
