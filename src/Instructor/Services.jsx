import React, { useState, useEffect } from "react";
import { Card, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import ServiceListViewCard from "../Components/marketing/common/cards/ServiceListViewCard";
// import ServiceListingCard from "../Components/marketing/common/cards/ServiceListingCard";
import { useGlobalContext } from "../context/AuthContext";
import { showToast } from "../Components/Showtoast";
import axios from "axios";
import InstructorProfileLayout from "../Instructor/JobSeekerProfileLayout";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather"; // Import icons

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const perPage = 5;

  const userId = sessionStorage.getItem("UserId");

  useEffect(() => {
    if (!userId) {
      console.log("User ID not found in session storage");
      return;
    }

    const fetchServices = async () => {
      try {
        setLoading(true); // Set loading to true before making the API request
        const response = await axios.get(
          `https://unleashified-backend.azurewebsites.net/api/v1/get-my-services/${userId}`
        );
        setServices(response.data.myServices);
      } catch (error) {
        console.error("Error fetching services:", error);
        showToast(error.response?.data?.message || "Failed to fetch services");
      } finally {
        setLoading(false); // Set loading back to false after API request completes
      }
    };

    fetchServices();
  }, [userId]);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayRecords = services
    .slice(pageNumber * perPage, (pageNumber + 1) * perPage)
    .map((item, index) => <ServiceListViewCard item={item} key={index} />);

  const pageCount = Math.ceil(services.length / perPage);

  return (
    <InstructorProfileLayout>
      <Card className="border-0">
        <Card.Header className="d-lg-flex align-items-center justify-content-between">
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Services</h3>
            <p className="mb-0">You have full control to manage your own services.</p>
          </div>
          <div>
            <Link to="/jobs/post-a-service" className="btn btn-outline-primary btn-sm">
              Post a Service
            </Link>
          </div>
        </Card.Header>
        <Card.Body>
          <Col md={12} xs={12}>
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : displayRecords.length > 0 ? (
              displayRecords
            ) : (
              <p>No matching records found.</p>
            )}
            {/* Pagination */}
            {services.length > perPage && (
              <ReactPaginate
                previousLabel={<ChevronLeft size="14px" />}
                nextLabel={<ChevronRight size="14px" />}
                pageCount={pageCount}
                onPageChange={handlePageChange}
                containerClassName={"pagination justify-content-center mb-0"}
                previousLinkClassName={"page-link mx-1 rounded"}
                nextLinkClassName={"page-link mx-1 rounded"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link mx-1 rounded"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"active"}
              />
            )}
          </Col>
        </Card.Body>
      </Card>
    </InstructorProfileLayout>
  );
};

export default Services;
