import React, { useState } from "react";
import { Card, Button, Image, Row, Col, Modal } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useLocation } from "react-router-dom";
import Applicant from "../../../../assets/images/avatar/person.png";
import axios from "axios";
import { showToast } from "../../../Showtoast";

// Set pdfjs worker path
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const JobApplicantCard = ({
  applicantName,
  applicantImage,
  jobTitle,
  onAcceptOffer,
  onRejectOffer,
  resumeUrl,
  jobId,
  jobSeeker,
}) => {
  const location = useLocation();
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingR, setLoadingR] = useState(false);

  const handleViewResume = () => {
    setShowResumeModal(true);
  };

  const handleCloseResumeModal = () => {
    setShowResumeModal(false);
  };

  const formattedResumeUrl = resumeUrl.startsWith("uploads/")
    ? resumeUrl.substring("uploads/".length)
    : resumeUrl;

  const acceptOffer = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://unleashified-backend.azurewebsites.net/api/v1/send-offer",
        {
          jobId: jobId,
          jobPoster: sessionStorage.getItem("UserId"),
          jobSeeker: jobSeeker,
          status: "true",
        }
      );
      setLoading(false);
      showToast(response.data.message);
    } catch (error) {
      setLoading(false);
      showToast(error.response.data.message);
    }
  };

  const rejectOffer = async () => {
    setLoadingR(true);
    try {
      const response = await axios.post(
        "https://unleashified-backend.azurewebsites.net/api/v1/send-offer",
        {
          jobId: jobId,
          jobPoster: sessionStorage.getItem("UserId"),
          jobSeeker: jobSeeker,
          status: "false",
        }
      );
      setLoadingR(false);
      showToast(response.data.message);
    } catch (error) {
      setLoadingR(false);
      showToast(error.response.data.message);
    }
  };

  return (
    <>
      <Card className="mb-4">
        <Card.Body>
          <Row className="align-items-center mb-4">
            <Col xs={6}>
              {/* Use applicantImage if available, otherwise provide a placeholder image */}
              <Image
                src={applicantImage ? applicantImage : Applicant}
                style={{ width: "100%", height: "100%" }}
                className="avatar-xs"
                alt={applicantName}
              />
            </Col>
            <Col xs={6}>
              <span>{applicantName}</span> <br />
            </Col>
          </Row>
          <h3 className="h5">Job Title: {jobTitle}</h3>
          <Row className="g-1 py-1">
            {loading ? (
              <Col xs={6} className="py-0 text-start">
                <Button
                  variant="primary"
                  className="btn-sm"
                  disabled
                  style={{ opacity: ".7" }}
                >
                  Processing
                </Button>
              </Col>
            ) : (
              <Col xs={6} className="py-0 text-start">
                <Button
                  variant="primary"
                  onClick={acceptOffer}
                  className="btn-sm"
                >
                  Send Offer
                </Button>
              </Col>
            )}
            {loadingR ? (
              <Col xs={6} className="py-0 text-end">
                <Button
                  variant="danger"
                  size="sm"
                  className="btn-sm w-100"
                  disabled
                  style={{ opacity: ".7" }}
                >
                  Processing
                </Button>
              </Col>
            ) : (
              <Col xs={6} className="py-0 text-end">
                <Button
                  variant="danger"
                  onClick={rejectOffer}
                  size="sm"
                  className="btn-sm w-100"
                >
                  Reject
                </Button>
              </Col>
            )}
          </Row>

          <Row className="g-2 py-2">
            <Col xs={12} className="py-0 text-center ">
              <Button
                variant="success"
                onClick={handleViewResume}
                size="sm"
                className="btn-sm w-100"
              >
                View Resume
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Modal show={showResumeModal} onHide={handleCloseResumeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Resume</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ height: "500px", overflowY: "auto" }}>
            {resumeUrl ? (
              <Document
                file={`https://unleashified-backend.azurewebsites.net/api/v1/get-a-resume/${formattedResumeUrl}`}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              >
                {Array.from(new Array(numPages || 0), (el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
              </Document>
            ) : (
              <p>No resume uploaded</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseResumeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default JobApplicantCard;
