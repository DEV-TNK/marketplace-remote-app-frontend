import React, { Fragment, useState, useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import CompanyListingCard from "../../../common/cards/CompanyListingCard";



const CompanyListView = ({ filteredCompanies, setTotalFilteredCompanies }) => {
    const [companies, setCompanies] = useState(filteredCompanies);
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const recordsPerPage = 5;
    const pagesVisited = pageNumber * recordsPerPage;
  
    useEffect(() => {
      setCompanies(filteredCompanies);
    }, [filteredCompanies]);
  
    const pageCount = Math.ceil((companies || []).length / recordsPerPage);
  
    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
  
    const displayCompanies =
      Array.isArray(companies) && companies.length > 0
        ? companies
            .slice(pagesVisited, pagesVisited + recordsPerPage)
            .map((item, index) => {
              const key = item._id;
              return (
                <Col md={12} key={key}>
                  <CompanyListingCard
                    key={index}
                    item={item}
                    viewby="list"
                  />
                </Col>
              );
            })
        : "No company Available";
  
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
              {displayCompanies && displayCompanies.length > 0 ? (
                displayCompanies
              ) : (
                <Col>No Company found.</Col>
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
  

export default CompanyListView