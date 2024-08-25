const express = require("express");
const cors = require("cors");
const { sequelize } = require("../back/dataBase/connect.js"); // importo la constante sequelize  de conexion a la base
const { model } = require("../back/models/company.js");
const { companiesRouter } = require("../back/controllers/companies.js");

const app = express();
app.use(cors());

app.use(express.json()); // permite usar json

async function connect() {
  try {
    await sequelize.authenticate();
    //es una funcion asyncrona el authenticate. prueba q la conexin a la base funcione
    console.log("base conectada");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.get("/", (req, res) => {
  res.json({ message: "todo ok" }); //prueba de que usa bienjson
});

app.use(companiesRouter);
//app.use(employeesRouter);
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server en puerto ${PORT}`);
});
