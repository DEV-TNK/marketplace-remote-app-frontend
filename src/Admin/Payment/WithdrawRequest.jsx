import React, { useState, useEffect } from "react";
import { Card, Table, Badge, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { numberWithCommas } from "../../helper/utils";
import { showToast } from "../../Components/Showtoast";
import Pagination from "../../Components/elements/advance-table/Pagination";

const WithdrawPayment = () => {
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Cloading, SetCloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchWithdrawalRequests = async () => {
      try {
        const response = await axios.get(
          "https://marketplacebackendas-test.azurewebsites.net/api/v1/all-payment-request"
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
          `https://marketplacebackendas-test.azurewebsites.net/api/v1/admin-mark-payment-request`,
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

  // Pagination logic
  const indexOfLastRequest = currentPage * itemsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - itemsPerPage;
  const currentRequests = withdrawalRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Card className="border-0 mt-4">
      <Card.Header>
        <h3 className="mb-0 h4">Demande de retrait</h3>
      </Card.Header>
      <Card.Body className="p-0 pb-4">
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <Table hover responsive className="text-nowrap table-centered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Montant (F CFA)</th>
                  <th>Coordonnées bancaires</th>
                  <th>Détails utilisateur</th>
                  <th>Date</th>
                  <th>Statut</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRequests.map((request) => (
                  <tr key={request.id}>
                    <td>#{request.id}</td>
                    <td>F CFA{numberWithCommas(request.amount)}</td>{" "}
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
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={withdrawalRequests.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        )}
        {!loading && withdrawalRequests.length === 0 && (
          <div className="ml-5">Aucune demande de retrait n’a été trouvée.</div>
        )}
      </Card.Body>
    </Card>
  );
};

export default WithdrawPayment;
