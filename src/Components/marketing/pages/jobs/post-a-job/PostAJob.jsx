import React, { useState } from "react";
import {
  ButtonGroup,
  ToggleButton,
  Col,
  Row,
  Form,
  Container,
  Button,
} from "react-bootstrap";
import GKTagsInput from "../../../../../Components/elements/tags/GKTagsInput";
import { FormSelect } from "../../../../elements/form-select/FormSelect";
import axios from "axios";
import { useGlobalContext } from "../../../../../context/AuthContext";
import { showToast } from "../../../../Showtoast";
import { useNavigate } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const PostAJob = () => {
  const { userId } = useGlobalContext();
  const [tags, setTags] = useState({
    desiredCandidate: [],
    jobResponsibilities: [],
    jobPerksAndBenefits: [],
  });
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState("");
  const [radioValue, setRadioValue] = useState("0");
  const [jobTitle, setJobTitle] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobSalary, setJobSalary] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobRoles, setJobRoles] = useState("");
  const [jobFormat, setJobFormat] = useState("");
  const [jobSalaryFormat, setJobSalaryFormat] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [currency, setCurrency] = useState("");

  const handleTagAdd = (tag, category) => {
    setTags((prevTags) => ({
      ...prevTags,
      [category]: Array.isArray(prevTags[category]) ? [...prevTags[category], tag] : [tag],
    }));
  };

  const selectCountry = (val) => {
    setJobLocation(val);
  };

  const navigate = useNavigate();

  const handleTagRemove = (tag, category) => {
    setTags((prevTags) => ({
      ...prevTags,
      [category]: prevTags[category].filter((t) => t.name !== tag.name),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Remove the standalone "4" from jobExperience if it exists
      const filteredJobExperience = tags.jobExperience.filter((exp) => exp.name !== "4");
  
      // Create the new object for the years of experience input
      const yearsOfExperienceObj = { name: yearsOfExperience };
  
      // Concatenate the filtered job experience inputs with the years of experience input
      const allJobExperience = [...filteredJobExperience, yearsOfExperienceObj];
  
      const formattedTags = {
        desiredCandidate: tags.desiredCandidate.map((tag) => ({ name: tag.name })),
        jobResponsibilities: tags.jobResponsibilities.map((tag) => ({ name: tag.name })),
        jobPerksAndBenefits: tags.jobPerksAndBenefits.map((tag) => ({ name: tag.name })),
      };
  
      const response = await axios.post(
        "https://unleashified-backend.azurewebsites.net/api/v1/post-job",
        {
          jobPosterId: userId,
          jobTitle,
          desiredCandidate: formattedTags.desiredCandidate,
          jobRoles,
          jobExperience: allJobExperience, // Use the concatenated job experience array
          jobResponsibilities: formattedTags.jobResponsibilities,
          jobPerksAndBenefits: formattedTags.jobPerksAndBenefits,
          department,
          jobLocation,
          jobType: radioValue,
          jobSalary,
          jobDescription,
          deliveryDate,
          jobFormat,
          jobSalaryFormat,
          currency,
        }
      );
  
      console.log("Response:", response.data);
      navigate("/Providerdashboard");
      resetForm(); // Reset the form after successful submission
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };
  
     

  const resetForm = () => {
    setJobTitle("");
    setTags({
      desiredCandidate: [],
      jobResponsibilities: [],
      jobPerksAndBenefits: [],
    });
    setJobRoles("");
    setJobExperience("");
    setDepartment("");
    setJobLocation("");
    setRadioValue("0");
    setJobSalary("");
    setDeliveryDate("");
    setJobDescription("");
    setJobFormat("");
    setJobSalaryFormat("");
    setYearsOfExperience("");
    setCurrency("");
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

  const jobSalaryFormats = [
    { value: "Fixed", label: "Fixed" },
    { value: "Hourly", label: "Hourly" },
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
    { value: "Yearly", label: "Yearly" },
  ];
  const radios = [
    { name: "Full-Time", value: "Full-Time" },
    { name: "Part-Time", value: "Part-Time" },
    { name: "Freelance", value: "Freelance" },
    { name: "Contract", value: "Contract" },
  ];

  return (
    <section className="py-6 py-lg-12 bg-white">
      <Container>
        <Row>
          <Col md={12} lg={5}>
            <div className="mb-12">
              <h1 className="display-4 mb-3 fw-bold">Post a job today</h1>
              <p className="mb-0 lead">
                Ready to post a job for your company? Choose your job type below
                and fill all the job information
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={4} md={4} xs={12}>
            <div className="mb-4">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="currentColor"
                  className="bi bi-info-circle text-primary"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0
                8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    d="m8.93
                  6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738
                  3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252
                  1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275
                  0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0
                  1 1 0 0 1 2 0z"
                  />
                </svg>
              </div>
              <h3> Job information</h3>
              <p>
                Add Relevant Job Information so that the right candidate can
                apply for this job
              </p>
            </div>
          </Col>
          <Col lg={{ span: 7, offset: 1 }} md={8} xs={12}>
            <Form onSubmit={handleSubmit}>
              <Row>
                {/* Job Title */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="job-title">
                    Job title<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="job-title"
                    placeholder="Write  the Job Title"
                    required
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </Col>
                {/* Select Department */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="department">
                    Select Department<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as={FormSelect}
                    options={departments}
                    placeholder="Select Department"
                    defaultValue=""
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                  />
                </Col>

                <Col md={12} xs={12} className="mb-3">
                  {/* Job location */}
                  <Form.Label className="d-block">Job Format</Form.Label>
                  <Form.Check
                    type="radio"
                    name="job-format"
                    label="Onsite"
                    checked={jobFormat === "Onsite"}
                    onChange={() => setJobFormat("Onsite")}
                  />
                  <Form.Check
                    type="radio"
                    name="job-format"
                    label="Remote"
                    checked={jobFormat === "Remote"}
                    onChange={() => setJobFormat("Remote")}
                  />
                  <Form.Check
                    type="radio"
                    name="job-format"
                    label="Hybrid"
                    checked={jobFormat === "Hybrid"}
                    onChange={() => setJobFormat("Hybrid")}
                  />
                </Col>
                {/* Job Location */}
                <Col xs={12} className="mb-3">
                  {/* Company website */}
                  <Form.Label htmlFor="company-location">
                    Company Location<span className="text-danger">*</span>
                  </Form.Label>
                  <div className="input-group">
                    <CountryDropdown
                      value={jobLocation}
                      onChange={(val) => selectCountry(val)}
                      className="form-control"
                    />
                  </div>
                </Col>

                {/* Job Type */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label className="d-block">
                    Job Type<span className="text-danger">*</span>
                  </Form.Label>
                  <ButtonGroup>
                    {radios.map((radio, idx) => (
                      <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant="outline-primary"
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                      >
                        {radio.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                </Col>
                {/* Job Salary */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="job-salary">Job Salary</Form.Label>
                  <Form.Control
                    type="number"
                    id="job-salary"
                    placeholder="Enter job salary"
                    value={jobSalary}
                    onChange={(e) => setJobSalary(e.target.value)}
                  />
                </Col>

                {/* Select Job Format */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="jobSalaryFormat">
                    Job Salary Format<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as={FormSelect}
                    options={jobSalaryFormats}
                    placeholder="Select Salary price format"
                    defaultValue=""
                    value={jobSalaryFormat}
                    onChange={(e) => setJobSalaryFormat(e.target.value)}
                    required
                  />
                </Col>
                {/* Select Currency */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="currency">Currency</Form.Label>
                  <Form.Control
                    as="select"
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    required
                  >
                    <option value="">Select currency</option>
                    <option value="NGN">Naira</option>
                    <option value="EUR">Euros</option>
                    <option value="USD">Dollars</option>
                    <option value="GBP">Pounds</option>
                  </Form.Control>
                </Col>
                {/* Job Experience */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="job-experience">
                    Job Experience
                  </Form.Label>
                  <GKTagsInput
                    defaultTags={tags.jobExperience}
                    onAddTag={(tag) => handleTagAdd(tag, "jobExperience")}
                    onRemoveTag={(tag) => handleTagRemove(tag, "jobExperience")}
                  />
                </Col>

                {/* Years of Experience */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="years-of-experience">
                    Years of Experience
                  </Form.Label>
                  <Form.Control
                    as="select"
                    id="years-of-experience"
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                  >
                    <option value="">Select years of experience</option>
                    {[...Array(21)].map((_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                {/* Job Delivery */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="job-delivery">
                    Delivery (in day(s))
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="job-delivery"
                    placeholder="Enter delivery days"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                  />
                </Col>
                {/* Job Description */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="job-description">
                    Job Description<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    id="job-description"
                    placeholder="Write the Job description"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    required
                  />
                </Col>

                {/* Job Roles */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="job-roles">
                    Job Roles<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    id="job-roles"
                    placeholder="Write the Job Roles"
                    value={jobRoles}
                    onChange={(e) => setJobRoles(e.target.value)}
                    required
                  />
                </Col>
                {/* Job Responsibilities */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="jobResponsibilities">
                    Job Responsibilities
                  </Form.Label>
                  <GKTagsInput
                    defaultTags={tags.jobResponsibilities}
                    onAddTag={(tag) => handleTagAdd(tag, "jobResponsibilities")}
                    onRemoveTag={(tag) =>
                      handleTagRemove(tag, "jobResponsibilities")
                    }
                  />
                </Col>
                {/* Desired Candidate */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="desiredCandidate">
                    Desired Candidate Profile
                  </Form.Label>
                  <GKTagsInput
                    defaultTags={tags.desiredCandidate}
                    onAddTag={(tag) => handleTagAdd(tag, "desiredCandidate")}
                    onRemoveTag={(tag) =>
                      handleTagRemove(tag, "desiredCandidate")
                    }
                  />
                </Col>
                {/* Job Perks and Benefits */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="jobPerksAndBenefits">
                    Job Perks and Benefits
                  </Form.Label>
                  <GKTagsInput
                    defaultTags={tags.jobPerksAndBenefits}
                    onAddTag={(tag) => handleTagAdd(tag, "jobPerksAndBenefits")}
                    onRemoveTag={(tag) =>
                      handleTagRemove(tag, "jobPerksAndBenefits")
                    }
                  />
                </Col>
                <Col md={12} xs={12} className="mb-3">
                  <Button
                    variant="primary"
                    type="submit"
                    className="px-6"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Submit"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PostAJob;
