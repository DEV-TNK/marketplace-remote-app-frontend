import React from "react";
import { Card, Button, Image, Row, Col } from "react-bootstrap";

const JobCard = ({
  companyName,
  companyImage,
  jobTitle,
  price,
  currency,
  jobSalaryFormat,
  deliveryTime,
  onAcceptOffer,
  onRejectOffer,
  Aloading,
  Rloading,
}) => {
  const placeholderImage = "path_to_placeholder_image"; // Replace "path_to_placeholder_image" with the actual path to your placeholder image

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
    <Card className="mb-4">
      <Card.Body>
        <Row className="align-items-center mb-4">
          <Col xs={6}>
            <Image
              src={companyImage || placeholderImage}
              style={{ width: "100%", height: "100%" }}
              className="avatar-xs"
              alt={companyName}
            />
          </Col>
          <Col xs={6}>
            <span>{companyName}</span>
          </Col>
        </Row>
        <h3 className="h5">{jobTitle}</h3>
        <p className="mb-3">{formatPrice(currency, price)}</p>
        <p className="mb-3">Payment Type: {jobSalaryFormat}</p>
        <p className="mb-3">Delivery Time: {deliveryTime}</p>
        <Row className="g-2 py-2">
          <Col xs={6} className="py-0 text-start">
            <Button
              variant="success"
              onClick={onAcceptOffer}
              className="btn-sm"
            >
              {Aloading ? "Processing" : "Accept Offer"}
            </Button>
          </Col>
          <Col xs={6} className="py-0 text-end">
            <Button variant="danger" onClick={onRejectOffer} className="btn-sm">
              {Rloading ? "Processing" : "Reject Offer"}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default JobCard;
