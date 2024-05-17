import React, { Fragment, useState, useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import JobListingListviewCard from "../../../../../Components/marketing/common/cards/JobListingListviewCard";
import axios from "axios";

const JobsListView = ({ filteredJobs, setTotalFilteredJobs }) => {
  const [jobs, setJobs] = useState(filteredJobs);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const recordsPerPage = 5;
  const pagesVisited = pageNumber * recordsPerPage;
  
  useEffect(() => {
    setJobs(filteredJobs);
  }, [filteredJobs]);
  
  const pageCount = Math.ceil((jobs || []).length / recordsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayJobs = Array.isArray(jobs) && jobs.length > 0 ? (
    jobs
      .slice(pagesVisited, pagesVisited + recordsPerPage)
      .map((item, index) => {
        const key = item.jobId || item._id; // Use _id if jobId is not available
        return (
          <Col md={12} key={key}>
            <a href={`/job/${item.jobId}`} className="job-link"> {/* Wrap entire JobListingListviewCard component */}
              <JobListingListviewCard key={index} item={item} viewby="list" />
            </a>
          </Col>
        );
      })
  ) : "No Jobs Available";
  

  return (
    <Fragment>
      {loading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {!loading && (
        <Fragment>
          <Row>
            {displayJobs && displayJobs.length > 0 ? (
              displayJobs
            ) : (
              <Col>No Job(s) found.</Col>
            )}
          </Row>
          <ReactPaginate
            previousLabel={<ChevronLeft size="14px" />}
            nextLabel={<ChevronRight size="14px" />}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"justify-content-center mb-0 pagination"}
            previousLinkClassName={"page-link mx-1 rounded"}
            nextLinkClassName={"page-link mx-1 rounded"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link mx-1 rounded"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"active"}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default JobsListView;
