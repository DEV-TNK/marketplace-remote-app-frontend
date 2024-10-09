import React, { useState, useEffect } from "react";
import { Card, Table, Spinner } from "react-bootstrap";
import axios from "axios";
import Pagination from "../../Components/elements/advance-table/Pagination"; // Ensure this path is correct
import { numberWithCommas } from "../../helper/utils";
import AxiosInterceptor from "../../Components/AxiosInterceptor";

const ReceivedPayment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const authFetch = AxiosInterceptor()

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await authFetch.get(
          "https://marketplacebackendas-test.azurewebsites.net/api/v1/get-all-payment-records"
        );
        setPayments(response.data.records);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payments:", error);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const indexOfLastPayment = currentPage * itemsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - itemsPerPage;
  const currentPayments = payments.slice(indexOfFirstPayment, indexOfLastPayment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Card className="border-0 mt-4">
      <Card.Header>
        <h3 className="mb-0 h4">Reçu Paiement</h3>
      </Card.Header>
      <Card.Body>
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
                  <th>E-mail</th>
                  <th> Titre du poste</th>
                  <th>Montant (F CFA)</th>
                  <th>Méthode </th>
                  <th>Statut</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {currentPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{payment.email}</td>
                    <td>{payment.jobTitle}</td>
                    <td>F CFA{numberWithCommas(payment.amount)}</td>
                    <td>{payment.paymentMethod}</td>
                    <td>{payment.status}</td>
                    <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {payments.length === 0 && <div> Aucun paiement trouvé.</div>}
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={payments.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default ReceivedPayment;
