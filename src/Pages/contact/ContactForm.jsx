import React, { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { FormSelect } from "../../Components/elements/form-select/FormSelect";
import { showToast } from "../../Components/Showtoast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    reason: "", // Added 'contact' field
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set processing state to true
    try {
      const response = await fetch(
        "https://unleashified-backend.azurewebsites.net/api/v1/contact-us",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      showToast(data.message);
      // Handle success or display error message
    } catch (error) {
      console.error("Error:", error);
      showToast("An error occurred. Please try again later.");
      // Handle error
    } finally {
      setIsSubmitting(false); // Reset processing state to false
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        reason: "",
        message: "",
      }); // Clear form inputs
    }
  };

  const contact = [
    { value: "Design", label: "Design" },
    { value: "Development", label: "Development" },
    { value: "Sales", label: "Sales" },
    { value: "Support", label: "Support" },
    { value: "Marketing", label: "Marketing" },
    { value: "Billing", label: "Billing" },
    { value: "Feedback", label: "Feedback" },
    { value: "Other", label: "Other" },
  ];

  return (
    <div className="px-4 px-xl-20 py-8">
      <div id="form">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} sm={12}>
              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>
                  First Name:<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>
                  Last Name:<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>
                  Email:<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group className="mb-3" controlId="formPhoneNumber">
                <Form.Label>
                  Phone Number:<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={12} sm={12}>
              <Form.Group className="mb-3" controlId="formContact">
                <Form.Label>
                  Contact Reason:<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as={FormSelect}
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Select"
                  options={contact}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={12} sm={12}>
              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Message:</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message"
                  rows={3}
                />
              </Form.Group>
            </Col>
            <Col md={12} sm={12}>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Submit"}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
