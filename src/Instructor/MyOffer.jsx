import React, { useState, useEffect } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import JobCard from "../Components/marketing/common/cards/JobCard";
import InstructorProfileLayout from "./JobSeekerProfileLayout";
import axios from "axios";
import { useGlobalContext } from "../context/AuthContext";
import placeholderImage from "../assets/images/instructor/instructor-img-2.jpg";
import { showToast } from "../Components/Showtoast";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather"; // Import icons

const MyOffer = () => {
  const { userId } = useGlobalContext();
  const [offers, setOffers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const perPage = 6;
  const [Aloading, setALoading] = useState(false);
  const [Rloading, setRLoading] = useState(false);

  const handleAcceptOffer = async (offerId) => {
    setALoading(true);
    try {
      const response = await axios.post(
        "https://unleashified-backend.azurewebsites.net/api/v1/accept-reject-offer",
        {
          status: "true",
          offerId,
          userId,
        }
      );
      setALoading(false);
      showToast(response.data.message);
    } catch (error) {
      setALoading(false);
      console.error("Error accepting offer:", error);
    }
  };

  const handleRejectOffer = async (offerId) => {
    setALoading(true);
    try {
      const response = await axios.post(
        "https://unleashified-backend.azurewebsites.net/api/v1/accept-reject-offer",
        {
          status: false,
          offerId,
          userId,
        }
      );
      setALoading(false);
      showToast(response.data.message);
    } catch (error) {
      setALoading(false);
      console.error("Error rejecting offer:", error);
    }
  };

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://unleashified-backend.azurewebsites.net/api/v1/get-my-offers/${userId}`
        );
        setOffers(response.data.offerDetails || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching offers:", error);
      }
    };

    if (userId) {
      fetchOffers();
    }
  }, [userId]);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayOffers = offers
    .slice(pageNumber * perPage, (pageNumber + 1) * perPage)
    .map((offer, index) => (
      <Col key={index} md={6} lg={4}>
        <JobCard
          companyName={offer.companyName}
          jobTitle={offer.jobTitle}
          price={offer.jobSalary}
          jobSalaryFormat={offer.jobSalaryFormat}
          deliveryTime={offer.deliveryDate}
          companyImage={offer.jobPoster?.companyLogo || placeholderImage}
          onAcceptOffer={() => handleAcceptOffer(offer.offerId)}
          onRejectOffer={() => handleRejectOffer(offer.offerId)}
          Aloading={Aloading}
          Rloading={Rloading}
          currency={offer.currency}
        />
      </Col>
    ));

  const pageCount = Math.ceil(offers.length / perPage);

  return (
    <InstructorProfileLayout>
      {loading ? (
        <Row className="justify-content-center">
          <Col className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      ) : (
        <>
          {offers.length > 0 ? (
            <>
              <Row>{displayOffers}</Row>
              {offers.length > perPage && (
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
            </>
          ) : (
            <Row className="justify-content-center">
              <Col className="text-center">
                <p>No offers available.</p>
              </Col>
            </Row>
          )}
        </>
      )}
    </InstructorProfileLayout>
  );
};

export default MyOffer;

