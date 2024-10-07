import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";

const BasicDetails = ({ next }) => {
  // State variables for input field values
  const myEmail = sessionStorage.getItem("email");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");

  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [confirmEmailUpdates, setConfirmEmailUpdates] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form inputs

    if (!firstName || !lastName || !contact || !gender) {
      alert("Please fill in all required fields.");
      return;
    }

    // Save form data to session storage
    sessionStorage.setItem("firstName", firstName);
    sessionStorage.setItem("lastName", lastName);
    if (middleName === "") {
      console.log("not setting");
    } else {
      sessionStorage.setItem("middleName", middleName);
    }
    sessionStorage.setItem("semail", myEmail);
    sessionStorage.setItem("contact", contact);
    sessionStorage.setItem("gender", gender);

    next();
  };

  useEffect(() => {
    const firstName = sessionStorage.getItem("firstName");
    if (firstName) {
      setFirstName(firstName);
    }
    const lastName = sessionStorage.getItem("lastName");
    if (lastName) {
      setLastName(lastName);
    }
    const middleName = sessionStorage.getItem("middleName");
    if (middleName) {
      setMiddleName(middleName);
    }
    // const semail = sessionStorage.getItem("semail");
    // if (semail) {
    //   setEmail(semail);
    // }
    const contact = sessionStorage.getItem("contact");
    if (contact) {
      setContact(contact);
    }
    const gender = sessionStorage.getItem("gender");
    if (gender) {
      setGender(gender);
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Card className="card-bordered shadow-none mb-3 ">
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
                placeholder="Prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Col>
            <Col md={6} xs={12} className="mb-4">
              <Form.Label htmlFor="lastname">
              Nom de famille <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="lastname"
                placeholder="Nom de famille"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Col>
            <Col md={6} xs={12} className="mb-4">
              <Form.Label htmlFor="middlename">Deuxième prénom</Form.Label>
              <Form.Control
                type="text"
                id="middlename"
                placeholder="Deuxième prénom"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </Col>
            <Col md={6} xs={12} className="mb-4">
              <Form.Label htmlFor="email">
                E-mail<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                id="email"
                placeholder="Dites-nous votre identifiant E-mail"
                aria-describedby="emailHelpBlock"
                required
                disabled
                defaultValue={myEmail}
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
                  name="contact"
                  placeholder="Numéro de téléphone"
                  aria-label="Mobile Number"
                  aria-describedby="phoneHelpBlock"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </InputGroup>
              <Form.Text id="phoneHelpBlock" className="fs-6" muted>
              Les recruteurs vous appelleront sur ce numéro
              </Form.Text>
            </Col>
            <Col md={12} xs={12} className="mb-4">
              <Form.Label className="d-block">Sexe</Form.Label>
              <Form.Check
                type="radio"
                id="male"
                label="Homme"
                className="form-check-inline"
                checked={gender === "male"}
                onChange={() => setGender("male")}
                required
              />
              <Form.Check
                type="radio"
                id="female"
                label="Femme"
                checked={gender === "female"}
                className="form-check-inline"
                onChange={() => setGender("female")}
                required
              />
              <Form.Check
                type="radio"
                id="other"
                label=" Autre"
                className="form-check-inline"
                checked={gender === "other"}
                onChange={() => setGender("other")}
                required
              />
            </Col>

            <Col md={12} xs={12} className="mb-4">
              <Form.Check
                type="checkbox"
                id="confirm"
                label="Envoyez-moi des mises à jour importantes par e-mail"
                className="fs-6"
                value=""
                onChange={(e) => setConfirmEmailUpdates(e.target.checked)}
              />
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
