import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Role = sequelize.define("Role", {
  idRole: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: "id_role" },
  nomRole: { type: DataTypes.STRING(50), allowNull: false, field: "nom_role", unique: true }
}, {
  tableName: "role",
  timestamps: false
});

export default Role;
