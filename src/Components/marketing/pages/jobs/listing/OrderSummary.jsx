import { useEffect, useState } from "react";
import { ListGroup, Card, Button, Row, Col } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useLocation } from "react-router-dom";

const OrderSummary = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(() => {
    const savedOrderDetails = sessionStorage.getItem("orderDetails");
    return savedOrderDetails ? JSON.parse(savedOrderDetails) : null;
  });
  const [billingDetails, setBillingDetails] = useState(() => {
    const savedBillingDetails = sessionStorage.getItem("billingDetails");
    return savedBillingDetails ? JSON.parse(savedBillingDetails) : null;
  });
  const [total, setTotal] = useState(()=> {
    const savedTotalDetails = sessionStorage.getItem("total");
    return savedTotalDetails ? JSON.parse(savedTotalDetails) : null;
  })
  console.log(orderDetails);
  useEffect(() => {
    if (location.state) {
      const { dataToPass, billingInfoData, total } = location.state;
      if (dataToPass) {
        setOrderDetails(dataToPass);
        sessionStorage.setItem("orderDetails", JSON.stringify(dataToPass));
      }
      if (billingInfoData) {
        setBillingDetails(billingInfoData);
        sessionStorage.setItem(
          "billingDetails",
          JSON.stringify(billingInfoData)
        );
      }
      if (total) {
        setTotal(total)
        sessionStorage.setItem("total", JSON.stringify(total))
      }
    }

    return () => {
      sessionStorage.removeItem("orderDetails");
      sessionStorage.removeItem("billingDetails");
      sessionStorage.removeItem("total")
    };
  }, [location.state]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  const orderNumber = "#B6CT3";
  const currency = orderDetails.service.pricing.currency;
  const scheduledDate = "2024-08-01";
  const scheduledTime = "10:00 AM";

  const firstBackgroundImage = orderDetails.service.backgroundCover?.[0] || ""; // Get the first background image

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
    <div className="text-center p-4">
      <Row className="mb-4">
        <Col className="d-flex justify-content-center align-center">
          <FaCheckCircle className="me-1 display-6" />
          <span className="fw-bolder me-3">Order Details</span>
          <MdOutlineNavigateNext className="me-2 display-6" />
          <FaCheckCircle className="me-1 display-6" />
          <span className="fw-bolder me-3">Confirm & Pay</span>
          <MdOutlineNavigateNext className="me-2 display-6" />
          <FaCheckCircle className="me-1 display-6" />
          <span className="fw-bolder me-3">Order Summary</span>
        </Col>
      </Row>
      <div className="mb-3" style={{ fontSize: "50px", color: "green" }}>
        ✔️
      </div>
      <h4>Thank you for your purchase</h4>
      <p>We&apos;ve received your order, view the summary below.</p>
      <p>{/* Your order number is <strong>{orderNumber}</strong> */}</p>
      <Card
        className="order-summary-card my-2 mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <Card.Header as="h3" className="text-center">
          Order Summary
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <img
              src={firstBackgroundImage}
              alt="Service"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                marginRight: "10px",
              }}
            />
            <div className="item-details flex-grow-1 text-start">
              <div>{orderDetails.header}</div>
            </div>
            <div className="item-price text-end">
              Total Price: <strong>{formatPrice(currency, total)}</strong>
            </div>
          </ListGroup.Item>
          {/* {scheduledDate && (
            <ListGroup.Item className="d-flex justify-content-between">
              <div>Scheduled Date</div>
              <div>{scheduledDate}</div>
            </ListGroup.Item>
          )}
          {scheduledTime && (
            <ListGroup.Item className="d-flex justify-content-between">
              <div>Scheduled Time</div>
              <div>{scheduledTime}</div>
            </ListGroup.Item>
          )} */}
          {(orderDetails.gigQuantity !== null ||
            orderDetails.extraFastDelivery !== null ||
            orderDetails.additionalRevision !== null ||
            orderDetails.copyrights !== null) && (
            <ListGroup.Item>
              <div className="text-start mx-2">
                <strong>Upgrades</strong>
              </div>
              {orderDetails.gigQuantity !== null && (
                <div className="d-flex justify-content-between mx-2">
                  <div>Gig Quantity</div>
                  <div>{orderDetails.gigQuantity}</div>
                </div>
              )}
              {orderDetails.extraFastDelivery !== undefined && (
                <div className="d-flex justify-content-between mx-2">
                  <div>Extra Fast Delivery</div>
                  <div>
                    {formatPrice(currency, orderDetails.extraFastDelivery)}
                  </div>
                </div>
              )}
              {orderDetails.additionalRevision !== undefined && (
                <div className="d-flex justify-content-between mx-2">
                  <div>Additional Revision</div>
                  <div>
                    {formatPrice(currency, orderDetails.additionalRevision)}
                  </div>
                </div>
              )}
              {orderDetails.copyrights !== undefined && (
                <div className="d-flex justify-content-between mx-2">
                  <div>Copyrights</div>
                  <div>{formatPrice(currency, orderDetails.copyrights)}</div>
                </div>
              )}
            </ListGroup.Item>
          )}

          {billingDetails && (
            <ListGroup.Item className="text-start mx-2">
              <div>
                <strong>Billing Information</strong>
              </div>
              <div>Name: {billingDetails.username}</div>
              <div>Company Name: {billingDetails.companyName}</div>
              <div>
                Full Address: {billingDetails.country}, {billingDetails.state},{" "}
                {billingDetails.address}
              </div>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card>
      <Button
        variant="outline-dark"
        onClick={() => (window.location.href = "/")}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default OrderSummary;
