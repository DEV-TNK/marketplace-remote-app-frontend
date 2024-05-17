import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Form,
  Button,
  Collapse,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { FormSelect } from "../../../../../../Components/elements/form-select/FormSelect";
import axios from "axios";
import { showToast } from "../../../../../../Components/Showtoast";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../../../../context/AuthContext";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const Job = (props) => {
  const { userId } = useGlobalContext();
  const { previous, data } = props;
  const [headline, setHeadline] = useState(data.headline || "");
  const [radioValue, setRadioValue] = useState(0);
  const [jobType, setJobType] = useState(data.workType || "");
  // const [location, setLocation] = useState(data.workLocation || "");
  const [availabilityToJoin, setAvailabilityToJoin] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState({
    jobLocation: "", // Renamed from 'location'
    jobDesignation: "",
  });

  const handleLocationChange = (val) => {
    setSelectedFilters({ ...selectedFilters, jobLocation: val });
  };

  const jobTypes = [
    { label: "Full-Time", value: "Full-Time" },
    { label: "Part-Time", value: "Part-Time" },
    { label: "Freelance", value: "Freelance" },
    { label: "Contract", value: "Contract" },
  ];

  const availabilitiesToJoin = [
    { value: "Immediately", label: "Immediately" },
    { value: "In few hours", label: "In few hours" },
    { value: "A day", label: "A day" },
    { value: "3 days", label: "3 days" },
    { value: "7 days", label: "7 days" },
    { value: "14 days", label: "14 days" },
    { value: "1 month", label: "1 month" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("firstName", sessionStorage.getItem("firstName"));
    formData.append("lastName", sessionStorage.getItem("lastName"));
    formData.append("middleName", sessionStorage.getItem("middleName"));
    formData.append("email", sessionStorage.getItem("email"));
    formData.append("contact", sessionStorage.getItem("contact"));
    formData.append("gender", sessionStorage.getItem("gender"));

    // Parse employmentData as an object
    const employmentData =
      JSON.parse(sessionStorage.getItem("employmentData")) || {};

    formData.append("salary", employmentData.salary || "nil");
    formData.append("companyAddress", employmentData.companyAddress || "nil");
    formData.append("companyCity", employmentData.companyCity || "nil");
    formData.append("companyCountry", employmentData.companyCountry || "nil");
    formData.append("companyName", employmentData.companyName || "nil");
    formData.append("companyState", employmentData.companyState || "nil");
    formData.append("dateOfJoining", employmentData.dateOfJoining || "nil");
    formData.append("dateOfLeaving", employmentData.dateOfLeaving || "nil");
    formData.append("jobTitle", employmentData.jobTitle || "nil");
    formData.append("jobType", employmentData.jobType || "nil");

    formData.append("school", sessionStorage.getItem("school"));
    formData.append("degree", sessionStorage.getItem("degree"));
    formData.append("study", sessionStorage.getItem("study"));
    formData.append("studyType", sessionStorage.getItem("studyType"));
    formData.append("startYear", sessionStorage.getItem("startYear"));
    formData.append("endYear", sessionStorage.getItem("endYear"));

    formData.append("resume", document.getElementById("resume").files[0]);
    formData.append("headline", headline);
    formData.append("workType", jobType);
    formData.append("workLocation", selectedFilters.jobLocation);

    formData.append("workAvailability", availabilityToJoin);
    formData.append("userId", userId);

    axios
      .post(
        "https://unleashified-backend.azurewebsites.net/api/v1/seeker-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        console.log("Response from API:", response.data);
        showToast(response.data.message);
        sessionStorage.removeItem("firstName");
        sessionStorage.removeItem("lastName");
        sessionStorage.removeItem("middleName");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("contact");
        sessionStorage.removeItem("gender");
        sessionStorage.removeItem("employmentData");
        sessionStorage.removeItem("school");
        sessionStorage.removeItem("degree");
        sessionStorage.removeItem("study");
        sessionStorage.removeItem("studyType");
        sessionStorage.removeItem("startYear");
        sessionStorage.removeItem("endYear");

        navigate("/JobSeekerdashboard");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
        showToast(error.response.data.message);
        navigate("/JobSeekerdashboard");
      });
  };

  return (
    <Form encType="multipart/form-data">
      <Card className="card-bordered shadow-none mb-3">
        <Card.Body className="p-6">
          <div className="mb-4">
            <h2 className="mb-0">What kind of job are you looking for?</h2>
            <span>
              Add the details for are you looking for future opportunity.
            </span>
          </div>
          <Row>
            <Col xs={12} className="mb-3">
              <Form.Label htmlFor="resume-headline">Resume Headline</Form.Label>
              <Form.Control
                type="text"
                id="resume-headline"
                placeholder="Ex:Figma Designe"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
            </Col>
            <Col md={12} xs={12} className="mb-3">
              <Form.Label>Job Type</Form.Label>
              <Form.Control
                as={FormSelect}
                options={jobTypes}
                placeholder="Select"
                defaultselected=""
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                required
              />
            </Col>
            <Col md={12} xs={12} className="mb-3">
              <Form.Label>Location</Form.Label>
              <Collapse in={true}>
                <div id="locations">
                  <div className="input-group">
                    <CountryDropdown
                      value={selectedFilters.jobLocation}
                      onChange={(val) => handleLocationChange(val)}
                      className="form-control"
                    />
                  </div>
                </div>
              </Collapse>
            </Col>
            <Col md={12} xs={12} className="mb-3">
              <Form.Label>Availability to Join</Form.Label>
              <Form.Control
                as={FormSelect}
                options={availabilitiesToJoin}
                placeholder="Select"
                defaultselected=""
                value={availabilityToJoin}
                onChange={(e) => setAvailabilityToJoin(e.target.value)}
                required
              />
            </Col>
            <Col md={12} xs={12} className="mb-4">
              <Form.Label>
                Resume<span className="text-danger">*</span>
              </Form.Label>
              <Form.Group className="mb-1 input-group">
                <Form.Control id="resume" type="file" accept=".pdf" />{" "}
                {/* Add accept=".pdf" */}
                <Form.Label htmlFor="resume" className="input-group-text mb-0">
                  Upload
                </Form.Label>
                <Form.Text className="fs-6">
                  PDF files only | Max: 2 MB. Recruiters give first preference
                  to candidates with a good and well-structured resume.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col
              md={12}
              xs={12}
              className="d-md-flex justify-content-between mb-3"
            >
              <Button variant="outline-secondary" onClick={previous}>
                Go to Back
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Processing..." : "Submit Application"}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Form>
  );
};

export default Job;
