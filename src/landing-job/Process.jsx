import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Process = () => {
  const navigate = useNavigate();

  const handleApplyNow = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const role = sessionStorage.getItem("role");

    if (accessToken && role === "provider") {
      // If the user is logged in and has the role of provider, redirect to the job posting page
      navigate("/jobs/post-a-job");
    } else {
      // If the user is not logged in or does not have the role of provider, redirect to the sign-in page
      navigate("/authentication/signin");
    }
  };

  return (
    <section className="py-lg-14 pt-8 py-10 bg-white">
      {/* container */}
      <Container>
        <Row>
          <Col xl={{ span: 10, offset: 1 }} md={12} xs={12}>
            <Row className="text-center">
              {/* col */}
              <Col md={12} className="px-lg-10 mb-8 mt-6">
                <span className="text-uppercase text-primary fw-semi-bold ls-md">
                  Job Upload Process
                </span>
                {/* heading */}
                <h2 className="h1 fw-bold mt-3">How It Works</h2>
              </Col>
            </Row>
            <Row className="gy-6">
              {/* col */}
              <Col md={4} sm={12}>
                <div className=" text-center">
                  {/* icon */}
                  <div className="icon-shape icon-lg border border-primary border-2 fs-3 rounded-circle mb-4 process-line text-primary smooth-shadow-md">
                    {" "}
                    1
                  </div>
                  {/* heading */}
                  <h3>Click on 'Post a job' </h3>
                  {/* text */}
                  <p className="mb-0 px-4">
                    Fill in the details of the job be sure to include your
                    location restrictions if you have em!
                  </p>
                </div>
              </Col>
              {/* col */}
              <Col md={4} sm={12}>
                <div className=" text-center">
                  {/* icon */}
                  <div className="icon-shape icon-lg border border-primary border-2 fs-3 rounded-circle mb-4 process-line text-primary smooth-shadow-md">
                    2
                  </div>
                  {/* heading */}
                  <h3>Review </h3>
                  {/* text */}
                  <p className="mb-0 px-2">
                    Preview your job draft wordings and details before posting
                    so as to be sure to attract the right talents, experience
                    and service provider applying for the job.
                  </p>
                </div>
              </Col>
              {/* col */}
              <Col md={4} sm={12}>
                <div className=" text-center">
                  {/* icon */}
                  <div className="icon-shape icon-lg border border-primary border-2 fs-3 rounded-circle mb-4 text-primary smooth-shadow-md">
                    3
                  </div>
                  {/* heading */}
                  <h3>Submit </h3>
                  {/* text */}
                  <p className="mb-0 px-3">
                    Submit your job post and watch as great talents apply.
                  </p>
                </div>
              </Col>
              {/* button */}
              <Col sm={12} className="mt-8 text-center">
                <Button onClick={handleApplyNow}>Apply Now</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Process;
