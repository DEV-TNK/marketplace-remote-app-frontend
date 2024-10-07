import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";

const BasicDetails = ({ next, data }) => {
  // State variable for formData

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    contact: "",
    gender: "",
    confirmEmailUpdates: false,
  });

  // Update formData whenever the 'data' prop changes
  useEffect(() => {
    if (data) {
      setFormData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        middleName: data.middleName || "",
        email: data.email || "",
        contact: data.contact || "",
        gender: data.gender || "",
        confirmEmailUpdates: data.confirmEmailUpdates || false,
      });
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form inputs
    const { firstName, lastName, middleName, email, contact, gender } =
      formData;
    if (
      !firstName ||
      !lastName ||
      !middleName ||
      !email ||
      !contact ||
      !gender
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Save form data to session storage
    Object.entries(formData).forEach(([key, value]) => {
      sessionStorage.setItem(key, value);
    });

    next();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "gender") {
      setFormData({
        ...formData,
        gender: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Card className="card-bordered shadow-none mb-3">
        <Card.Body className="p-6">
          <div className="mb-4">
            <h2 className="mb-0">Informations de base</h2>
            <span>Ajoutez vos données personnelles dans le formulaire.</span>
          </div>
          <Row>
            {/* Input fields */}
            <Col md={6} xs={12} className="mb-4">
              <Form.Label htmlFor="firstname">
              Prénom<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="firstname"
                name="firstName"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={6} xs={12} className="mb-4">
              <Form.Label htmlFor="lastname">
              Nom de famille<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="lastname"
                name="lastName"
                placeholder="Nom de famille"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={6} xs={12} className="mb-4">
              <Form.Label htmlFor="middlename">
              Deuxième prénom<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="middlename"
                name="middleName"
                placeholder="Deuxième prénom"
                value={formData.middleName}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={6} xs={12} className="mb-4">
              <Form.Label htmlFor="email">
                E-mail<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                id="email"
                name="email"
                placeholder="Dites-nous votre identifiant E-mail."
                aria-describedby="emailHelpBlock"
                value={formData.email}
                onChange={handleChange}
                disabled
                required
              />
              <Form.Text id="emailHelpBlock" className="fs-6" muted>
              Nous vous enverrons des offres d’emploi pertinentes dans votre courrier
              </Form.Text>
            </Col>
            <Col md={12} xs={12} className="mb-4">
              <Form.Label htmlFor="phone">
              Numéro de téléphone<span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className="mb-1">
                <InputGroup.Text id="phone">+225</InputGroup.Text>
                <Form.Control
                  type="text"
                  id="phone"
                  name="contact"
                  placeholder="Numéro de téléphone"
                  aria-label="Mobile Number"
                  aria-describedby="phoneHelpBlock"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <Form.Text id="phoneHelpBlock" className="fs-6" muted>
               Les recruteurs vous appelleront sur ce numéro
              </Form.Text>
            </Col>
            <Col md={12} xs={12} className="mb-4">
              <Form.Label className="d-block">Sexe</Form.Label>
              <InputGroup className="mb-3">
                <Form.Check
                  inline
                  type="radio"
                  label="Homme"
                  name="gender"
                  id="male"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  required
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Femme"
                  name="gender"
                  id="female"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  required
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Autre"
                  name="gender"
                  id="other"
                  value="other"
                  checked={formData.gender === "other"}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Col>
            {/* Next button */}
            <Col xs={12}>
              <Button variant="primary" type="submit">
              Suivant
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Form>
  );
};

export default BasicDetails;
