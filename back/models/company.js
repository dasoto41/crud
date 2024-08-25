const { DataTypes } = require("sequelize");
const { sequelize } = require("../dataBase/connect.js");

const Company = sequelize.define(
  "Company",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true, // No pueden haber dos compañías con el mismo nombre
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    underscored: true,
  }
);

async function sync() {
  try {
    await Company.sync(); // Sincroniza el modelo con la base de datos
    console.log("La tabla 'Company' ha sido creada o ya existe.");
  } catch (error) {
    console.error("Error al sincronizar el modelo:", error);
  }
}

sync();

module.exports = Company;

/*Company.hasMany(Employee, {
  foreignKey: "companyId",
  sourceKey: "id",
});

Employee.belongsTo(Company, {
  foreignKey: "companyId",
  targetKey: "id",
});*/

/*await Employee.sync();
 */ //LO COMENTO UNA VEZ SE CREARON
