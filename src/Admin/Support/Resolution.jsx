import React, { useState, useEffect, useMemo } from "react";
import { Col, Row, Card, Spinner, Table, Button } from "react-bootstrap";
import axios from "axios";
import { showToast } from "../../Components/Showtoast";
import SupportModal from "../Support/SupportModal";

const Resolution = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSupportID, setSelectedSupportID] = useState(null);
  const [selectedUserMessage, setSelectedUserMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://marketplacebackendas-test.azurewebsites.net/api/v1/all-conflicts"
      );
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
        updatedData[rowIndex].loading = true;
        setData(updatedData);

        const response = await axios.put(
          `https://marketplacebackendas-test.azurewebsites.net/api/v1/conflicts/${id}`
        );
        showToast(response.data.message);

        // Fetch data again to get the latest updates
        fetchData();
      } catch (error) {
        showToast(error.response.data.message);
      } finally {
        const updatedData = [...data];
        updatedData[rowIndex].loading = false;
        setData(updatedData);
      }
    }
  };

  const handleReply = (id, message) => {
    setSelectedSupportID(id);
    setSelectedUserMessage(message);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedSupportID(null);
    setSelectedUserMessage("");
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => "#" + row.id,
      },
      { accessorKey: "role", header: "Role" },
      {
        accessorKey: "userDetails",
        header: "User Details",
        cell: ({ row }) => (
          <div>
            <span>{row.User.username}</span>
            <br />
            <span>{row.User.email}</span>
          </div>
        ),
      },
      { accessorKey: "reason", header: "Reason" },
      {
        accessorKey: "message",
        header: "Message",
        cell: ({ row }) =>
          row.message.length > 30 ? (
            <span
              title={row.message}
              className="mb-1 text-primary-hover cursor-pointer"
            >
              {row.message.slice(0, 30)}...
            </span>
          ) : (
            row.message
          ),
      },
      { accessorKey: "status", header: "Status" },
      {
        accessorKey: "reply",
        header: "Action",
        cell: ({ row }) => (
          <Button
            variant="success"
            size="sm"
            onClick={() => handleReply(row.id, row.message)}
          >
            Reply
          </Button>
        ),
      },
    ],
    [data]
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
        <Card className="border-0 mt-4">
          <Card.Header>
            <h3 className="mb-0 h4">Resolution</h3>
          </Card.Header>
          <Card.Body className="p-0 pb-4">
            <Table hover responsive className="text-nowrap table-centered">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.accessorKey}>{column.header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((row) => (
                    <tr key={row.id}>
                      {columns.map((column) => (
                        <td key={column.accessorKey}>
                          {column.cell ? column.cell({ row }) : row[column.accessorKey]}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="text-center">
                      No conflicts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      {/* SupportModal */}
      <SupportModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        supportID={selectedSupportID}
        userMessage={selectedUserMessage}
        onClose={handleModalClose}
        type="resolution"
        fetchData={fetchData} // Pass fetchData function to modal
      />
    </div>
  );
};

export default Resolution;
