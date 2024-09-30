import React, { useState, useMemo, useEffect } from "react";
import { Card, Spinner, Table, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import SupportModal from "../Support/SupportModal"; 

const Support = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSupportID, setSelectedSupportID] = useState(null);
  const [selectedUserMessage, setSelectedUserMessage] = useState("");

  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://marketplacebackendas-test.azurewebsites.net/api/v1/all-contact-us"
      );
      return response.data.contactUs || [];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const handleReply = (supportID, userMessage) => {
    setSelectedSupportID(supportID);
    setSelectedUserMessage(userMessage);
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
      { accessorKey: "firstName", header: "Prénom" },
      { accessorKey: "lastName", header: "Nom de famille" },
      { accessorKey: "email", header: "E-mail" },
      { accessorKey: "contact", header: "Contact" },
      { accessorKey: "reason", header: "Raison" },
      {
        accessorKey: "message",
        header: "du message Action",
        cell: ({ row }) =>
          row.message.length > 20 ? (
            <span
              title={row.message}
              className="mb-1 text-primary-hover cursor-pointer"
            >
              {row.message.slice(0, 20)}...
            </span>
          ) : (
            row.message
          ),
      },
      { accessorKey: "status", header: "Statut" },
      {
        accessorKey: "reply",
        header: "Action",
        cell: ({ row }) => (
          <Button
            variant="success"
            size="sm"
            onClick={() => handleReply(row.id, row.message)}
          >
            Réponse
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <Card className="border-0 mt-4">
      <Card.Header>
        <h3 className="mb-0 h4">Assistance</h3>
      </Card.Header>
      <Card.Body>
        <Table hover responsive className="text-nowrap table-centered">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.accessorKey}>{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </td>
              </tr>
            ) : data.length > 0 ? (
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
                  No Support requests available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>

      {/* SupportModal */}
      <SupportModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        supportID={selectedSupportID}
        userMessage={selectedUserMessage}
        onClose={handleModalClose}
      />
    </Card>
  );
};

export default Support;
