// import node module libraries
import { Col, Row, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// import custom components
import JobListingListviewCard from "../Components/marketing/common/cards/JobListingListviewCard";

// import required data files
import JobsListingData from "../data/marketing/jobs/JobsListingData";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { showToast } from "../Components/Showtoast";

const LatestJobOpening = () => {
  const [latestJob, setLatestJob] = useState([]);
  useEffect(() => {
    const getJob = async () => {
      try {
        const response = await axios.get(
          "https://unleashified-backend.azurewebsites.net/api/v1/get-Landing-jobs"
        );
        setLatestJob(response.data.jobs);
      } catch (error) {
        showToast(error.response.message);
      }
    };
    getJob();
  }, []);

  return (
    <section className="py-lg-12 pb-8 bg-white">
      <Container>
        <Row>
          <Col xl={{ span: 8, offset: 2 }} md={12} xs={12}>
            <div className="text-center mb-8">
              <span className="text-uppercase text-primary fw-semi-bold ls-md">
                Latest Job Opening
              </span>
              <h2 className="h1 fw-bold mt-3">
                Explore remote friendly, flexible job opportunities.
              </h2>
            </div>
            {latestJob.map((item, index) => {
              return <JobListingListviewCard item={item} key={index} />;
            })}
            {/* button */}
            <div className="mt-6 text-center">
              <Link to="/jobs/listing/job-list">
                <Button variant="outline-primary">
                  Browse All Jobs Postings
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default LatestJobOpening;
