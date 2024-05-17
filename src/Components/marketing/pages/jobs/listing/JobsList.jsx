import React, { Fragment, useEffect, useState } from "react";
import { Col, Row, Container, Tab } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

import JobSearchBox from "../../../../../Components/marketing/common/jobs/JobSearchBox";
import JobFilters from "./JobFilters";
import GridListViewButton from "../../../../../Components/elements/miscellaneous/GridListViewButton";
import JobsListView from "./JobsListView";
import JobsGridView from "./JobsGridView";
import FormSelect from "../../../../elements/form-select/FormSelect";

const JobsList = () => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [totalFilteredJobs, setTotalFilteredJobs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (filterData) => {
    console.log("this is job list filter", filterData);
    setFilteredJobs(filterData);
    setCurrentPage(1);
    setTotalFilteredJobs(filterData.length);
  };

  useEffect(() => {
    fetchData(); // Fetch initial data
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const userId = sessionStorage.getItem("UserId") || null;
      const userEmail = sessionStorage.getItem("email") || null;
      try {
        const response = await axios.post(
          "https://unleashified-backend.azurewebsites.net/api/v1/create-activity",
          {
            UserAction: "Job-Page",
            UserId: userId,
            UserEmail: userEmail,
            ActionType: "View-Page",
          }
        );
        console.log("this is the service response", response.data);
      } catch (error) {
        console.log("error");
      }
    };
    fetch();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://unleashified-backend.azurewebsites.net/api/v1/all-jobs"
      );

      if (response.data && Array.isArray(response.data.jobs)) {
        setFilteredJobs(response.data.jobs);
        setTotalFilteredJobs(response.data.jobs.length);
      } else {
        setFilteredJobs([]);
        setTotalFilteredJobs(0);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setFilteredJobs([]);
      setTotalFilteredJobs(0);
    }
  };

  const startIndex = (currentPage - 1) * 9 + 1;

  // Calculate the ending index for the current page
  let endIndex = startIndex + 8;
  if (endIndex > totalFilteredJobs) {
    endIndex = totalFilteredJobs;
  }

  // Calculate the displayed count
  const displayedCoursesCount = endIndex - startIndex + 1;
  return (
    <Fragment>
      <section className="py-8 bg-light">
        <Container>
          <Row>
            <Col lg={8} md={10} xs={12}>
              <h1>Browse All Available Jobs </h1>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-8 bg-white">
        <Container>
          <Row>
            <Col md={4} xl={3}>
              <JobFilters onFilterChange={handleFilterChange} />
            </Col>
            <Col xl={9} md={8} className="mb-6 mb-md-0">
              <Tab.Container defaultActiveKey="grid">
                <Row className="align-items-center mb-4">
                  <Col xs>
                    <p className="mb-0">
                      {filteredJobs ? filteredJobs.length + " Jobs" : ""}
                    </p>
                  </Col>
                  <Col xs="auto">
                    <div className="d-flex ">
                      <GridListViewButton keyGrid="grid" keyList="list" />
                    </div>
                  </Col>
                </Row>
                <Tab.Content>
                  <Tab.Pane eventKey="list" className="pb-4 px-0 react-code">
                    <JobsListView
                      filteredJobs={filteredJobs}
                      setTotalFilteredJobs={setTotalFilteredJobs}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="grid" className="pb-4 px-0">
                    <JobsGridView
                      filteredJobs={filteredJobs}
                      setTotalFilteredJobs={setTotalFilteredJobs}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default JobsList;
