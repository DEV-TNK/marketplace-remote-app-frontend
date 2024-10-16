import React, { useState } from "react";
import { Card, Collapse, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { showToast } from "../../../../Showtoast";

const companyFilters = ({ onFilterChange }) => {
  const [openLocation, setOpenLocation] = useState(true);
  const [openSalary, setOpenSalary] = useState(true);
  const [openDepartments, setOpenDepartments] = useState(true);
  const [loading, setLoading] = useState(false);
  const jobType = [
    "Particulier",
    "PME",
    "Startup",
    "Société",
    "Gouvernement",
    "Conglomérat",
    "ONG",
    "Aucune des propositions ci-dessus ",
  ];

  const jobDesignation = [
    { value: "Agriculture", label: "Agriculture" },
    { value: "Extraction", label: "Extraction" },
    { value: "Pêche", label: "Pêche" },
    { value: "Foresterie", label: "Foresterie" },
    { value: "Fabrication", label: "Fabrication" },
    { value: "Construction", label: "Construction" },
    { value: "Vente au détail", label: "Vente au détail" },
    { value: "Beauté et Santé", label: "Beauté et Santé" },
    { value: "Hôtellerie", label: "Hôtellerie" },
    { value: "Éducation", label: "Éducation" },
    { value: "Finance", label: "Finance" },
    { value: "Transports", label: "Transports" },
    { value: "Technologies de l'information", label: "Technologies de l'information" },
    { value: "Recherche et Développement", label: "Recherche et Développement" },
    { value: "Consultation", label: "Consultation" },
    { value: "Énergie", label: "Énergie" },
    { value: "Immobilier", label: "Immobilier" },
    { value: "Médias et Divertissement", label: "Médias et Divertissement" },
    { value: "Gouvernement", label: "Gouvernement" },
  ];
  const [selectedJobDesignation, setSelectedJobDesignation] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState([]);
  // Define state for selected filters
  const [selectedFilters, setSelectedFilters] = useState({
    jobLocation: "",
    jobDesignation: "",
  });

  const handleLocationChange = (val) => {
    setSelectedFilters({ ...selectedFilters, jobLocation: val });
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const requestData = {
        companyLocation: [selectedFilters.jobLocation],
        companyDesignation: [selectedFilters.jobDesignation],
        companyType: selectedJobType.map((type) => type),
      };

      const response = await axios.post(
        "https://marketplacebackendas-test.azurewebsites.net/api/v1/companies/company-list",
        requestData
      );

      // Pass selected filters to parent component
      setLoading(false);
      onFilterChange(response.data.companies);
      showToast("Filters applied successfully");
    } catch (error) {
      setLoading(false);
      showToast(error.response.data.message);
    }
  };

  const SearchActivity = async () => {
    const userId = sessionStorage.getItem("UserId") || null;
    const userEmail = sessionStorage.getItem("email") || null;
    try {
      const response = await axios.post(
        "https://marketplacebackendas-test.azurewebsites.net/api/v1/create-activity",
        {
          UserAction: selectedFilters.jobDesignation
            ? selectedFilters.jobDesignation
            : null,
          UserId: userId,
          UserEmail: userEmail,
          ActionType: "Company-Search",
        }
      );
      console.log("this is the service response", response.data);
    } catch (error) {
      console.log("error");
    }
  };

  // Helper function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleJobTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedJobType((prev) => [...prev, value]);
    } else {
      setSelectedJobType((prev) => prev.filter((jobType) => jobType !== value));
    }
  };

  return (
    <Card className="border mb-6 mb-md-0 shadow-none">
      <Card.Header>
        <h4 className="mb-0 fs-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-filter text-muted me-2"
            viewBox="0 0 16 16"
          >
            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
          </svg>
          Tous les filtres
        </h4>
      </Card.Header>

      <Card.Body className="border-top py-3">
        <Link
          to="#"
          onClick={() => setOpenLocation(!openLocation)}
          aria-controls="locations"
          aria-expanded={openLocation}
          className="fs-5 text-dark fw-semi-bold"
          data-bs-toggle="collapse"
        >
          Lieux
          <span className="float-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </span>
        </Link>
        <Collapse in={openLocation}>
  <div id="locations">
    <div className="input-group">
      <CountryDropdown
        value={selectedFilters.jobLocation}
        onChange={(val) => handleLocationChange(val)}
        className="form-control"
        defaultOptionLabel="Sélectionner un pays" // Set the French placeholder here
      />
    </div>
  </div>
</Collapse>
      </Card.Body>

      <Card.Body className="py-3">
        <Link
          to="#"
          onClick={() => setOpenDepartments(!openDepartments)}
          aria-controls="job Designation"
          aria-expanded={openDepartments}
          className="fs-5 text-dark fw-semi-bold"
          data-bs-toggle="collapse"
        >
          Désignation de l’entreprise
          <span className="float-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </span>
        </Link>
        <Collapse in={openDepartments}>
          <div id="job Designation">
            <div className="mt-3">
              <Form.Select
                onChange={(e) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    jobDesignation: e.target.value,
                  })
                }
              >
                <option>Sélectionnez la désignation de l’entreprise</option>
                {jobDesignation.map((jobDesignation, index) => (
                  <option key={index}>{jobDesignation.label}</option>
                ))}
              </Form.Select>
            </div>
          </div>
        </Collapse>
      </Card.Body>

      <Card.Body className="border-top py-3">
        <Link
          to="#"
          onClick={() => setOpenSalary(!openSalary)}
          aria-controls="Job Type"
          aria-expanded={openSalary}
          className="fs-5 text-dark fw-semi-bold"
          data-bs-toggle="collapse"
        >
          Type d’entreprise
          <span className="float-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </span>
        </Link>
        <Collapse in={openSalary}>
          <div id="Job Type">
            <Form>
              {/* Checkboxes for Levels */}
              {jobType.map((jobType, index) => (
                <Form.Check
                  type="checkbox"
                  className="mb-1"
                  label={capitalizeFirstLetter(jobType)}
                  value={jobType}
                  onChange={handleJobTypeChange}
                  key={index}
                />
              ))}
            </Form>
          </div>
        </Collapse>
      </Card.Body>

      <Card.Body className="py-3 d-grid">
        <Button
          variant="primary"
          onClick={() => {
            handleSubmit();
            SearchActivity();
          }}
          disabled={loading}
          style={{ opacity: loading ? ".7" : "1" }}
        >
          {loading ? "Processing" : "Appliquer des filtres"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default companyFilters;
