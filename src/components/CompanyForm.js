import React, { useState } from "react";
import axios from "axios";

const CompanyForm = ({ company, fetchCompanies }) => {
  const [name, setName] = useState(company ? company.name : "");
  const [description, setDescription] = useState(
    company ? company.description : ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (company) {
        await axios.put(`http://localhost:3001/companies/${company.id}`, {
          name,
          description,
        });
      } else {
        await axios.post("http://localhost:3001/companies", {
          name,
          description,
        });
      }
      fetchCompanies();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.error); // Muestra el mensaje de error del servidor
      } else {
        alert("ocurrio un error , pruebe otra compañia.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {company ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default CompanyForm;
