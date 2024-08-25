import React, { useState, useEffect } from "react";
import axios from "axios";

const CompanyList = ({ companies, setCompanies, fetchCompanies }) => {
  const [editingCompany, setEditingCompany] = useState(null);
  const [newData, setNewData] = useState({ name: "", description: "" });

  const deleteCompany = async (id) => {
    await axios.delete(`http://localhost:3001/companies/${id}`);
    fetchCompanies(); // Actualiza la lista después de eliminar
  };

  const startEditing = (company) => {
    setEditingCompany(company.id);
    setNewData({ name: company.name, description: company.description });
  };

  const editCompany = async (id) => {
    await axios.put(`http://localhost:3001/companies/${id}`, newData);
    setEditingCompany(null);
    fetchCompanies(); // Actualiza la lista después de editar
  };

  return (
    <div className="container mt-5">
      <h1>Companies</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>
                {editingCompany === company.id ? (
                  <input
                    type="text"
                    value={newData.name}
                    onChange={(e) =>
                      setNewData({ ...newData, name: e.target.value })
                    }
                  />
                ) : (
                  company.name
                )}
              </td>
              <td>
                {editingCompany === company.id ? (
                  <input
                    type="text"
                    value={newData.description}
                    onChange={(e) =>
                      setNewData({
                        ...newData,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  company.description
                )}
              </td>
              <td>
                {editingCompany === company.id ? (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={() => editCompany(company.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setEditingCompany(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={() => startEditing(company)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteCompany(company.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
