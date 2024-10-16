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
import OutSourceJobTable from "./OutSourceJobTable";
import ProviderProfileLayout from "./ServiceProviderProfileLayout";
import Icon from "@mdi/react";
import { mdiStar } from "@mdi/js";
import axios from "axios"; // Import axios library
import { numberWithCommas } from "../helper/utils";
import { useGlobalContext } from "../context/AuthContext";

const OutsourceJobs = () => {
  const [filtering, setFiltering] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [jobs, setJobs] = useState([]);
  const [ongoingJobs, setOngoingJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const allJobsHeader = [
    { accessorKey: "title", header: "Job Title" },
    { accessorKey: "numberOfPerson", header: "Number" },
    { accessorKey: "type", header: "Type" },
    { accessorKey: "format", header: "Format" },
    { accessorKey: "status", header: "Status" },
    // { accessorKey: "paymentStatus", header: "Payment Status" },
  ];

  const completedJobsHeader = [
    { accessorKey: "title", header: "Job Title" },
    { accessorKey: "numberOfPerson", header: "Number" },
    { accessorKey: "type", header: "Type" },
    { accessorKey: "format", header: "Format" },
    { accessorKey: "completedDate", header: "Completed Date" },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const userId = sessionStorage.getItem("UserId");
        const response = await axios.get(
          `https://marketplacebackendas-test.azurewebsites.net/api/v1/get-my-outsource-job/${userId}`
        );
        setJobs(response.data.jobs);

        setCompletedJobs(response.data.jobs);
        console.log(response.data.jobs.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
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
                {/* <Nav.Item>
                  <Nav.Link eventKey="ongoingjob" className="mb-sm-3 mb-md-0">
                    Ongoing Jobs
                  </Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                  <Nav.Link eventKey="completedjob" className="mb-sm-3 mb-md-0">
                    Completed jobs
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Header>
              <div className="mb-3 mb-lg-0">
                <div className="">
                  <div className=" d-sm-flex justify-content-between">
                    <h3 className="mb-0">Outsource Jobs</h3>
                    <Link
                      className="btn btn-primary "
                      to="/jobs/outsource-a-job/"
                    >
                      Create Outsource job
                    </Link>
                  </div>
                  <p className="mb-0">
                    Manage your outsourced job and its update like live, draft,
                    and insights.
                  </p>
                  <Link to="/jobs/outsource/">
                    Read more about meaning of outsource job
                  </Link>
                </div>
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
                    <OutSourceJobTable header={allJobsHeader} data={jobs} />
                  )}
                </Tab.Pane>

                <Tab.Pane eventKey="completedjob" className="pb-4">
                  <OutSourceJobTable
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

export default OutsourceJobs;
