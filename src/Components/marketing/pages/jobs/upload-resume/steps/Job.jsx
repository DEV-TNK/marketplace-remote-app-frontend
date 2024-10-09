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
  InputGroup,
} from "react-bootstrap";
import { FormSelect } from "../../../../../../Components/elements/form-select/FormSelect";
import axios from "axios";
import { showToast } from "../../../../../../Components/Showtoast";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../../../../context/AuthContext";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import AxiosInterceptor from "../../../../../AxiosInterceptor";

const Job = (props) => {
  const { userId } = useGlobalContext();
  const authFetch = AxiosInterceptor()
  const { previous } = props;
  const [headline, setHeadline] = useState("");
  const [radioValue, setRadioValue] = useState("0");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
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
    { label: "Temps plein", value: "Full-Time" },
    { label: "Temps partiel", value: "Part-Time" },
    { label: "Freelance", value: "Freelance" },
    { label: "Contractuel", value: "Contract" },
  ];

  const availabilitiesToJoin = [
    { value: "Immédiatement", label: "Immediately" },
    { value: " En quelques heures", label: "In few hours" },
    { value: " Un jour", label: "A day" },
    { value: "3 jours", label: "3 days" },
    { value: "7 jours", label: "7 days" },
    { value: "14 jours", label: "14 days" },
    { value: "1 month", label: "1 mois" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !headline ||
      !radioValue ||
      !jobType ||
      !availabilityToJoin ||
      !document.getElementById("resume").files[0]
    ) {
      showToast("Please fill all Jobs fields.");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("firstName", sessionStorage.getItem("firstName"));
    formData.append("lastName", sessionStorage.getItem("lastName"));
    const middleName = sessionStorage.getItem("middleName");

    // Check if middleName is empty, if yes, set it to "not available"
    const middleNameToAppend = middleName ? middleName : "not available";
    formData.append("middleName", middleNameToAppend);
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
    const school = sessionStorage.getItem("school");
    const schoolToAppend = school ? school : "not available";
    formData.append("school", schoolToAppend);
    const degree = sessionStorage.getItem("degree");
    const degreeToAppend = degree ? degree : "not available";
    formData.append("degree", degreeToAppend);
    const study = sessionStorage.getItem("study");
    const studyToAppend = study ? study : "not available";
    formData.append("study", studyToAppend);
    const studyType = sessionStorage.getItem("studyType");
    const studyTypeToAppend = studyType ? studyType : "not available";
    formData.append("studyType", studyTypeToAppend);
    const startYear = sessionStorage.getItem("startYear");
    const startYearToAppend = startYear ? startYear : "not available";
    formData.append("startYear", startYearToAppend);
    const endYear = sessionStorage.getItem("endYear");
    const endYearToAppend = endYear ? endYear : "not available";
    formData.append("endYear", endYearToAppend);

    formData.append("resume", document.getElementById("resume").files[0]);
    formData.append("headline", headline);
    formData.append("workType", jobType);
    formData.append("workLocation", selectedFilters.jobLocation);

    formData.append("workAvailability", availabilityToJoin);
    formData.append("userId", userId);

    authFetch
      .post(
        "https://marketplacebackendas-test.azurewebsites.net/api/v1/seeker-resume",
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
        sessionStorage.removeItem("confirmEmailUpdates");

        navigate("/JobSeeker/interest-page");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
        showToast(error.response.data.message);
      });
  };

  return (
    <Form encType="multipart/form-data">
      <Card className="card-bordered shadow-none mb-3">
        <Card.Body className="p-6">
          <div className="mb-4">
            <h2 className="mb-0">Quel type d’emploi recherchez-vous ?</h2>
            <span>
            Ajoutez les détails pour si vous recherchez une opportunité future.
            </span>
          </div>
          <Row>
            <Col xs={12} className="mb-3">
              <Form.Label htmlFor="resume-headline">
              Titre du CV<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="resume-headline"
                placeholder="Ex:Figma Designe"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                required
              />
            </Col>
            <Col md={12} xs={12} className="mb-3">
              <Form.Label>
              Type d’emploi<span className="text-danger">*</span>
              </Form.Label>
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
              <Form.Label>Temps plein</Form.Label>
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
              <Form.Label>
              Disponibilité pour rejoindre<span className="text-danger">*</span>
              </Form.Label>
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
                CV<span className="text-danger">*</span>
              </Form.Label>
              <Form.Group className="mb-1 input-group">
                <Form.Control id="resume" type="file" accept=".pdf" />{" "}
                {/* Add accept=".pdf" */}
                <Form.Label htmlFor="resume" className="input-group-text mb-0">
                Télécharger
                </Form.Label>
                <Form.Text className="fs-6">
                fichiers PDF uniquement | Max. : 2 Mo. Les recruteurs privilégient les candidats ayant un CV bien structuré
                </Form.Text>
              </Form.Group>
            </Col>

            {/* <Col md={12} xs={12} className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  id="profile-picture"
                  type="file"
                  name="profile-picture"
                  onChange={(e) =>
                    updateFormData({ profilePicture: e.target.files[0] })
                  }
                />
                <Form.Label
                  htmlFor="profile-picture"
                  className="input-group-text mb-0"
                >
                  Upload
                </Form.Label>
              </InputGroup>
              <Form.Text className="fs-6">
                Profile picture should be a PNG or JPG file of 500 x 500 pixels
              </Form.Text>
            </Col> */}

            <Col
              md={12}
              xs={12}
              className="d-flex justify-content-between mb-3"
            >
              <Button variant="outline-secondary" onClick={previous}>
              Retournez à l’arrière
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Processing..." : " soumettez la demande"}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Form>
  );
};

export default Job;
