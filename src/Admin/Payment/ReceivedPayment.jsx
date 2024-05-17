import React, { useState, useEffect } from "react";
import { Card, Table, Spinner } from "react-bootstrap";
import axios from "axios";
import Pagination from "../../Components/elements/advance-table/Pagination";
import { numberWithCommas } from "../../helper/utils";

const ReceivedPayment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          "https://unleashified-backend.azurewebsites.net/api/v1/get-all-payment-records"
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

  return (
    <Card className="border-0 mt-4">
      <Card.Header>
        <h3 className="mb-0 h4">Received Payment</h3>
      </Card.Header>
      <Card.Body>
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
                <th>Email</th>
                <th>Job Title</th>
                <th>Amount (₦)</th>
                <th>Method</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.email}</td>
                  <td>{payment.jobTitle}</td>
                  <td>₦{numberWithCommas(payment.amount)}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>{payment.status}</td>
                  <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {!loading && payments.length === 0 && <div>No payments found.</div>}
      </Card.Body>
    </Card>
  );
};

export default ReceivedPayment;
