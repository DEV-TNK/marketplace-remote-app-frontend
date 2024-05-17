import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Badge,
  Button,
  Spinner, // Import Spinner component
} from "react-bootstrap";
import axios from "axios";
import { numberWithCommas } from "../../helper/utils";
import { showToast } from "../../Components/Showtoast";

const WithdrawPayment = () => {
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Cloading, SetCloading] = useState(false);

  useEffect(() => {
    const fetchWithdrawalRequests = async () => {
      try {
        const response = await axios.get(
          "https://unleashified-backend.azurewebsites.net/api/v1/all-payment-request"
        );
        setWithdrawalRequests(response.data.paymentRequests);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching withdrawal requests:", error);
        setLoading(false);
      }
    };

    fetchWithdrawalRequests();
  }, []);

  // Define a function to handle completing a withdrawal request
  const handleAction = async (id) => {
    const rowIndex = withdrawalRequests.findIndex((row) => row.id === id);
    if (rowIndex !== -1) {
      try {
        const updatedData = [...withdrawalRequests];
        updatedData[rowIndex].Cloading = true;
        setWithdrawalRequests(updatedData);

        const response = await axios.post(
          `https://unleashified-backend.azurewebsites.net/api/v1/admin-mark-payment-request`,
          {
            requestId: id,
            status: "true",
          }
        );
        showToast(response.data.message);
      } catch (error) {
        showToast(error.response.data.message);
      } finally {
        const updatedData = [...withdrawalRequests];
        updatedData[rowIndex].Cloading = false;
        setWithdrawalRequests(updatedData);
      }
    }
  };

  return (
    <Card className="border-0 mt-4">
      <Card.Header>
        <h3 className="mb-0 h4">Withdraw Request</h3>
      </Card.Header>
      <Card.Body className="p-0 pb-4">
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Table hover responsive className="text-nowrap table-centered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount (₦)</th>
                <th>Bank Details</th>
                <th>User Details</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {withdrawalRequests.map((request) => (
                <tr key={request.id}>
                  <td>#{request.id}</td>
                  <td>₦{numberWithCommas(request.amount)}</td>{" "}
                  {/* Display in Naira */}
                  <td>
                    <span>{request.Account.accountNumber}</span>
                    <br />
                    <span>{request.Account.accountName}</span>
                    <br />
                    <p>{request.Account.bankName}</p>
                  </td>
                  <td>
                    {" "}
                    <span>{request.User.username} </span>
                    <br />
                    <span>{request.User.email} </span>
                  </td>
                  <td>{new Date(request.requestDate).toLocaleString()}</td>
                  <td>
                    <Badge
                      bg={request.status === "pending" ? "warning" : "success"}
                    >
                      {request.status}
                    </Badge>
                  </td>
                  <td>
                    {/* Render the action button based on request status */}
                    {request.status !== "completed" && (
                      <Button
                        variant="success"
                        onClick={() => handleAction(request.id)}
                        style={{
                          backgroundColor: "light-green",
                          borderColor: "#b8f7b2",
                          opacity:
                            request.status === "completed" || request.Cloading
                              ? 0.6
                              : 1,
                        }}
                      >
                        {request.Cloading ? "Processing" : "Completed"}
                      </Button>
                    )}
                    {request.status === "completed" && (
                      <Button
                        variant="success"
                        disabled
                        style={{
                          backgroundColor: "light-green",
                          borderColor: "#b8f7b2",
                          opacity: ".7",
                        }}
                      >
                        Completed
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {!loading && withdrawalRequests.length === 0 && (
          <div className="ml-5">No withdrawal requests found.</div>
        )}
      </Card.Body>
    </Card>
  );
};

export default WithdrawPayment;
