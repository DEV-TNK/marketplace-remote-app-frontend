import React, { useEffect, useState } from "react";
import { Col, Card, Collapse, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { showToast } from "../../../../Showtoast";
import JobListingGridviewCard from "../../../../../Components/marketing/common/cards/JobListingGridviewCard";

const JobFilters = ({ onFilterChange }) => {
  const [openLocation, setOpenLocation] = useState(true);
  const [openSalary, setOpenSalary] = useState(true);
  const [openDepartments, setOpenDepartments] = useState(true);
  const jobFormat = ["À distance", "sur site", "hybride"];
  const jobType = ["Temps partiel", "Contrat", "Plein temps", "Freelance"];
  const [selectedJobFormat, setSelectedJobFormat] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [email, setEmail] = useState(null);

  // Define state for selected filters
  const [selectedFilters, setSelectedFilters] = useState({
    department: "",
    jobLocation: "",
  });

  const handleLocationChange = (val) => {
    setSelectedFilters({ ...selectedFilters, jobLocation: val }); // Update jobLocation state
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    console.log("this is the filter page");
    try {
      const requestData = {
        department: [selectedFilters.department],
        jobLocation: [selectedFilters.jobLocation],
        jobFormat: selectedJobFormat.map((format) => format),
        jobType: selectedJobType.map((type) => type),
      };

      const response = await axios.post(
        "https://marketplacebackendas-test.azurewebsites.net/api/v1/seeker-serch-job",
        requestData
      );
      setLoading(false);

      // Pass selected filters to parent component
      onFilterChange(response.data.jobs);
      console.log("this is filter jobs", response.data.jobs);
      console.log("this is filter data", onFilterChange);
      showToast("Filters applied successfully");
    } catch (error) {
      setLoading(false);
      showToast(error.response.data.message);
    }
  };

  const handleJobFormatChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedJobFormat((prev) => [...prev, value]);
    } else {
      setSelectedJobFormat((prev) =>
        prev.filter((jobFormat) => jobFormat !== value)
      );
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

  // to create activities
  const SearchActivity = async () => {
    const userId = sessionStorage.getItem("UserId") || null;
    const userEmail = sessionStorage.getItem("email") || null;
    try {
      const response = await axios.post(
        "https://marketplacebackendas-test.azurewebsites.net/api/v1/create-activity",
        {
          UserAction: selectedFilters.department
            ? selectedFilters.department
            : selectedFilters.jobLocation,
          UserId: userId,
          UserEmail: userEmail,
          ActionType: "Job-Search",
        }
      );
      console.log("this is the service response", response.data);
    } catch (error) {
      console.log("error");
    }
  };

  // Dummy data for dropdowns
  const departments = [
    { value: "Graphisme et Design", label: "Graphisme et Design" },
    { value: "Marketing Numérique", label: "Marketing Numérique" },
    { value: "Vidéo et Animation", label: "Vidéo et Animation" },
    { value: "Musique et Audio", label: "Musique et Audio" },
    {
      value: "Programmation et Technologie",
      label: "Programmation et Technologie",
    },
    { value: "Développement Commercial", label: "Développement Commercial" },
    { value: "Photographie", label: "Photographie" },
    { value: "Restauration", label: "Restauration" },
    { value: "Style de Vie et Santé", label: "Style de Vie et Santé" },
    { value: "Création de Logos", label: "Création de Logos" },
    { value: "Développeur Mobile", label: "Développeur Mobile" },
    { value: "Analyse de Données", label: "Analyse de Données" },
    { value: "Responsable Produit", label: "Responsable Produit" },
    { value: "Design UI / UX", label: "Design UI / UX" },
    { value: "SEO", label: "SEO" },
    { value: "Finance", label: "Finance" },
    { value: "Projets de A à Z", label: "Projets de A à Z" },
    { value: "SEO", label: "SEO" },
  ];

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
          onClick={() => setOpenSalary(!openSalary)}
          aria-controls="Job Format"
          aria-expanded={openSalary}
          className="fs-5 text-dark fw-semi-bold"
          data-bs-toggle="collapse"
        >
          Format de l'offre
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
          <div id="Job Format">
            <Form>
              {/* Checkboxes for Levels */}
              {jobFormat.map((jobFormat, index) => (
                <Form.Check
                  type="checkbox"
                  className="mb-1"
                  label={capitalizeFirstLetter(jobFormat)}
                  value={jobFormat}
                  onChange={handleJobFormatChange}
                  key={index}
                />
              ))}
            </Form>
          </div>
        </Collapse>
      </Card.Body>
      <Card.Body className="py-3">
        <Link
          to="#"
          onClick={() => setOpenDepartments(!openDepartments)}
          aria-controls="departments"
          aria-expanded={openDepartments}
          className="fs-5 text-dark fw-semi-bold"
          data-bs-toggle="collapse"
        >
          Industrie
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
          <div id="departments">
            <div className="mt-3">
              <Form.Select
                onChange={(e) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    department: e.target.value,
                  })
                }
              >
                <option>Sélectionnez le secteur d’activité</option>
                {departments.map((department, index) => (
                  <option key={index}>{department.label}</option>
                ))}
              </Form.Select>
            </div>
          </div>
        </Collapse>
      </Card.Body>
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
                defaultOptionLabel="Sélectionner un pays" 
              />
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
          Type d'offre
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
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Processing" : "Appliquer des filtres"}{" "}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default JobFilters;
