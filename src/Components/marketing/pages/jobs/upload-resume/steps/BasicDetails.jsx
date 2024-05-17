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
            <h2 className="mb-0">Basic Information</h2>
            <span>Add your personal details in the form.</span>
          </div>
          <Row>
            {/* Input fields */}
            <Col md={6} xs={12} className="mb-4">
              <Form.Label htmlFor="firstname">
                First Name<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="firstname"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Col>
            <Col md={6} xs={12} className="mb-4">
              <Form.Label htmlFor="lastname">
                Last Name<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="lastname"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Col>
            <Col md={6} xs={12} className="mb-4">
              <Form.Label htmlFor="middlename">Middle Name</Form.Label>
              <Form.Control
                type="text"
                id="middlename"
                placeholder="Middle Name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </Col>
            <Col md={6} xs={12} className="mb-4">
              <Form.Label htmlFor="email">
                Email<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                id="email"
                placeholder="Tell us your Email ID"
                aria-describedby="emailHelpBlock"
                required
                disabled
                defaultValue={myEmail}
              />
              <Form.Text id="emailHelpBlock" className="fs-6" muted>
                We'll send you relevant jobs in your mail
              </Form.Text>
            </Col>
            <Col md={12} xs={12} className="mb-4">
              <Form.Label htmlFor="phone">
                Phone Name<span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className="mb-1">
                <InputGroup.Text id="phone">+234</InputGroup.Text>
                <Form.Control
                  type="text"
                  name="contact"
                  placeholder="Mobile Number"
                  aria-label="Mobile Number"
                  aria-describedby="phoneHelpBlock"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </InputGroup>
              <Form.Text id="phoneHelpBlock" className="fs-6" muted>
                Recruiters will call you on this number
              </Form.Text>
            </Col>
            <Col md={12} xs={12} className="mb-4">
              <Form.Label className="d-block">Gender</Form.Label>
              <Form.Check
                type="radio"
                id="male"
                label="Male"
                className="form-check-inline"
                checked={gender === "male"}
                onChange={() => setGender("male")}
                required
              />
              <Form.Check
                type="radio"
                id="female"
                label="Female"
                checked={gender === "female"}
                className="form-check-inline"
                onChange={() => setGender("female")}
                required
              />
              <Form.Check
                type="radio"
                id="other"
                label="Other"
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
                label="Send me important updates on email"
                className="fs-6"
                value=""
                onChange={(e) => setConfirmEmailUpdates(e.target.checked)}
              />
            </Col>
            {/* Next button */}
            <Col xs={12}>
              <Button variant="primary" type="submit">
                Next
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Form>
  );
};

export default BasicDetails;
