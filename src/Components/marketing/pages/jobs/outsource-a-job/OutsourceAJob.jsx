import React, { useState } from "react";
import {
  ButtonGroup,
  ToggleButton,
  Col,
  Row,
  Form,
  Container,
  Button,
  Modal,
} from "react-bootstrap";
import GKTagsInput from "../../../../../Components/elements/tags/GKTagsInput";
import { FormSelect } from "../../../../elements/form-select/FormSelect";
import axios from "axios";
import { useGlobalContext } from "../../../../../context/AuthContext";
import { showToast } from "../../../../Showtoast";
import { useNavigate } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const OutsourceAJobs = () => {
  const { userId } = useGlobalContext();
  const [tags, setTags] = useState({
    desiredCandidate: [],
    // jobResponsibilities: [],
  });
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState("");
  const [radioValue, setRadioValue] = useState("0");
  const [jobTitle, setJobTitle] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobSalary, setJobSalary] = useState("");
  const [numberOfPerson, setNumberOfPerson] = useState("");
  //   const [deliveryDate, setDeliveryDate] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobRoles, setJobRoles] = useState("");
  const [jobFormat, setJobFormat] = useState("");
  const [jobSalaryFormat, setJobSalaryFormat] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [currency, setCurrency] = useState("");
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [jobsList, setJobsList] = useState([]); // State for list of jobs
  const [editIndex, setEditIndex] = useState(null); // State variable to track the index of the form being edited
  const [disableCurrency, setDisableCurrency] = useState(false); // State variable to track whether currency selection should be disabled
  const [firstJobCurrency, setFirstJobCurrency] = useState("");

  const handleTagAdd = (tag, category) => {
    setTags((prevTags) => ({
      ...prevTags,
      [category]: Array.isArray(prevTags[category])
        ? [...prevTags[category], tag]
        : [tag],
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteJob = (index) => {
    const updatedJobsList = [...jobsList];
    updatedJobsList.splice(index, 1); // Remove the job at the specified index
    setJobsList(updatedJobsList); // Update the state with the modified jobs list
  };

  const handleDynamicFormAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Convert years of experience to a number
      const yearsOfExperienceNum = parseInt(yearsOfExperience);

      const formattedTags = {
        desiredCandidate: tags.desiredCandidate.map((tag) => ({
          name: tag.name,
        })),
      };

      if (editIndex !== null) {
        // Update the job details in the jobs list if editing
        const updatedJobsList = [...jobsList];
        updatedJobsList[editIndex] = {
          jobTitle,
          desiredCandidate: formattedTags.desiredCandidate,
          jobRoles,
          numberOfPerson,
          jobExperience,
          department,
          jobLocation,
          jobType: radioValue,
          jobSalary,
          jobDescription,
          yearsOfExperience: yearsOfExperienceNum,
          jobFormat,
          jobSalaryFormat,
          currency,
        };
        setJobsList(updatedJobsList);

      } else {
        // Add the submitted job details to the jobs list if adding a new job
        const newJob = {
          jobTitle,
          desiredCandidate: formattedTags.desiredCandidate,
          jobRoles,
          numberOfPerson,
          jobExperience,
          department,
          jobLocation,
          jobType: radioValue,
          jobSalary,
          jobDescription,
          jobFormat,
          yearsOfExperience: yearsOfExperienceNum,
          jobSalaryFormat,
          // currency,
          currency: firstJobCurrency || currency,
        };
        // set currency to the first job own
        if (jobsList.length === 0) {
          setFirstJobCurrency(currency);
          setDisableCurrency(true);
        }
        setJobsList((prevJobsList) => [...prevJobsList, newJob]);
      }

      // Reset editIndex to null to indicate adding a new form
      setEditIndex(null);

      resetForm(); // Reset the form after successful submission
      handleCloseModal();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedJobs = jobsList.map((job) => {
        const formattedTags = {
          desiredCandidate: job.desiredCandidate.map((tag) => ({
            name: tag.name,
          })),
        };

        // Convert years of experience to a number
        const yearsOfExperienceNum = parseInt(job.yearsOfExperience);

        return {
          title: job.jobTitle,
          desiredCandidate: formattedTags.desiredCandidate,
          roles: job.jobRoles,
          numberOfPerson: job.numberOfPerson,
          experience: job.jobExperience,
          department: job.department,
          location: job.jobLocation,
          type: job.jobType,
          price: job.jobSalary,
          description: job.jobDescription,
          format: job.jobFormat,
          salaryFormat: job.jobSalaryFormat,
          currency: job.currency,
          yearsOfExperience: yearsOfExperienceNum,
        };
      });

      const requestData = {
        providerId: userId,
        jobs: formattedJobs,
      };

      const response = await axios.post(
        "https://unleashified-backend.azurewebsites.net/api/v1/create-outsource-jobs",
        requestData
      );

      console.log("Response:", response.data);
      setFirstJobCurrency("");
      setDisableCurrency(false);

      navigate("/Providerdashboard/Outsource-Jobs");
      showToast(response.data.message);
      resetForm(); // Reset the form after successful submission
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  const handleEditJob = (index) => {
    const jobToEdit = jobsList[index];
    setEditIndex(index); // Set the index of the form being edited

    // Populate form fields with job details for editing
    setJobTitle(jobToEdit.jobTitle);
    setTags({
      desiredCandidate: jobToEdit.desiredCandidate,
    });
    setDepartment(jobToEdit.department);
    setJobRoles(jobToEdit.jobRoles);
    setNumberOfPerson(jobToEdit.numberOfPerson);
    setJobExperience(jobToEdit.jobExperience);
    setJobLocation(jobToEdit.jobLocation);
    setRadioValue(jobToEdit.jobType);
    setJobSalary(jobToEdit.jobSalary);
    setJobDescription(jobToEdit.jobDescription);
    setJobFormat(jobToEdit.jobFormat);
    setJobSalaryFormat(jobToEdit.jobSalaryFormat);
    setCurrency(jobToEdit.currency);
    setYearsOfExperience(jobToEdit.yearsOfExperience);

    // Show the modal for editing
    setShowModal(true);

  };

  const resetForm = () => {
    setJobTitle("");
    setTags({
      desiredCandidate: [],
    });
    setJobRoles("");
    setJobExperience("");
    setDepartment("");
    setJobLocation("");
    setRadioValue("0");
    setJobSalary("");
    setNumberOfPerson("");
    setJobDescription("");
    setJobFormat("");
    setJobSalaryFormat("");
    setYearsOfExperience("");
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
          <Row>
            <Col md={12} lg={5}>
              <div className="mb-12">
                <h1 className="display-4 mb-3 fw-bold">
                  Outsource a job today
                </h1>
                <p className="mb-0 lead">
                  Ready to outsource a job for your company? Fill the job
                  positions below to kickstart the process
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
                  Add as many Job as needed for your organization or individual
                  need&rsquo;s
                </p>
                <p>
                  <strong>Note:</strong> You can only pay in one currency for
                  all jobs added at a time. <br /> To pay in another currency,
                  submit and create another request
                </p>
              </div>
            </Col>
            <Row>
              {jobsList.map((job, index) => (
                <Col key={index} lg={6} md={6} xs={12} className="mb-4">
                  <div className="border rounded p-4 shadow position-relative">
                    <h5 className="mb-2 text-3xl">
                      <u>JOB DETAILS</u>
                    </h5>
                    <p>Job Title: {job.jobTitle}</p>
                    <p>Department: {job.department}</p>
                    <p>
                      Price(per person): {job.jobSalary} <b>{job.currency}</b>
                    </p>
                    <p>
                      Description:{" "}
                      {job.jobDescription.length > 50
                        ? job.jobDescription.substring(0, 50) + "..."
                        : job.jobDescription}
                    </p>

                    {/* Edit button */}
                    <Button
                      variant="secondary"
                      onClick={() => handleEditJob(index)}
                    >
                      Edit
                    </Button>

                    {/* Delete button */}
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteJob(index)}
                      className="position-absolute bottom-6 end-0"
                      style={{ marginRight: "20px" }}
                    >
                      Delete
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          </Row>
          <Row lg={4} md={4} xs={12}>
            <div className="w-full">
              {/* Button to trigger modal */}
              <Button variant="primary" onClick={() => setShowModal(true)}>
                Add Jobs
              </Button>
              {jobsList.length > 0 && (
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{ marginRight: "80px", opacity: loading ? ".7" : "1" }}
                  className="position-absolute bottom-6 end-0"
                >
                  {loading ? "Processing" : "Submit"}
                </Button>
              )}
            </div>
          </Row>

          {/* Modal */}
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            backdrop="static"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Outsource a Job</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
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
                      as="select"
                      id="department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept, index) => (
                        <option key={index} value={dept.value}>
                          {dept.label}
                        </option>
                      ))}
                    </Form.Control>
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
                    <Form.Label htmlFor="job-salary">
                      Job Price <em>(per person)</em>
                    </Form.Label>
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
                      as="select"
                      id="jobSalaryFormat"
                      value={jobSalaryFormat}
                      onChange={(e) => setJobSalaryFormat(e.target.value)}
                      required
                    >
                      <option value="">Select Salary price format</option>
                      {jobSalaryFormats.map((format, index) => (
                        <option key={index} value={format.value}>
                          {format.label}
                        </option>
                      ))}
                    </Form.Control>
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
                      disabled={disableCurrency} // Disable currency selection based on state
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
                    <Form.Control
                      type="text"
                      id="job-experience"
                      placeholder="Enter job experience"
                      value={jobExperience}
                      onChange={(e) => setJobExperience(e.target.value)}
                      required
                    />
                  </Col>

                  {/* Number of person */}
                  <Col md={12} xs={12} className="mb-3">
                    <Form.Label htmlFor="number-of-person">
                      Number of Person
                    </Form.Label>
                    <Form.Control
                      type="number"
                      id="number-of-person"
                      placeholder="Enter number of person"
                      value={numberOfPerson}
                      onChange={(e) => setNumberOfPerson(e.target.value)}
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
                      <option key={i} value={i}> {/* Convert value to string */}
                        {i}
                      </option>
                    ))}
                  </Form.Control>
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
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button
                variant="primary"
                disabled={loading}
                onClick={handleDynamicFormAdd}
              >
                {loading ? "Loading..." : "Add"}
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
      </Container>
    </section>
  );
};

export default OutsourceAJobs;
