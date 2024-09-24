import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Form, Button } from "react-bootstrap";
import SignIn from "../Authentications/Signin";
import { showToast } from "../Components/Showtoast";

const RequestModalForm = ({
  plan,
  planId,
  header,
  shortDescription,
  service,
  price = 0,
  incentives,
  additionalRevision = 0,
  extraFastDelivery = 0,
  copyrights = 0,
  serviceId,
}) => {
  const [gigQuantity, setGigQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);
  const [selectedExtras, setSelectedExtras] = useState({
    extraFastDelivery: false,
    additionalRevision: false,
    copyrights: false,
  });

  const navigate = useNavigate();

  const email = sessionStorage.getItem("email");
  const userId = sessionStorage.getItem("UserId");

  useEffect(() => {
    let extrasPrice = 0;
    // Ensure valid extras price addition
    if (selectedExtras.extraFastDelivery) extrasPrice += extraFastDelivery || 0;
    if (selectedExtras.additionalRevision) extrasPrice += additionalRevision || 0;
    if (selectedExtras.copyrights) extrasPrice += copyrights || 0;

    // Update total price calculation safely
    setTotalPrice((price + extrasPrice) * gigQuantity);
  }, [gigQuantity, price, selectedExtras, extraFastDelivery, additionalRevision, copyrights]);


  const handleDecrement = () => {
    setGigQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleIncrement = () => {
    setGigQuantity((prev) => prev + 1);
  };

  const handleExtraChange = (event) => {
    const { name, value } = event.target;
    setSelectedExtras((prevState) => ({
      ...prevState,
      [name]: value === "Yes",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const dataToPass = {
      plan,
      planId,
      header,
      shortDescription,
      service,
      totalPrice,
      incentives,
      gigQuantity,
    };

    // Only include the extras if they are selected as "Yes"
    if (selectedExtras.additionalRevision) {
      dataToPass.additionalRevision = additionalRevision;
    }
    if (selectedExtras.extraFastDelivery) {
      dataToPass.extraFastDelivery = extraFastDelivery;
    }
    if (selectedExtras.copyrights) {
      dataToPass.copyrights = copyrights;
    }

    // Navigate to the ServiceBilling component and pass the data
    if (email && userId) {
      navigate(`/service/billing/${serviceId}`, { state: { dataToPass } });
    } else {
      showToast("Login required");
      navigate("/authentication/signin");
    }
  };

  // Function to format price with currency symbol
  const formatPrice = (currencyName, priceValue) => {
    switch (currencyName) {
      case "naira":
      case "NGN":
        return `₦${priceValue}`;
      case "dollars":
      case "USD":
        return `$${priceValue}`;
      case "euros":
      case "EUR":
        return `€${priceValue}`;
      case "pounds":
      case "GBP":
        return `£${priceValue}`;
      default:
        return `₦${priceValue}`;
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-4 border border-secondary rounded p-2">
        <div className="d-flex justify-content-between mb-2">
          <div className="display-6 fw-bold">{plan || header}</div>{" "}
          <div className="display-6">
            {formatPrice(service.pricing.currency, totalPrice)}
          </div>
        </div>

        <p>
          {service.header} - {shortDescription}
        </p>
        <hr />
        <Form.Group as={Row} controlId="gigQuantity">
          <Form.Label column sm="6">
            Gig Quantity
          </Form.Label>
          <Col sm="6" className="d-flex align-items-center">
            <Button variant="outline-secondary" onClick={handleDecrement}>
              -
            </Button>
            <span className="mx-3">{gigQuantity}</span>
            <Button variant="outline-secondary" onClick={handleIncrement}>
              +
            </Button>
          </Col>
        </Form.Group>
      </Row>

      <Row className="mb-4">
        <h6>Upgrade your order with extras</h6>
        <Form.Group as={Row} controlId="extraFastDelivery">
          <Form.Label column sm="8">
            Extra-fast 1-day delivery -{" "}
            {formatPrice(service.pricing.currency, extraFastDelivery)}
          </Form.Label>
          <Col sm="4">
            <Form.Control
              as="select"
              name="extraFastDelivery"
              onChange={handleExtraChange}
              defaultValue="No"
            >
              <option>No</option>
              <option>Yes</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="additionalRevision">
          <Form.Label column sm="8">
            Additional revision -{" "}
            {formatPrice(service.pricing.currency, additionalRevision)}
          </Form.Label>
          <Col sm="4">
            <Form.Control
              as="select"
              name="additionalRevision"
              onChange={handleExtraChange}
              defaultValue="No"
            >
              <option>No</option>
              <option>Yes</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="copyrights">
          <Form.Label column sm="8">
            Copyrights - {formatPrice(service.pricing.currency, copyrights)}
          </Form.Label>
          <Col sm="4">
            <Form.Control
              as="select"
              name="copyrights"
              onChange={handleExtraChange}
              defaultValue="No"
            >
              <option>No</option>
              <option>Yes</option>
            </Form.Control>
          </Col>
        </Form.Group>
      </Row>
      <Row>
        <Button type="submit">Continue</Button>
      </Row>
    </Form>
  );
};

export default RequestModalForm;
