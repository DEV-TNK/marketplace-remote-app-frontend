import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  // InputGroup,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { FormSelect } from "../../../../../../Components/elements/form-select/FormSelect";
import { FlatPickr } from "../../../../../../Components/elements/flat-pickr/FlatPickr";

const Employment = ({ next, previous, data }) => {
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

  // Effect to set form data initially with fetched data
  useEffect(() => {
    if (data) {
      setFormData({
        jobTitle: data.jobTitle || "",
        jobType: data.jobType || "",
        companyName: data.companyName || "",
        companyAddress: data.companyAddress || "",
        companyCity: data.companyCity || "",
        companyCountry: data.companyCountry || "",
        companyState: data.companyState || "",
        dateOfJoining: data.dateOfJoining || new Date(),
        dateOfLeaving: data.dateOfLeaving || new Date(),
        salary: data.salary || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const states = [
    { value: "Abia", label: "Abia" },
    { value: "Adamawa", label: "Adamawa" },
    { value: "Akwa Ibom", label: "Akwa Ibom" },
    { value: "Anambra", label: "Anambra" },
    { value: "Bauchi", label: "Bauchi" },
    { value: "Bayelsa", label: "Bayelsa" },
    { value: "Benue", label: "Benue" },
    { value: "Borno", label: "Borno" },
    { value: "Cross River", label: "Cross River" },
    { value: "Delta", label: "Delta" },
    { value: "Ebonyi", label: "Ebonyi" },
    { value: "Edo", label: "Edo" },
    { value: "Ekiti", label: "Ekiti" },
    { value: "Enugu", label: "Enugu" },
    { value: "Gombe", label: "Gombe" },
    { value: "Imo", label: "Imo" },
    { value: "Jigawa", label: "Jigawa" },
    { value: "Kaduna", label: "Kaduna" },
    { value: "Kano", label: "Kano" },
    { value: "Katsina", label: "Katsina" },
    { value: "Kebbi", label: "Kebbi" },
    { value: "Kogi", label: "Kogi" },
    { value: "Kwara", label: "Kwara" },
    { value: "Lagos", label: "Lagos" },
    { value: "Nasarawa", label: "Nasarawa" },
    { value: "Niger", label: "Niger" },
    { value: "Ogun", label: "Ogun" },
    { value: "Ondo", label: "Ondo" },
    { value: "Osun", label: "Osun" },
    { value: "Oyo", label: "Oyo" },
    { value: "Plateau", label: "Plateau" },
    { value: "Rivers", label: "Rivers" },
    { value: "Sokoto", label: "Sokoto" },
    { value: "Taraba", label: "Taraba" },
    { value: "Yobe", label: "Yobe" },
    { value: "Zamfara", label: "Zamfara" },
  ];

  const radios = [
    { name: "Full-Time", value: "Full-Time" },
    { name: "Part-Time", value: "Part-Time" },
    { name: "Freelance", value: "Freelance" },
    { name: "Contract", value: "Contract" },
  ];

  const handleSaveAndContinue = () => {
    sessionStorage.setItem("employmentData", JSON.stringify(formData));
    next();
  };

  const handleDateOfJoiningChange = (selectedDates) => {
    const selectedDate = selectedDates[0];
    const formattedDate = selectedDate
      ? selectedDate.toISOString().split("T")[0]
      : "";
    setFormData((prevData) => ({
      ...prevData,
      dateOfJoining: formattedDate,
    }));
  };

  const handleDateOfLeavingChange = (selectedDates) => {
    const selectedDate = selectedDates[0];
    const formattedDate = selectedDate
      ? selectedDate.toISOString().split("T")[0]
      : "";
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
          placeholder="Titre du poste"
          value={formData.jobTitle}
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
        <Form.Label htmlFor="companyName">Nom de l’entreprise</Form.Label>
        <Form.Control
          type="text"
          id="companyName"
          name="companyName"
          placeholder="Nom de l’entreprise"
          value={formData.companyName}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="companyAddress">Adresse de l’entreprise</Form.Label>
        <Form.Control
          type="text"
          id="companyAddress"
          name="companyAddress"
          placeholder="Adresse de l’entreprise"
          value={formData.companyAddress}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="companyCity">Ville de l’entreprise</Form.Label>
        <Form.Control
          type="text"
          id="companyCity"
          name="companyCity"
          placeholder="Ville de l’entreprise"
          value={formData.companyCity}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="companyCountry">Pays de l’entreprise</Form.Label>
        <Form.Control
          type="text"
          id="companyCountry"
          name="companyCountry"
          placeholder="Pays de l’entreprise"
          value={formData.companyCountry}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>État de l’entreprise</Form.Label>
        <Form.Control
          as={FormSelect}
          options={states}
          value={formData.companyState}
          onChange={handleChange}
          name="companyState"
        />
        <Form.Text className="text-muted">
        Veuillez re-sélectionner l'état de votre entreprise parmi les options ci-dessus.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="dateOfJoining">Date d’adhésion</Form.Label>
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
        <Form.Label htmlFor="salary">Salaire annuel</Form.Label>
        <Form.Control
          type="text"
          id="salary"
          name="salary"
          placeholder="Eg. 5,64,000"
          value={formData.salary}
          onChange={handleChange}
        />
      </Form.Group>
      <div className="d-md-flex justify-content-between mb-3">
        <Button variant="outline-secondary" onClick={previous}>
        Retourner
        </Button>
        <div className="mt-2 mt-md-0">
          <Button variant="outline-secondary" className="me-2" onClick={next}>
          Passer
          </Button>
          <Button variant="primary" onClick={handleSaveAndContinue}>
          Sauvegarder et continuer
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Employment;
