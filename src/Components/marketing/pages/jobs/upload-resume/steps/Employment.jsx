import React, { useEffect, useState } from "react";
import { Form, Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import { FormSelect } from "../../../../../../Components/elements/form-select/FormSelect";
import { FlatPickr } from "../../../../../../Components/elements/flat-pickr/FlatPickr";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const Employment = (props) => {
  const { next, previous } = props;
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobType: "",
    companyName: "",
    companyAddress: "",
    companyCity: "",
    companyCountry: "",
    companyState: "",
    dateOfJoining: new Date(),
    dateOfLeaving: new Date(),
    salary: "",
  });

  const selectCountry = (val) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      companyCountry: val,
    }));
  };

  const selectRegion = (val) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      companyState: val,
    }));
  };

  const radios = [
    { name: "Full-Time", value: "Full-Time" },
    { name: "Part-Time", value: "Part-Time" },
    { name: "Freelance", value: "Freelance" },
    { name: "Contract", value: "Contract" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveAndContinue = () => {
    sessionStorage.setItem("employmentData", JSON.stringify(formData));
    next();
  };
  const handleDateOfJoiningChange = (selectedDates) => {
    const selectedDate = selectedDates[0];
    console.log("Selected Date of Joining:", selectedDate); // Log the selected date
    const formattedDate = selectedDate
      ? selectedDate.toISOString().split("T")[0]
      : ""; // Convert to ISO string (YYYY-MM-DD)
    console.log("Formatted Date of Joining:", formattedDate); // Log the formatted date
    setFormData((prevData) => ({
      ...prevData,
      dateOfJoining: formattedDate,
    }));
  };

  useEffect(() => {
    const employmentDataString = sessionStorage.getItem("employmentData");
    if (employmentDataString) {
      const employmentData = JSON.parse(employmentDataString);
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...employmentData, // Merge all fields from employmentData into formData
      }));
    }
  }, []);

  const handleDateOfLeavingChange = (selectedDates) => {
    const selectedDate = selectedDates[0];
    console.log("Selected Date of Relieving:", selectedDate); // Log the selected date
    const formattedDate = selectedDate
      ? selectedDate.toISOString().split("T")[0]
      : ""; // Convert to ISO string (YYYY-MM-DD)
    console.log("Formatted Date of Relieving:", formattedDate); // Log the formatted date
    setFormData((prevData) => ({
      ...prevData,
      dateOfLeaving: formattedDate,
    }));
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="jobTitle">Job title</Form.Label>
        <Form.Control
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={formData.jobTitle}
          placeholder="Write the Job Title"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="d-block">Job type</Form.Label>
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant="outline-primary"
              name="jobType"
              value={radio.value}
              checked={formData.jobType === radio.value}
              onChange={handleChange}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="companyName">Company Name</Form.Label>
        <Form.Control
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          placeholder="Company Name"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="companyAddress">Company Address</Form.Label>
        <Form.Control
          type="text"
          id="companyAddress"
          name="companyAddress"
          value={formData.companyAddress}
          placeholder="Company Address"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="companyCity">Company City</Form.Label>
        <Form.Control
          type="text"
          id="companyCity"
          name="companyCity"
          value={formData.companyCity}
          placeholder="Company City"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="companyCountry">Company Country</Form.Label>
        <div className="input-group">
          <CountryDropdown
            value={formData.companyCountry}
            onChange={(val) => selectCountry(val)}
            className="form-control" // Apply form-control class directly to CountryDropdown
          />
        </div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Company State</Form.Label>
        <div className="input-group">
          <RegionDropdown
            country={formData.companyCountry}
            value={formData.companyState}
            onChange={(val) => selectRegion(val)}
            className="form-control"
          />
        </div>
        {/* <Form.Control
          as={FormSelect}
          options={states}
          placeholder="States"
          defaultselected=""
          value={formData.companyState}
          onChange={handleChange}
          name="companyState"
        /> */}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="dateOfJoining">Date of Joining</Form.Label>
        <FlatPickr
          value={formData.dateOfJoining}
          placeholder="Date of Joining"
          onChange={handleDateOfJoiningChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="dateOfRelieving">Date of relieving</Form.Label>
        <FlatPickr
          value={formData.dateOfLeaving}
          placeholder="Date of relieving"
          onChange={handleDateOfLeavingChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="salary">Annual Salary</Form.Label>
        <Form.Control
          type="text"
          id="salary"
          name="salary"
          value={formData.salary}
          placeholder="Eg. 1,000,000"
          onChange={handleChange}
        />
      </Form.Group>
      <div className="d-md-flex justify-content-between mb-3">
        <Button variant="outline-secondary" onClick={previous}>
          Previous
        </Button>
        <div className="mt-2 mt-md-0 d-flex justify-content-between">
          <Button variant="outline-secondary" className="me-2" onClick={next}>
            Skip
          </Button>
          <Button variant="primary" onClick={handleSaveAndContinue}>
            Save and Continue
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Employment;
