const { Router } = require("express");
const Company = require("../models/company.js");
//import { Employee } from "../models/Employee.js";

const companiesRouter = Router();

companiesRouter.get("/companies", async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

companiesRouter.get("/companies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

companiesRouter.post("/companies", async (req, res) => {
  try {
    const { name, description } = req.body;
    const existingCompany = await Company.findOne({ where: { name } });
    if (existingCompany) {
      return res
        .status(400)
        .json({ error: "Company with this name already exists." });
    }
    const newCompany = await Company.create({
      name: name,
      description: description,
    });
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
companiesRouter.put("/companies/:id", async (req, res) => {
  try {
    const { id } = req.params; //obtengoel id
    const company = await Company.findByPk(id);
    company.set(req.body); //edita lo que venga en el body del put
    await company.save(); //para que se guarde
    res.status(202).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
companiesRouter.delete("/companies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Company.destroy({ where: { id } });
    res.status(204).end(); //aca va el end, porq no hay .json. y el.json hace el end automatico,sinohay q ponerlo
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { companiesRouter };
