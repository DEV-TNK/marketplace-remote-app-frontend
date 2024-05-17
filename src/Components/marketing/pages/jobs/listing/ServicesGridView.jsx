import React, { Fragment, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Col, Row, Spinner } from "react-bootstrap";
import ServiceListingGridviewCard from "../../../common/cards/ServiceListingGridviewCard";
// import JobListingGridviewCard from "../../../../../Components/marketing/common/cards/JobListingGridviewCard";
import axios from "axios";

const ServicesGridView = ({ filteredServices, setTotalFilteredServices }) => {
  const [servicesData, setServicesData] = useState(filteredServices);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const recordsPerPage = 6;
  const pagesVisited = pageNumber * recordsPerPage;

  useEffect(() => {
    setServicesData(filteredServices);
  }, [filteredServices]);

  // Check if servicesData is an array and has length
  const displayRecords =
    Array.isArray(servicesData) && servicesData.length > 0
      ? servicesData
          .slice(pagesVisited, pagesVisited + recordsPerPage)
          .map((item, index) => (
            <Col lg={6} xs={12} className="mb-4" key={item.id || item._id}>
              <ServiceListingGridviewCard key={index} item={item} viewby="grid" />
            </Col>
          ))
      : null;

  // Calculate page count only if servicesData is valid
  const pageCount = Array.isArray(servicesData)
    ? Math.ceil(servicesData.length / recordsPerPage)
    : 0;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Fragment>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Fragment>
          {error && ( // Display toast if there's an error
            <Toast>
              <Toast.Body>{error}</Toast.Body>
            </Toast>
          )}
          <Row>{displayRecords || <Col>No jobs found.</Col>}</Row>
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

export default ServicesGridView;
