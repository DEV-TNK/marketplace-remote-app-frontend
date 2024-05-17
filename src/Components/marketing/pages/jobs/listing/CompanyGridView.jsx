import React, { Fragment, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Col, Row, Spinner } from "react-bootstrap";
import CompanyListingCard from "../../../common/cards/CompanyListingCard";
import CompanyListingGridViewCard from "../../../common/cards/CompanyListingGridViewCard";
import axios from "axios";

const CompanyGridView = ({ filteredCompanies, setTotalFilteredCompanies }) => {
  const [companiesData, setCompaniesData] = useState(filteredCompanies);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const recordsPerPage = 6;
  const pagesVisited = pageNumber * recordsPerPage;

  useEffect(() => {
    setCompaniesData(filteredCompanies);
  }, [filteredCompanies]);

  // Check if servicesData is an array and has length
  const displayRecords =
    Array.isArray(companiesData) && companiesData.length > 0
      ? companiesData
          .slice(pagesVisited, pagesVisited + recordsPerPage)
          .map((item, index) => (
            <Col lg={6} xs={12} className="mb-4" key={item.id || item._id}>
              <CompanyListingGridViewCard key={index} item={item} viewby="grid" />
            </Col>
          ))
      : null;

  // Calculate page count only if servicesData is valid
  const pageCount = Array.isArray(companiesData)
    ? Math.ceil(companiesData.length / recordsPerPage)
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
          <Row>{displayRecords || <Col>No companies found.</Col>}</Row>
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

export default CompanyGridView;
