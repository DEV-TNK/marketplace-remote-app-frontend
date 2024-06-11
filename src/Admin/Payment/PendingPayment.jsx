import React, { Fragment, useState, useMemo, useEffect } from "react";
import axios from "axios";
import { Card, Row, Table, Button, Spinner } from "react-bootstrap";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { numberWithCommas } from "../../helper/utils";
import { FaMoneyBillAlt } from "react-icons/fa";
import { showToast } from "../../Components/Showtoast";
import Pagination from "../../Components/elements/advance-table/Pagination";

const PendingPayment = () => {
  const [filtering, setFiltering] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Ploading, setPLoading] = useState(true);

  // Function to format price with currency symbol
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://marketplacebackendas-test.azurewebsites.net/api/v1/admin-all-pending-payment"
      );
      setPayments(response.data);
      setPLoading(false);
    } catch (error) {
      console.error("Error fetching pending payments:", error);
      setPLoading(false);
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
      { accessorKey: "jobTitle", header: "Job title" },
      { accessorKey: "jobAmount", header: "Job Amount" },
      {
        accessorKey: "paidAmount",
        header: "Paid Amount",
        cell: ({ getValue }) => (
          <Fragment>
            {/* <FaMoneyBillAlt style={{ marginRight: "5px" }} /> */}
            {/* {numberWithCommas(getValue())} */}
            {numberWithCommas(getValue())}
          </Fragment>
        ),
      },
      {
        accessorKey: "User.username",
        header: "Seeker Name",
      },
      {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ getValue }) => {
          return new Date(getValue()).toLocaleDateString();
        },
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <Fragment>
            <Button
              variant="outline-secondary"
              className="btn-sm"
              onClick={() => handleStatusChange(row.original.id, "rejected")}
              disabled={row.original.status === "rejected" || loading}
            >
              {loading ? "Rejecting..." : "Reject"}
            </Button>{" "}
            <Button
              variant="success"
              className="btn-sm"
              onClick={() => handleStatusChange(row.original.id, "approved")}
              disabled={row.original.status === "live" || loading}
            >
              {loading ? "Approving..." : "Approve"}
            </Button>
          </Fragment>
        ),
      },
    ],
    [loading]
  );

  const data = useMemo(() => payments, [payments]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
      rowSelection,
    },
  });

  const handleStatusChange = (paymentId, status) => {
    setLoading(true);
    axios
      .post(
        "https://unleashified-backend.azurewebsites.net/api/v1/admin-acceptorreject-payment",
        {
          pendingId: paymentId,
          status: status === "rejected" ? "false" : "true",
        }
      )
      .then((response) => {
        showToast(response.data.message);
        fetchData();
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error updating payment status:", error);
        showToast(error.response.data.message);
      });
  };

  return (
    <Card className="border-0 mt-4">
      <Card.Header>
        <h3 className="mb-0 h4">Pending Payment</h3>
      </Card.Header>
      <Card.Body>
        <Row className="align-items-center">
          {/* Your FormSelect components */}
        </Row>
      </Card.Body>
      <Card.Body className="p-0 pb-4">
        {Ploading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Fragment>
            {payments && payments.length > 0 ? (
              <Fragment>
                <Table hover responsive className="text-nowrap table-centered">
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Pagination
                  itemsPerPage={table.getState().pagination.pageSize}
                  totalItems={table.getCoreRowModel().rows.length}
                  paginate={table.setPageIndex}
                  currentPage={table.getState().pagination.pageIndex + 1}
                />
              </Fragment>
            ) : (
              <div className="p-12">No Pending Payments have been posted</div>
            )}
          </Fragment>
        )}
      </Card.Body>
    </Card>
  );
};

export default PendingPayment;
