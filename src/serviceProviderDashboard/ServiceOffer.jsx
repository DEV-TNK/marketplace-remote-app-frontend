import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import JobApplicantCard from "../Components/marketing/common/cards/JobApplicantCard";
import ServiceProviderProfileLayout from "./ServiceProviderProfileLayout";
import axios from "axios";
import { useGlobalContext } from "../context/AuthContext";
import ReactPaginate from "react-paginate"; // Import ReactPaginate
import { ChevronLeft, ChevronRight } from "react-feather"; // Import icons
import AxiosInterceptor from "../Components/AxiosInterceptor";

const ServiceOffer = () => {
  const { userId } = useGlobalContext();
  const [jobs, setJobs] = useState([]);
  // const [selectedJobTitle, setSelectedJobTitle] = useState(null);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const perPage = 9;
  const authFetch = AxiosInterceptor();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marketplacebackendas-test.azurewebsites.net/api/v1/get-my-applicants/${userId}`
        );
        setJobs(response.data.applicants);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const groupByJobTitle = () => {
    const jobTitles = new Set(jobs.map((job) => job.JobTitle));
    return Array.from(jobTitles);
  };

  const displayJobs = jobs
    .slice(pageNumber * perPage, (pageNumber + 1) * perPage)
    .map((job) => (
      <Col key={job.id} md={6} lg={4}>
        <JobApplicantCard
          applicantName={`${job.seekerResume.firstName} ${job.seekerResume.lastName}`}
          applicantImage={job.userImage}
          jobTitle={job.JobTitle ? job.JobTitle : "Not available"}
          resumeUrl={job.seekerResume.resumeUrl}
          jobId={job.jobId}
          jobSeeker={job.userId}
        />
      </Col>
    ));

  const pageCount = Math.ceil(jobs.length / perPage);

  return (
    <ServiceProviderProfileLayout>
      {error && <div className="text-danger">{error}</div>}
      <Row className="mb-3">
        <Col>
          <Form.Select onChange={(e) => handleSelectJob(e.target.value)}>
            <option value="">Sélectionnez les service (gigs) publiés</option>
            {groupByJobTitle().map((jobTitle) => (
              <option key={jobTitle} value={jobTitle}>
                {jobTitle}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Row>
        {jobs.length === 0 && !error && (
          <div className="text-center">Aucun candidat disponible.</div>
        )}
        {displayJobs}
        {jobs.length > perPage && (
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
      </Row>
    </ServiceProviderProfileLayout>
  );
};

export default ServiceOffer;
