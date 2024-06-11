import React, { useState, useEffect, useMemo } from "react";
import { Col, Row, Card, Spinner, Table, Button } from "react-bootstrap";
import axios from "axios";
import { showToast } from "../../Components/Showtoast";

const Resolution = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://marketplacebackendas-test.azurewebsites.net/api/v1/all-conflicts"
      );
      console.log("Response Data:", response.data);
      setData(response.data.conflicts || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAction = async (id) => {
    const rowIndex = data.findIndex((row) => row.id === id);
    if (rowIndex !== -1) {
      try {
        const updatedData = [...data];
        updatedData[rowIndex].Cloading = true;
        setData(updatedData);

        const response = await axios.put(
          `https://unleashified-backend.azurewebsites.net/api/v1/conflicts/${id}`
        );
        showToast(response.data.message);

        // Fetch data again to get the latest updates
        fetchData();
      } catch (error) {
        showToast(error.response.data.message);
      } finally {
        const updatedData = [...data];
        updatedData[rowIndex].Cloading = false;
        setData(updatedData);
      }
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ getValue }) => {
          return "#" + getValue();
        },
      },
      { accessorKey: "role", header: "Role" },
      { accessorKey: "userDetails", header: "User Details" },
      { accessorKey: "reason", header: "Reason" },
      { accessorKey: "message", header: "Message" },
      { accessorKey: "status", header: "Status" },
      {
        header: "Completed",
        accessorKey: "completed",
        cell: ({ row }) => (
          <Button
            variant="success"
            disabled={row && row.status === "completed"}
            style={{
              backgroundColor: "green",
              borderColor: "#b8f7b2",
              color: "white",
              opacity: row && row.status === "completed" ? 0.7 : 1,
            }}
            onClick={() => handleAction(row.id)}
          >
            {row && row.status === "completed" ? "Completed" : "Process"}
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-lg-flex justify-content-between align-items-center">
            <div className="mb-3 mb-lg-0">
              <h1 className="mb-0 h2 fw-bold">Resolution</h1>
            </div>
          </div>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div>
          {/* Content that was here has been removed */}
        </div>
      )}

      <Card className="border-0 mt-4">
        <Card.Header>
          <h3 className="mb-0 h4">Resolution</h3>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <Row className="align-items-center">
              {/* Your FormSelect components */}
            </Row>
          )}
        </Card.Body>
        <Card.Body className="p-0 pb-4">
          {!loading && (
            <>
              {data.length === 0 ? (
                <div>No conflicts found.</div>
              ) : (
                <Table hover responsive className="text-nowrap table-centered">
                  <thead>
                    <tr>
                      {columns.map((column) => (
                        <th key={column.accessorKey}>{column.header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row) => (
                      <tr key={row.id}>
                        {columns.map((column) => (
                          <td key={column.accessorKey}>
                            {column.accessorKey === "userDetails" && (
                              <div>
                                <span>{row.User.username}</span>
                                <br />
                                <span>{row.User.email}</span>
                              </div>
                            )}
                            {column.accessorKey === "message" &&
                            row.message.length > 30 ? (
                              <span
                                title={row.message}
                                className="mb-1 text-primary-hover cursor-pointer"
                              >
                                {row.message.slice(0, 30)}...
                              </span>
                            ) : (
                              row[column.accessorKey]
                            )}
                            {column.accessorKey === "completed" && (
                              <Button
                                variant="success"
                                disabled={
                                  row.status === "completed" || row.Cloading
                                }
                                style={{
                                  backgroundColor: "green",
                                  borderColor: "#b8f7b2",
                                  color: "white",
                                  opacity:
                                    row.status === "completed" || row.Cloading
                                      ? 0.6
                                      : 1,
                                }}
                                onClick={() => handleAction(row.id)}
                              >
                                {row.Cloading ? "Processing" : "Completed"}
                              </Button>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Resolution;