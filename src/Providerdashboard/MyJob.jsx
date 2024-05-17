import React, { Fragment, useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash, Edit, MoreVertical } from "react-feather";
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
import {
  Card,
  Row,
  Col,
  Dropdown,
  Image,
  Badge,
  Table,
  ListGroup,
  Tab,
  Nav,
  Spinner, // Import Spinner from React Bootstrap
} from "react-bootstrap";
import { FormSelect } from "../Components/elements/form-select/FormSelect";
import GlobalFilter from "../Components/elements/advance-table/GlobalFilter";
import Pagination from "../Components/elements/advance-table/Pagination";
import LevelIcon from "../Components/marketing/common/miscellaneous/LevelIcon";
import JobTable from "./JobTable";
import ProviderProfileLayout from "./ProviderProfileLayout";
import Icon from "@mdi/react";
import { mdiStar } from "@mdi/js";
import axios from "axios"; // Import axios library
import { numberWithCommas } from "../helper/utils";
import { useGlobalContext } from "../context/AuthContext";

const MyJob = () => {
  const [filtering, setFiltering] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [jobs, setJobs] = useState([]);
  const [ongoingJobs, setOngoingJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const ongoingJobsHeader = [
    { accessorKey: "jobTitle", header: "Job Title" },
    { accessorKey: "jobSalary", header: "Job Salary" },
    { accessorKey: "deliveryDate", header: "Delivery Date" },
    { accessorKey: "action", header: "Action" },
    { accessorKey: "paymentStatus", header: "Payment Status" },
  ];

  const completedJobsHeader = [
    { accessorKey: "jobTitle", header: "Job Title" },
    { accessorKey: "jobSalary", header: "Job Salary" },
    { accessorKey: "userDetails", header: "User Name" },
    { accessorKey: "review", header: "Review" },
    { accessorKey: "completedDate", header: "Completed Date" },
    { accessorKey: "paymentStatus", header: "Payment Status" },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const userId = sessionStorage.getItem("UserId");
        const response = await axios.get(
          `https://unleashified-backend.azurewebsites.net/api/v1/get-provider-jobs/${userId}`
        );
        setJobs(response.data.jobs);
        setOngoingJobs(response.data.OngoingJobs);
        setCompletedJobs(response.data.completedJob);
        console.log(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const allJobsHeader = [
    { accessorKey: "jobTitle", header: "Job Title" },
    { accessorKey: "jobSalary", header: "Job Salary" },

    { accessorKey: "deliveryDate", header: "Delivery Date" },
    { accessorKey: "status", header: "Status" },
    // { accessorKey: "paymentStatus", header: "Payment Status" },
  ];

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="btn-icon btn btn-ghost btn-sm rounded-circle"
    >
      {children}
    </Link>
  ));

  return (
    <ProviderProfileLayout>
      <Card className="border-0">
        <Tab.Container defaultActiveKey="all">
          <Card>
            <Card.Header className="border-bottom-0 p-0 bg-white">
              <Nav className="nav-lb-tab">
                <Nav.Item>
                  <Nav.Link eventKey="all" className="mb-sm-3 mb-md-0">
                    All
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="ongoingjob" className="mb-sm-3 mb-md-0">
                    Ongoing Jobs
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="completedjob" className="mb-sm-3 mb-md-0">
                    Completed jobs
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Header>
              <div className="mb-3 mb-lg-0">
                <h3 className="mb-0">Jobs</h3>
                <p className="mb-0">
                  Manage your job and its update like live, draft, and insight.
                </p>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <Tab.Content>
                <Tab.Pane eventKey="all" className="pb-4">
                  {isLoading ? (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ minHeight: "200px" }}
                    >
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : (
                    <JobTable header={allJobsHeader} data={jobs} />
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="ongoingjob" className="pb-4">
                  <JobTable
                    header={ongoingJobsHeader}
                    data={ongoingJobs}
                    jobId={ongoingJobs._id}
                    price={jobs.price}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="completedjob" className="pb-4">
                  <JobTable
                    header={completedJobsHeader}
                    data={completedJobs}
                    jobId={completedJobs._id}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </Card>
    </ProviderProfileLayout>
  );
};

export default MyJob;
