// import node module libraries
import { useState } from "react";
import { Card, Collapse, Button, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { showToast } from "../../../../Showtoast";

const ServicesFilters = ({ onFilterChange }) => {
  const [openPriceFormat, setOpenPriceFormat] = useState(true);
  const [openDepartments, setOpenDepartments] = useState(true);
  const [openServiceFormat, setOpenServiceFormat] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    departments: [],
    priceFormat: [],
    serviceFormat: [],
  });
  const [loading, setLoading] = useState(false);
  const [Bloading, BsetLoading] = useState(false);


  const handleFilterSubmit = async () => {
    setLoading(true);
    try {
      const requestData = {
      department: selectedFilters.departments ? [selectedFilters.departments] : [],
      jobSalaryFormat: selectedFilters.priceFormat ? [selectedFilters.priceFormat] : [],
      serviceType: selectedFilters.serviceFormat ? [selectedFilters.serviceFormat] : [],
      };
      console.log("Request Data:", requestData);
      BsetLoading(true);
      const response = await axios.post(
        "https://unleashified-backend.azurewebsites.net/api/v1/search-services",
        requestData
      );
      console.log("Filtered data:", response.data);
      showToast("Filter Successfully");
      onFilterChange(response.data);
      // Process filtered data as needed (e.g., update state with filtered results)
    } catch (error) {
      console.error("Error filtering services:", error);
    } finally {
      setLoading(false);
      BsetLoading(false);
    }
  };

  const SearchActivity = async () => {
    const userId = sessionStorage.getItem("UserId") || null;
    const userEmail = sessionStorage.getItem("email") || null;
    try {
      const response = await axios.post(
        "https://unleashified-backend.azurewebsites.net/api/v1/create-activity",
        {
          UserAction: selectedFilters.department
            ? selectedFilters.department.toString()
            : null,
          UserId: userId,
          UserEmail: userEmail,
          ActionType: "Service-Search",
        }
      );
      console.log("this is the service response", response.data);
    } catch (error) {
      console.log("error");
    }
  };

  const departments = [
    { value: "Graphics and Design", label: "Graphics and Design" },
    { value: "Digital Marketing", label: "Digital Marketing" },
    { value: "Video and Animation", label: "Video and Animation" },
    { value: "Music and Audio", label: "Music and Audio" },
    { value: "Programming and Tech", label: "Programming and Tech" },
    { value: "Business Development", label: "Business Development" },
    { value: "Photography", label: "Photography" },
    { value: "Catering", label: "Catering" },
    { value: "Lifestyle and Health", label: "Lifestyle and Health" },
    { value: "Logo Making", label: "Logo Making" },
    { value: "Mobile Developer", label: "Mobile Developer" },
    { value: "Data Analytics", label: "Data Analytics" },
    { value: "Product Manager", label: "Product Manager" },
    { value: "UI / UX Design", label: "UI / UX Design" },
    { value: "SEO", label: "SEO" },
    { value: "Finance", label: "Finance" },
    { value: "End-to-End Projects", label: "End-to-End Projects" },
    { value: "SEO", label: "SEO" },
  ];
  const priceFormat = [
    { value: "Fixed", label: "Fixed" },
    { value: "Hourly", label: "Hourly" },
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
    { value: "Yearly", label: "Yearly" },
  ];

  const serviceFormat = [
    { value: "Remote", label: "Remote" },
    { value: "Onsite", label: "Onsite" },
    { value: "Hybrid", label: "Hybrid" },
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
          All Filters
        </h4>
      </Card.Header>
      <Card.Body className="py-3">
        <Link
          to="#"
          onClick={() => setOpenDepartments(!openDepartments)}
          aria-controls="departments"
          aria-expanded={openDepartments}
          className="fs-5 text-dark fw-semi-bold"
          data-bs-toggle="collapse"
        >
          Industry
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
                    departments: e.target.value,
                  })
                }
              >
                <option>Select Department</option>
                {departments.map((department, index) => (
                  <option key={index}>{department.label}</option>
                ))}
              </Form.Select>
            </div>
          </div>
        </Collapse>
      </Card.Body>
      <Card.Body className="py-3">
        <Link
          to="#"
          onClick={() => setOpenPriceFormat(!openPriceFormat)}
          aria-controls="priceFormat"
          aria-expanded={openPriceFormat}
          className="fs-5 text-dark fw-semi-bold"
          data-bs-toggle="collapse"
        >
          Price Format
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
        <Collapse in={openPriceFormat}>
          <div id="priceFormat">
            <div className="mt-3">
              <Form.Select
                onChange={(e) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    priceFormat: e.target.value,
                  })
                }
              >
                <option>Select Price Format</option>
                {priceFormat.map((priceFormat, index) => (
                  <option key={index}>{priceFormat.label}</option>
                ))}
              </Form.Select>
            </div>
          </div>
        </Collapse>
      </Card.Body>
      <Card.Body className="py-3">
        <Link
          to="#"
          onClick={() => setOpenServiceFormat(!openServiceFormat)}
          aria-controls="serviceFormat"
          aria-expanded={openServiceFormat}
          className="fs-5 text-dark fw-semi-bold"
          data-bs-toggle="collapse"
        >
          Service Format
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
        <Collapse in={openServiceFormat}>
          <div id="serviceFormat">
            <div className="mt-3">
              <Form.Select
                onChange={(e) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    serviceFormat: e.target.value ,
                  })
                }
              >
                <option>Select Service Format</option>
                {serviceFormat.map((serviceFormat, index) => (
                  <option key={index}>{serviceFormat.label}</option>
                ))}
              </Form.Select>
            </div>
          </div>
        </Collapse>
      </Card.Body>
      <Card.Body className="py-3 d-grid">
        <Button
          variant="primary"
          onClick={() => {
            handleFilterSubmit();
            SearchActivity();
          }}
        >
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
          ) : null}
          {loading ? "Applying Filter..." : "Apply Filters"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ServicesFilters;
