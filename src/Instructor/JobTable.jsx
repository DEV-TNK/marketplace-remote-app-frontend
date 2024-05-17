import React, { Fragment, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import DotBadge from "../Components/elements/bootstrap/DotBadge";
import TanstackTable from "../Components/elements/advance-table/TanstackTable";
import { showToast } from "../Components/Showtoast";
import axios from "axios";

const JobTable = ({ data, datas, dataes, header, savedData }) => {
  const UserId = sessionStorage.getItem("UserId");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedJobposterId, setSelectedJobposterId] = useState(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMap, setLoadingMap] = useState({});

  const handleShow = (jobId, jobposterId, title) => {
    setSelectedJobId(jobId);
    setSelectedJobposterId(jobposterId);
    setSelectedJobTitle(title);
    setShowReviewModal(true);
  };
  const handleStarClick = (value) => {
    console.log("this is value", value);
    setRating(value);
  };

  const handleSubmitReview = async () => {
    setLoading(true);
    if (!selectedJobId || !selectedJobposterId) {
      showToast("Job ID or Jobposter ID not provided");
      return;
    }
    const reviewData = {
      jobId: selectedJobId,
      user_id: UserId,
      rating: rating,
      jobTitle: selectedJobTitle,
      jobseekerId: UserId,
      review: reviewText,
      jobposterId: selectedJobposterId,
    };

    console.log("Submitting review data:", reviewData);

    try {
      const response = await axios.post(
        "https://unleashified-backend.azurewebsites.net/api/v1/submit-reviews",
        reviewData
      );
      setLoading(false);
      console.log("Response from endpoint:", response.data);
      showToast(response.data.message);
      setShowReviewModal(false);
    } catch (error) {
      setLoading(false);
      showToast("Error submitting review");
    }
  };

  const handleDeleteJob = async (jobId) => {
    setLoadingMap((prevLoadingMap) => ({
      ...prevLoadingMap,
      [jobId]: true,
    }));

    try {
      const userId = sessionStorage.getItem("UserId");
      if (!userId) {
        showToast("User ID not found in sessionStorage");
        return;
      }

      const response = await axios.delete(
        "https://unleashified-backend.azurewebsites.net/api/v1/delete-save-job",
        {
          data: {
            userId: userId,
            jobId: jobId,
          },
        }
      );

      console.log("Response from endpoint:", response.data);
      showToast(response.data.message);
    } catch (error) {
      showToast("Error deleting job");
    } finally {
      setLoadingMap((prevLoadingMap) => ({
        ...prevLoadingMap,
        [jobId]: false,
      }));
    }
  };

  // Function to format price with currency symbol
  const formatPrice = (currencyName, priceValue) => {
    switch (currencyName) {
      case "naira":
      case "NGN":
        return `₦${priceValue}`;
      case "dollars":
      case "USD":
        return `$${priceValue}`;
      case "euros":
      case "EUR":
        return `€${priceValue}`;
      case "pounds":
      case "GBP":
        return `£${priceValue}`;
      default:
        return `₦${priceValue}`;
    }
  };

  return (
    <Fragment>
      <TanstackTable
        data={data || datas || dataes || savedData}
        columns={header.map(({ accessorKey, header }) => ({
          header: header,
          accessorKey: accessorKey,
          cell: ({ row }) => {
            if (accessorKey === "jobTitle") {
              return (
                <Link
                  to={`/jobs/listing/dashboard-job-list/?id=${row.original._id}`}
                  className="text-inherit"
                >
                  <h4 className="mb-1 text-primary-hover">
                    {row.original.jobTitle}
                  </h4>
                  <span className="text-inherit">
                    {row.original.deliveryDate}
                  </span>
                </Link>
              );
            } else if (accessorKey === "Title") {
              return (
                <Link
                  to={`/jobs/listing/?id=${row.original._id}`}
                  className="text-inherit"
                >
                  <h4 className="mb-1 text-primary-hover">
                    {row.original.jobTitle}
                  </h4>
                  <span className="text-inherit">
                    {row.original.deliveryDate}
                  </span>
                </Link>
              );
            } else if (accessorKey === "status") {
              return (
                <Fragment>
                  <DotBadge
                    bg={
                      row.original.status.toLowerCase() === "ongoing"
                        ? "warning"
                        : row.original.status.toLowerCase() === "completed"
                        ? "success"
                        : row.original.status.toLowerCase() === "pending"
                        ? "primary"
                        : ""
                    }
                  ></DotBadge>
                  {row.original.status
                    ? row.original.status.charAt(0).toUpperCase() +
                      row.original.status.slice(1)
                    : ""}
                </Fragment>
              );
            } else if (accessorKey === "paymentStatus") {
              return (
                <Fragment>
                  {row.original.paymentStatus === "paid" ? (
                    <Button variant="success" disabled>
                      Paid
                    </Button>
                  ) : row.original.paymentStatus === "pending" ? (
                    <Button variant="warning" disabled>
                      Pending
                    </Button>
                  ) : (
                    <Button variant="danger" disabled>
                      Unpaid
                    </Button>
                  )}
                </Fragment>
              );
            } else if (accessorKey === "action") {
              return (
                <Fragment>
                  <Button
                    variant="danger"
                    disabled={loadingMap[row.original._id]}
                    style={{
                      opacity: loadingMap[row.original._id] ? ".7" : "1",
                    }}
                    onClick={() => handleDeleteJob(row.original._id)}
                  >
                    {loadingMap[row.original._id]
                      ? "Deleting"
                      : "Delete Saved Job"}
                  </Button>
                </Fragment>
              );
            } else if (accessorKey === "review") {
              return (
                <Fragment>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setRating(0);
                      setReviewText("");
                      handleShow(
                        row.original._id,
                        row.original.jobPoster.jobPosterId,
                        row.original.jobTitle
                      );
                    }}
                  >
                    Post Review
                  </Button>
                </Fragment>
              );
            } else if (accessorKey === "completedDate") {
              const updatedAt = new Date(row.original.updatedAt);
              const formattedDate = updatedAt.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });
              return <Fragment>{formattedDate}</Fragment>;
            } else if (accessorKey === "companyName") {
              return <p>{row.original.jobPoster.companyName}</p>;
            } else if (accessorKey === "jobSalary") {
              return (
                <span>
                  {formatPrice(row.original.currency, row.original.jobSalary)}
                </span>
              );
            } else {
              return <span>{row.original[accessorKey]}</span>;
            }
          },
        }))}
        filter={true}
        filterPlaceholder="Search Jobs"
        pagination={true}
      />
      <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Post Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <h3 className="mb-4">Give Your Review on this Job</h3>
            <Row className="align-items-center">
              <Col xs="auto" className="text-center">
                <h6 className="">
                  Press any of the stars for your star rating
                </h6>

                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    className="text-warning"
                    onClick={() => handleStarClick(value)}
                  >
                    <i
                      className={`fa${value <= rating ? "s" : "r"} fa-star`}
                      style={{ cursor: "pointer", fontSize: "24px" }}
                    />
                  </span>
                ))}

                <span className="ms-2 fs-5">{rating}/5</span>
              </Col>
            </Row>
          </div>

          <div className="w-100 mb-3">
            <h4 className="mb-3">Write Your Review</h4>

            <Form className="position-relative">
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Write your review here..."
                  className="w-100"
                  value={reviewText}
                  onChange={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setReviewText(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setReviewText("");
              setShowReviewModal(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            disabled={loading}
            style={{ opacity: loading ? ".7" : "1" }}
            onClick={() => handleSubmitReview()}
          >
            {loading ? "Processing" : "Submit Review"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default JobTable;
