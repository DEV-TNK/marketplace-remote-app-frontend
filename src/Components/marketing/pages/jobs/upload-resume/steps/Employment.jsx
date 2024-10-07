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
    { name: " Temps plein", value: "Full-Time" },
    { name: " Temps partiel", value: "Part-Time" },
    { name: "Freelance", value: "Freelance" },
    { name: "Contrat", value: "Contract" },
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
        <Form.Label htmlFor="jobTitle">Titre du poste</Form.Label>
        <Form.Control
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={formData.jobTitle}
          placeholder="Titre du poste"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="d-block">Type de poste</Form.Label>
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
        <Form.Label htmlFor="companyName"> Nom de l’entreprise</Form.Label>
        <Form.Control
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          placeholder=" Nom de l’entreprise,"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="companyAddress"> Adresse de l’entreprise</Form.Label>
        <Form.Control
          type="text"
          id="companyAddress"
          name="companyAddress"
          value={formData.companyAddress}
          placeholder=" Adresse de l’entreprise"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="companyCity"> Ville de l’entreprise</Form.Label>
        <Form.Control
          type="text"
          id="companyCity"
          name="companyCity"
          value={formData.companyCity}
          placeholder="Ville de l’entreprise"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="companyCountry">Pays de l’entreprise</Form.Label>
        <div className="input-group">
          <CountryDropdown
            value={formData.companyCountry}
            onChange={(val) => selectCountry(val)}
            className="form-control" // Apply form-control class directly to CountryDropdown
          />
        </div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>État de l’entreprise</Form.Label>
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
        <Form.Label htmlFor="dateOfJoining"> Date d’adhésion</Form.Label>
        <FlatPickr
          value={formData.dateOfJoining}
          placeholder="Date d’adhésion"
          onChange={handleDateOfJoiningChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="dateOfRelieving">Date de relèvement</Form.Label>
        <FlatPickr
          value={formData.dateOfLeaving}
          placeholder="Date de relèvement"
          onChange={handleDateOfLeavingChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="salary"> Salaire annuel</Form.Label>
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
        Retournez en arrièr
        </Button>
        <div className="mt-2 mt-md-0 d-flex justify-content-between">
          <Button variant="outline-secondary" className="me-2" onClick={next}>
          sautez
          </Button>
          <Button variant="primary" onClick={handleSaveAndContinue}>
          enregistrez et continuez.
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Employment;
