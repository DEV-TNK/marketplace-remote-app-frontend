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
  Spinner,
  Tab,
  Nav,
} from "react-bootstrap";
import { FormSelect } from "../Components/elements/form-select/FormSelect";
import GlobalFilter from "../Components/elements/advance-table/GlobalFilter";
import Pagination from "../Components/elements/advance-table/Pagination2";
import LevelIcon from "../Components/marketing/common/miscellaneous/LevelIcon";
import InstructorProfileLayout from "./JobSeekerProfileLayout";
import Icon from "@mdi/react";
import { mdiStar } from "@mdi/js";
import axios from "axios"; // Import axios library
import { numberWithCommas } from "../helper/utils";
import { useGlobalContext } from "../context/AuthContext";
import JobTable from "./JobTable";

const MyJob = () => {
  const [filtering, setFiltering] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [jobs, setJobs] = useState([]);
  const [ongoingJobs, setOngoingJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const allJobsHeader = [
    { accessorKey: "jobTitle", header: "Job Title" },
    { accessorKey: "jobSalary", header: "Job Salary" },
    { accessorKey: "deliveryDate", header: "Delivery Date" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "paymentStatus", header: "Payment Status" },
  ];
  const savedJobsHeader = [
    { accessorKey: "Title", header: "Title" },
    { accessorKey: "jobSalary", header: "Job Salary" },
    { accessorKey: "jobLocation", header: "Job Location" },
    { accessorKey: "jobType", header: "Job Type" },
    { accessorKey: "deliveryDate", header: "Delivery Date" },
    { accessorKey: "action", header: "Action" },
  ];

  const ongoingJobsHeader = [
    { accessorKey: "jobTitle", header: "Job Title" },
    { accessorKey: "companyName", header: "Company Name" },
    { accessorKey: "jobSalary", header: "Job Salary" },
    { accessorKey: "deliveryDate", header: "Delivery Date" },
    { accessorKey: "paymentStatus", header: "Payment Status" },
  ];

  const completedJobsHeader = [
    { accessorKey: "jobTitle", header: "Job Title" },
    { accessorKey: "companyName", header: "Company Name" },
    { accessorKey: "jobSalary", header: "Job Salary" },
    { accessorKey: "review", header: "Review" },
    { accessorKey: "completedDate", header: "Completed Date" },
    { accessorKey: "paymentStatus", header: "Payment Status" },
  ];

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const userId = sessionStorage.getItem("UserId");
        const response = await axios.get(
          `https://unleashified-backend.azurewebsites.net/api/v1/seeker-jobs/${userId}`
        );
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching all jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchSavedJobs = async () => {
      try {
        const userId = sessionStorage.getItem("UserId");
        const response = await axios.get(
          `https://unleashified-backend.azurewebsites.net/api/v1/get-my-saved-jobs/${userId}`
        );

        if (response.data.savedJobs && response.data.savedJobs.length > 0) {
          setSavedJobs(response.data.savedJobs[0].jobs);
        } else {
          console.log("No saved jobs found.");
        }
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
    };

    const fetchOngoingJobs = async () => {
      try {
        const userId = sessionStorage.getItem("UserId");
        const response = await axios.get(
          `https://unleashified-backend.azurewebsites.net/api/v1/seeker-ongoing-jobs/${userId}`
        );
        setOngoingJobs(response.data);
      } catch (error) {
        console.error("Error fetching ongoing jobs:", error);
      }
    };

    const fetchCompletedJobs = async () => {
      try {
        const userId = sessionStorage.getItem("UserId");
        const response = await axios.get(
          `https://unleashified-backend.azurewebsites.net/api/v1/seeker-completed-jobs/${userId}`
        );
        setCompletedJobs(response.data);
      } catch (error) {
        console.error("Error fetching completed jobs:", error);
      }
    };

    fetchAllJobs();
    fetchSavedJobs();
    fetchOngoingJobs();
    fetchCompletedJobs();
  }, []);

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
    <InstructorProfileLayout>
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
                  <Nav.Link eventKey="savedjob" className="mb-sm-3 mb-md-0">
                    Saved Jobs
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="ongoingjob" className="mb-sm-3 mb-md-0">
                    Ongoing Jobs
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="completedjob" className="mb-sm-3 mb-md-0">
                    Completed Jobs
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
                <Tab.Pane eventKey="savedjob" className="pb-4">
                  <JobTable
                    header={savedJobsHeader}
                    savedData={savedJobs}
                    // price={savedJobs.jobSalary}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="ongoingjob" className="pb-4">
                  <JobTable
                    header={ongoingJobsHeader}
                    datas={ongoingJobs}
                    price={ongoingJobs.jobSalary}
                  />
                </Tab.Pane>

                {/* Completed Jobs Tab Pane */}
                <Tab.Pane eventKey="completedjob" className="pb-4">
                  <JobTable
                    header={completedJobsHeader}
                    dataes={completedJobs}
                    completedJobId={
                      completedJobs.length > 0 ? completedJobs[0]._id : null
                    }
                  />
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </Card>
    </InstructorProfileLayout>
  );
};

export default MyJob;
