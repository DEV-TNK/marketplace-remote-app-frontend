import React, { Fragment, useState, useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
// import ServiceListViewCard from "../../../common/cards/ServiceListViewCard";
import ServiceMainListViewCard from "../../../common/cards/ServiceMainListViewCard";
//import JobListingListviewCard from "../../../../../Components/marketing/common/cards/ServiceListingCard";
import axios from "axios";

const ServicesListView = ({ filteredServices, setTotalFilteredServices }) => {
  const [services, setServices] = useState(filteredServices);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const recordsPerPage = 5;
  const pagesVisited = pageNumber * recordsPerPage;

  useEffect(() => {
    setServices(filteredServices);
  }, [filteredServices]);

  const pageCount = Math.ceil((services || []).length / recordsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayServices =
    Array.isArray(services) && services.length > 0
      ? services
          .slice(pagesVisited, pagesVisited + recordsPerPage)
          .map((item, index) => {
            const key = item._id;
            return (
              <Col md={12} key={key}>
                <ServiceMainListViewCard
                  key={index}
                  item={item}
                  viewby="list"
                />
              </Col>
            );
          })
      : "No services Available";

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
            {displayServices && displayServices.length > 0 ? (
              displayServices
            ) : (
              <Col>No Service(s) found.</Col>
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

export default ServicesListView;
