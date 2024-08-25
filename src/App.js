import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import CompanyForm from "./components/CompanyForm";
import CompanyList from "./components/CompanyList";

function App() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    fetchCompanies(); // Cargar compañías cuando el componente se monte
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get("http://localhost:3001/companies");
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const selectCompany = (id) => {
    const company = companies.find((company) => company.id === id);
    setSelectedCompany(company);
  };

  return (
    <>
      <CompanyList
        companies={companies}
        setCompanies={setCompanies}
        fetchCompanies={fetchCompanies}
      />
      <CompanyForm company={selectedCompany} fetchCompanies={fetchCompanies} />
    </>
  );
}

export default App;
