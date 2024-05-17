import React, { Fragment, useState, useMemo, useEffect } from "react";
import { Card, Row, Table, Button, Spinner } from "react-bootstrap";
import axios from "axios"; // Import Axios
import { numberWithCommas } from "../../helper/utils";
import { showToast } from "../../Components/Showtoast";

const formatDate = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const day = String(dateTime.getDate()).padStart(2, "0");
  const year = dateTime.getFullYear();
  const hours = String(dateTime.getHours()).padStart(2, "0");
  const minutes = String(dateTime.getMinutes()).padStart(2, "0");
  const seconds = String(dateTime.getSeconds()).padStart(2, "0");
  const meridian = dateTime.getHours() >= 12 ? "PM" : "AM";

  return `${month}/${day}/${year}, ${hours}:${minutes}:${seconds} ${meridian}`;
};
const Resolution = () => {
  const [data, setData] = useState([]);
  const [Cloading, setCLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMessage, setViewMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://unleashified-backend.azurewebsites.net/api/v1/all-conflicts"
      );
      setData(response.data.conflicts || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

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
      {
        accessorKey: "date",
        header: "Date",
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
          >
            Completed
          </Button>
        ),
      },
    ],
    []
  );

  return (
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
        {!loading && data.length === 0 && <div>No conflicts found.</div>}
        {data.length > 0 && (
          <Table hover responsive className="text-nowrap table-centered">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.accessorKey}>{column.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
            {data && data.lenght > 0 ? data.map((row) => (
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
                      {column.accessorKey === "date" && (
                        <div>{new Date(row.createdAt).toLocaleString()}</div>
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
                          onClick={() => handleAction(row.id)}
                          disabled={row.status === "completed" || row.Cloading}
                          style={{
                            backgroundColor: "green",
                            borderColor: "#b8f7b2",
                            color: "white",
                            opacity:
                              row.status === "completed" || row.Cloading
                                ? 0.6
                                : 1,
                          }}
                        >
                          {row.Cloading ? "Processing" : "Completed"}
                        </Button>
                      )}
                    </td>
                  ))}
                </tr>
             )) : <div className="p-12">No Resolution request available</div>}
            </tbody>
          </Table>
        )}
        <div className="mt-4">{viewMessage && <div>{viewMessage}</div>}</div>
      </Card.Body>
    </Card>
  );
};

export default Resolution;
