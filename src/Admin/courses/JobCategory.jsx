import React, { Fragment, useMemo, useState, useEffect } from "react";
import { Col, Row, Card, Breadcrumb, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import TanstackTable from "../../Components/elements/advance-table/TanstackTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddNewCategoryPopup from "./AddNewCategoryPopup";

const JobCategory = () => {
  const [jobCategories, setJobCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobCategories = async () => {
      try {
        const response = await axios.get(
          "https://unleashified-backend.azurewebsites.net/api/v1/admin-jobCategory"
        );
        setJobCategories(response.data.mostPopularCategories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job categories:", error);
        setLoading(false);
      }
    };

    fetchJobCategories();
  }, []);

  const handleCategoryClick = async (_id) => {
    navigate(`/admin/jobs/category-single/?name=${_id}`);
  };

  const columns = useMemo(
    () => [
      {
        id: "serialNumber",
        header: "S/N",
        cell: ({ row }) => <div className="px-1">{row.index + 1}</div>,
      },
      {
        accessorKey: "_id",
        header: "Category",
        cell: ({ row }) => (
          <button
            onClick={() => handleCategoryClick(row.original._id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              margin: 0,
            }}
          >
            {row.original._id}
          </button>
        ),
      },
      { accessorKey: "totalJobs", header: "Total Jobs" },
      { accessorKey: "averageSalary", header: "Average Salary" },
      { accessorKey: "OngoingJobs", header: "Ongoing Jobs" },
      { accessorKey: "completedJobs", header: "Completed Jobs" },
    ],
    [navigate]
  );

  const data = useMemo(() => jobCategories, [jobCategories]);

  return (
    <Fragment>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Job Category</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Jobs</Breadcrumb.Item>
                <Breadcrumb.Item active>Job Category</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </Col>
      </Row>

      {/* Render Spinner while loading */}
      {loading ? (
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="d-flex justify-content-center mt-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col lg={12} md={12} sm={12}>
            <Card>
              <Card.Body className="p-0">
                <TanstackTable
                  data={data}
                  columns={columns}
                  filter={true}
                  filterPlaceholder="Search Job Category"
                  pagination={true}
                  showRowNumber={true}
                />
                {data && data.length > 0 ? (
                  data.map((row) => (
                    // your code for rendering each row goes here
                    <div key={row._id}>Row Data</div>
                  ))
                ) : (
                  <div className="p-12">No Job Category found</div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default JobCategory;
