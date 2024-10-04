import axios from "axios";
import { useEffect, useState } from "react";
import { ListGroup, Card, Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import AxiosInterceptor from "../../../../../Components/AxiosInterceptor";

const OrderSummarySingle = () => {
  const authFetch = AxiosInterceptor()
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = sessionStorage.getItem("UserId");
  const { id } = useParams();

  useEffect(() => {
    const getSummary = async () => {
      try {
        const response = await authFetch.get(
          `https://marketplacebackendas-test.azurewebsites.net/api/v1/get-order-summary/${userId}`
        );
        const orderSummaries = response.data?.data;
        console.log("Fetched Order Summaries:", orderSummaries);

        if (Array.isArray(orderSummaries)) {
          const selectedOrder = orderSummaries.find(
            (order) => order.orderSummary?.id === parseInt(id)
          );
          console.log("Selected Order:", selectedOrder);

          setOrderDetails(selectedOrder ? selectedOrder : null);
        } else {
          console.log("Order summaries data is not an array:", orderSummaries);
          setOrderDetails(null);
        }
      } catch (error) {
        console.error("Error fetching order summaries:", error);
        setOrderDetails(null);
      } finally {
        setLoading(false);
      }
    };

    getSummary();
  }, [userId, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orderDetails) {
    return <div>No order found with the provided ID.</div>;
  }

  const formatPrice = (currencyName, priceValue) => {
    if (isNaN(priceValue)) return "Invalid Price";

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
        return `₦${priceValue}`; // Default to Naira if unknown currency
    }
  };

  return (
    <div className="text-center p-4">
      <div className="mb-3" style={{ fontSize: "50px", color: "green" }}>
        <FaCheckCircle />
      </div>
      <h4>Thank you for your purchase</h4>
      <p>We&apos;ve received your order. View the summary below.</p>
      <Card
        className="order-summary-card my-2 mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <Card.Header as="h3" className="text-center">
          Order Summary
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <div className="item-details flex-grow-1 text-start">
              <div>{orderDetails.serviceHeader}</div>
            </div>
            <div className="item-price text-end">
              Total Price:{" "}
              <strong>
                {formatPrice(
                  orderDetails.orderSummary.currency,
                  orderDetails.orderSummary.totalPrice
                )}
              </strong>
            </div>
          </ListGroup.Item>

          {(orderDetails.gigQuantity !== null ||
            orderDetails.extraFastDelivery !== null ||
            orderDetails.additionalRevision !== null ||
            orderDetails.copyrights !== null) && (
            <ListGroup.Item>
              <div className="text-start mx-2">
                <strong>Upgrades</strong>
              </div>
              {orderDetails.gigQuantity !== false && (
                <div className="d-flex justify-content-between mx-2">
                  <div>Gig Quantity</div>
                  <div>{orderDetails.gigQuantity}</div>
                </div>
              )}
              {orderDetails.extraFastDelivery !== false && (
                <div className="d-flex justify-content-between mx-2">
                  <div>Extra Fast Delivery</div>
                  <div>
                    {formatPrice(
                      orderDetails.orderSummary.currency,
                      orderDetails.extraFastDelivery
                    )}
                  </div>
                </div>
              )}
              {orderDetails.additionalRevision !== false && (
                <div className="d-flex justify-content-between mx-2">
                  <div>Additional Revision</div>
                  <div>
                    {formatPrice(
                      orderDetails.orderSummary.currency,
                      orderDetails.additionalRevision
                    )}
                  </div>
                </div>
              )}
              {orderDetails.copyrights !== false && (
                <div className="d-flex justify-content-between mx-2">
                  <div>Copyrights</div>
                  <div>
                    {formatPrice(
                      orderDetails.orderSummary.currency,
                      orderDetails.copyrights
                    )}
                  </div>
                </div>
              )}
            </ListGroup.Item>
          )}

          <ListGroup.Item className="text-start mx-2">
            <div>
              <strong>Billing Information</strong>
            </div>
            <div>
              Name: {orderDetails.orderSummary.fullName || "Not Provided"}
            </div>
            <div>
              Company Name:{" "}
              {orderDetails.orderSummary.companyName || "Not Provided"}
            </div>
            <div>
              Full Address:{" "}
              {orderDetails.orderSummary.country || "Not Provided"},{" "}
              {orderDetails.orderSummary.stateRegion || ""},{" "}
              {orderDetails.orderSummary.address || ""}
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
      <Button
        variant="outline-dark"
        onClick={() =>
          (window.location.href = "/ServiceProviderDashoard/Outsourced-Gigs")
        }
      >
        Back to Gigs Employed
      </Button>
    </div>
  );
};

export default OrderSummarySingle;
