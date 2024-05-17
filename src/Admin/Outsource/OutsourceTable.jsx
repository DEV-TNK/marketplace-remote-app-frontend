import React, { Fragment, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import DotBadge from "../../Components/elements/bootstrap/DotBadge";
import TanstackTable from "../../Components/elements/advance-table/TanstackTable";
import axios from "axios";
import { showToast } from "../../Components/Showtoast";
import { useNavigate } from "react-router-dom";

const formatDate = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = dateTime.toLocaleDateString("en-US", options);
  const day = dateTime.getDate();
  const suffix =
    ["st", "nd", "rd"][((((day + 90) % 100) - 10) % 10) - 1] || "th";

  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedTime = dateTime.toLocaleTimeString("en-US", timeOptions);

  return `${formattedDate.replace(
    /\b(\d{1,2})\b/g,
    `$1${suffix}`
  )} at ${formattedTime}`;
};

const OutsourceTable = ({ jobs_data }) => {
  const [statusChanged, setStatusChanged] = useState(false);
  const navigate = useNavigate(); // Define navigate from useNavigate

  const handleMarkAsCompleted = async (jobId) => {
    try {
      const response = await axios.put(
        `https://unleashified-backend.azurewebsites.net/api/v1/admin-mark-outsource-job/${jobId}`
      );
      setStatusChanged(true);
      const message = response.data.message;
      showToast(message);
    } catch (error) {
      console.error("Error marking job as completed:", error);
      showToast('Error marking job as completed');
    }
  };

  const getStatusBadgeColor = (status) => {
    if (typeof status === 'string') {
      switch (status.toLowerCase()) {
        case "pending":
          return "warning";
        case "completed":
          return "success";
        case "rejected":
          return "fail";
        default:
          return "";
      }
    } else {
      return "";
    }
  };
  

  const handleViewClick = (id) => {
    // Handle click event for View button
    navigate(`/admin/out-source/job-single?id=${id}`); 
  };
  const columns = useMemo(
    () => [
      {
        header: "Employer",
        accessorKey: "employer",
        cell: ({ row }) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <a href="#" onClick={() => handleViewClick(row.original._id)}>
              <img
                src={row.original?.jobPoster?.companyLogo}
                alt="Company Logo"
                style={{ width: "100px", height: "auto", marginRight: "10px" }}
              />
            </a>

            <div>
              <div style={{ fontWeight: "bold" }}>
                {row.original?.jobPoster?.companyName}
              </div>
              <div>Added on {formatDate(row.original?.createdAt)}</div>
            </div>
          </div>
        ),
      },
      {
        header: "Payment",
        accessorKey: "paymentStatus",
        cell: ({ row }) => (
          <span>{ row.original?.paymentStatus}</span>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <Fragment>
            <DotBadge
              bg={getStatusBadgeColor(row.original?.status)}
            />
            {row.original?.status}
          </Fragment>
        ),
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <Button
            variant="success"
            onClick={() => handleViewClick(row.original._id)}
          >
            View
          </Button>
        ),
      },
      {
        header: "Completed",
        accessorKey: "completed",
        cell: ({ row }) => (
          <Button
            variant="success"
            onClick={() => handleMarkAsCompleted(row.original._id)} // Pass the job ID to handleMarkAsCompleted
          >
            Completed
          </Button>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => jobs_data || [], [jobs_data]);

  return (
    <Fragment>
      <TanstackTable
        data={data}
        columns={columns}
        filter={true}
        filterPlaceholder="Search Jobs"
        pagination={true}
      />
    </Fragment>
  );
};

export default OutsourceTable;
