import React, { Fragment, useEffect, useState } from "react";
import { Col, Row, Container, Card, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageHeading from "../../../../../Components/marketing/common/page-headings/PageHeading";

import Avatar from "../../../../../assets/images/instructor/instructor-img-4.jpg";
import companyImg from "../../../../../assets/images/job/job-brand-logo/amazon.svg";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import axios from "axios";

import { useLocation, useNavigate } from "react-router-dom";
import { showToast } from "../../../../Showtoast";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const ApplyForJob = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userId = sessionStorage.getItem("UserId");
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const jobId = queryParam.get("id");
  useEffect(() => {
    const getResume = async () => {
      try {
        const response = await axios.post(
          `https://unleashified-backend.azurewebsites.net/api/v1/apply-for-job`,
          {
            userId: userId,
            jobId: jobId,
          }
        );
        // setUserDetails(response.data.userDetails);
        const resumeUrlWithoutUploads =
          response.data.userDetails.resumeUrl.replace("uploads/", "");

        setUserDetails({
          ...response.data.userDetails,
          resumeUrl: resumeUrlWithoutUploads, // Update the userDetails with the modified resume URL
        });
        setJobDetails(response.data.getJobDetails);
      } catch (error) {
        console.log(error);
      }
    };
    getResume();
  }, []);

  const submitApplication = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://unleashified-backend.azurewebsites.net/api/v1/submit-job-application",
        {
          userId: userId,
          jobId: jobId,
        }
      );
      setLoading(false);
      showToast(response.data.message);
      navigate("/jobs/listing/job-list/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      showToast(error.response.data.message);
    }
  };

  const SearchActivity = async ({ name }) => {
    const userId = sessionStorage.getItem("UserId") || null;
    const userEmail = sessionStorage.getItem("email") || null;
    try {
      const response = await axios.post(
        "https://unleashified-backend.azurewebsites.net/api/v1/create-activity",
        {
          UserAction: name ? name : null,
          UserId: userId,
          UserEmail: userEmail,
          ActionType: "Job-Application",
        }
      );
      console.log("this is the service response", response.data);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <Fragment>
      {/* Page header */}
      <PageHeading pagetitle="Apply for this Job" />
      <Container>
        <Row>
          {/* Resume Card */}
          <Col lg={8} md={12} sm={12} className="mt-lg-3">
            <Card className="mb-3">
              <Card.Body>
                <h3 className="mb-3">Resume</h3>
                <div style={{ height: "500px", overflowY: "auto" }}>
                  {userDetails ? (
                    <Document
                      file={`https://unleashified-backend.azurewebsites.net/api/v1/get-a-resume/${userDetails.resumeUrl}`}
                      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    >
                      {Array.from(new Array(numPages || 0), (el, index) => (
                        <Page
                          key={`page_${index + 1}`}
                          pageNumber={index + 1}
                        />
                      ))}
                    </Document>
                  ) : (
                    <p>No resume uploaded</p>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Buttons */}
          <Col
            lg={4}
            md={12}
            sm={12}
            className="bg-white mt-lg-n12 mb-4 rounded-2"
          >
            <Card.Body>
              <h3 className="mb-3 mt-3">Applier Profile</h3>
              <Row>
                <Col xs={12} className="mt-3">
                  <Row>
                    <Col>
                      <p>
                        <strong>Name:</strong>{" "}
                        {userDetails
                          ? userDetails.firstName + " " + userDetails.lastName
                          : ""}
                      </p>
                      <p>
                        <strong>Gender:</strong>{" "}
                        {userDetails ? userDetails.gender : ""}
                      </p>
                      <p>
                        <strong>Portfolio:</strong>{" "}
                        {userDetails ? userDetails.headline : ""}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>
                        <strong>Job Type:</strong>{" "}
                        {userDetails ? userDetails.workType : ""}
                      </p>
                      <p>
                        <strong>Location:</strong>{" "}
                        {userDetails ? userDetails.workLocation : ""}
                      </p>
                      <p>
                        <strong>Availability to Join:</strong>{" "}
                        {userDetails ? userDetails.workAvailability : ""}
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
            <hr />
            <Card.Body>
              <h3 className="mb-3">Applying for</h3>
              <div>
                <Row>
                  <Col xs={12}>
                    <p>
                      <strong>Job Title:</strong>{" "}
                      {jobDetails ? jobDetails.jobTitle : ""}
                    </p>
                    <p>
                      <strong>Price :</strong>{" "}
                      {jobDetails ? jobDetails.jobSalary : ""}
                    </p>
                    <p>
                      <strong>Work Mode :</strong>{" "}
                      {jobDetails ? jobDetails.jobType : ""}
                    </p>
                    <p>
                      <strong>Location:</strong>{" "}
                      {jobDetails ? jobDetails.jobLocation : ""}
                    </p>
                    <p>
                      <strong>Delivery Date:</strong>{" "}
                      {jobDetails ? jobDetails.deliveryDate : ""}
                    </p>
                  </Col>
                </Row>
                <p></p>
                <p>
                  <strong>Job Description:</strong>{" "}
                  {jobDetails ? jobDetails.jobDescription : ""}
                </p>
              </div>
            </Card.Body>
            <hr />

            <div className="p-4">
              <Link to="/jobs/update-resume/">
                <Button variant="primary" className="mb-3 d-block w-100">
                  Edit Resume
                </Button>
              </Link>

              {loading ? (
                <Button
                  variant="success"
                  className="d-block w-100"
                  style={{ opacity: 0.7 }}
                  disabled
                >
                  Processing
                </Button>
              ) : (
                <Button
                  variant="success"
                  className="d-block w-100"
                  onClick={() => {
                    submitApplication();
                    SearchActivity({ name: jobDetails.department });
                  }}
                >
                  Submit Application
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ApplyForJob;
