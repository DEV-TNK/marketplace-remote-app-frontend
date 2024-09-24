import React, { Fragment, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import DotBadge from "../Components/elements/bootstrap/DotBadge";
import TanstackTable from "../Components/elements/advance-table/TanstackTable";
import { PaystackButton } from "react-paystack";
import { usePaystackPayment } from "react-paystack";
import PaystackPop from "@paystack/inline-js";
import { PaystackConsumer } from "react-paystack";
import { showToast } from "../Components/Showtoast";
import axios from "axios";
import { toast } from "react-toastify";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

const GigTable = ({ data, header }) => {
  const emailUser = sessionStorage.getItem("email");
  const UserId = sessionStorage.getItem("UserId");
  const [loading, setLoading] = useState(false);
  const [loadingC, setLoadingC] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedGigId, setSelectedGigId] = useState(null);
  const [selectedJobSeekerId, setSelectedJobSeekerId] = useState(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState(null);
  const [Rloading, setRLoading] = useState(false);
  const [completedJobs, setCompletedJobs] = useState({});
  const [loadingBookings, setLoadingBookings] = useState({});

  const markCompleted = async (bookingId) => {
    try {
      // console.log("Start marking complete:", bookingId);
      setLoadingBookings((prev) => ({
        ...prev,
        [bookingId]: true,
      }));

      const response = await axios.put(
        `https://unleashified-backend.azurewebsites.net/api/v1/complete-service-request`,
        { id: bookingId }
      );

      if (response.status === 200) {
        setCompletedJobs((prev) => ({
          ...prev,
          [bookingId]: true,
        }));
        showToast("Gig Marked Complete");
      }
    } catch (error) {
      console.error("Error completing the booking:", error);
    } finally {
      setLoadingBookings((prev) => ({
        ...prev,
        [bookingId]: false,
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

  const handleShow = (jobSeekerId, jobId, title) => {
    setSelectedGigId(jobId);
    setSelectedJobSeekerId(jobSeekerId);
    setSelectedJobTitle(title);
    setShowReviewModal(true);
  };

  function truncateDescription(description, maxLength = 40) {
    if (description.length <= maxLength) {
      return description;
    } else {
      return `${description.slice(0, maxLength)}...`;
    }
  }

  // Function to handle star rating click
  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmitReview = async () => {
    setRLoading(true);
    if (!selectedGigId) {
      setRLoading(false);
      showToast("Job ID  not provided");
      return;
    }
    const reviewData = {
      jobId: selectedGigId,
      user_id: UserId,
      jobseekerId: selectedJobSeekerId,
      rating: rating,
      jobTitle: selectedJobTitle,
      review: reviewText,
      jobposterId: UserId,
    };

    try {
      const response = await axios.post(
        "https://unleashified-backend.azurewebsites.net/api/v1/submit-reviews",
        reviewData
      );
      setRLoading(false);
      showToast(response.data.message);
      setShowReviewModal(false);
    } catch (error) {
      setRLoading(false);
      showToast("Error submitting review");
    }
  };

  // flutterwave payment
  // const generateTxRef = () => {
  //   const randomString = Math.random().toString(36).substring(7); // Generate a random string
  //   const timestamp = Date.now(); // Get the current timestamp
  //   return `${timestamp}-${randomString}`; // Combine timestamp and random string
  // };
  // const config = {
  //   public_key: "FLWPUBK_TEST-d99e582b1f593f250ea49b53385f5cce-X",
  //   tx_ref: generateTxRef(),
  //   amount: totalAmount,
  //   currency: currencyValue,
  //   payment_options: "card,mobilemoney,ussd",
  //   customer: {
  //     email: emailUser,
  //     phone_number: "09064766113",
  //     name: sessionStorage.getItem("username"),
  //   },
  //   customizations: {
  //     title: "Out-Source Job Payment",
  //     description: "Payment for items in cart",
  //     logo: "https://res.cloudinary.com/djhnaee9k/image/upload/v1714038296/et5gicqtnuw4u1tqujjr.png",
  //   },
  // };
  // const handleFlutterPayment = useFlutterwave(config);

  // const verifyFlutterwave = async (tx_ref) => {
  //   try {
  //     const response = await axios.post(
  //       "https://unleashified-backend.azurewebsites.net/api/v1/provider-payment",
  //       {
  //         reference: tx_ref,
  //         email: emailUser,
  //         jobId: jobId,
  //         userId: UserId,
  //         type: "Out-Source",
  //         currency: currencyValue,
  //         provider: "flutterwave",
  //       }
  //     );
  //     setLoading(false);
  //     showToast(response.data.message);
  //   } catch (error) {
  //     setLoading(false);
  //     showToast(error.response.data.message);
  //   }
  // };
  const generateTxRef = () => {
    const randomString = Math.random().toString(36).substring(7); // Generate a random string
    const timestamp = Date.now(); // Get the current timestamp
    return `${timestamp}-${randomString}`; // Combine timestamp and random string
  };

  const handleFlutterPayment = useFlutterwave({
    public_key: "FLWPUBK_TEST-d99e582b1f593f250ea49b53385f5cce-X",
    tx_ref: generateTxRef(),
    amount: parseInt(sessionStorage.getItem("totalAmount")), // Default value, will be overwritten
    currency: sessionStorage.getItem("currencyValue"),
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: emailUser,
      phone_number: "09064766113",
      name: sessionStorage.getItem("username"),
    },
    customizations: {
      title: "Out-Source Job Payment",
      description: "Payment for items in cart",
      logo: "https://res.cloudinary.com/djhnaee9k/image/upload/v1714038296/et5gicqtnuw4u1tqujjr.png",
    },
  });

  const verifyFlutterwave = async (tx_ref) => {
    sessionStorage.removeItem("totalAmount");
    try {
      const response = await axios.post(
        "https://unleashified-backend.azurewebsites.net/api/v1/provider-payment",
        {
          reference: tx_ref,
          email: emailUser,
          jobId: sessionStorage.getItem("jobId"),
          userId: sessionStorage.getItem("UserId"),
          type: "JOB",
          currency: sessionStorage.getItem("currencyValue"),
          provider: "flutterwave",
        }
      );
      setLoading(false);
      showToast(response.data.message);
    } catch (error) {
      setLoading(false);
      showToast(error.response.data.message);
    }
  };

  const handlePaymentClick = (row) => {
    // Directly use row values to set session storage
    sessionStorage.setItem("jobId", row.original._id);
    sessionStorage.setItem("currencyValue", row.original.currency);
    sessionStorage.setItem("totalAmount", row.original.jobSalary);

    console.log("This is the new jobId", row.original._id);

    handleFlutterPayment({
      callback: (response) => {
        console.log(response);
        verifyFlutterwave(response.transaction_id);
        closePaymentModal(); // this will close the modal programmatically
      },
      onClose: () => {},
      tx_ref: generateTxRef(),
      amount: row.original.jobSalary,
      currency: row.original.currency,
    });
  };

  // paystack payment
  const handlePayment = (jobId, jobPrice) => {
    setLoading(true);
    const amountValue = parseFloat(jobPrice.replace(/,/g, ""));
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: "pk_test_57f928ef3b08dc974a816c89f7687c37e9afb03c",
      email: emailUser,
      amount: amountValue * 100,
      // currency: "USD",
      onSuccess(reference) {
        axios
          .post(
            "https://unleashified-backend.azurewebsites.net/api/v1/provider-payment",
            {
              reference: reference.reference,
              email: emailUser,
              jobId: jobId,
              userId: UserId,
              type: "JOB",
              currency: "NGN",
              provider: "paystack",
            }
          )
          .then((response) => {
            if (response.status === 201) {
              setLoading(false);
              showToast(response.data.message);

              // setOpenModal(true);
              // setBlurBackground(true); // Apply blur effect when modal is open
            } else {
              setLoading(false);
              // Handle other response statuses if needed
            }
          })
          .catch((error) => {
            setLoading(false);
            // Handle any errors during verification
            showToast(error.response.data.message);
          });
      },
      onCancel() {
        setLoading(false);
        console.log("enter here");
        showToast("You have canceled the transaction");
      },
    });
  };

  // const markCompleted = async (jobId) => {
  //   setLoadingC(true);
  //   try {
  //     const response = await axios.post(
  //       "https://unleashified-backend.azurewebsites.net/api/v1/mark-job-completed",
  //       {
  //         jobId: jobId,
  //         userId: UserId,
  //       }
  //     );
  //     setLoadingC(false);
  //     showToast(response.data.message);
  //   } catch (error) {
  //     setLoadingC(false);
  //     showToast(error.response.data.message);
  //   }
  // };
  const columns = useMemo(() => {
    return header.map(({ accessorKey, header }) => ({
      header: header,
      accessorKey: accessorKey,
      cell: ({ row }) => {
        if (accessorKey === "header") {
          const maxLength = 30; // to shorten the character length
          const shortenedHeader =
            row.original.header.length > maxLength
              ? `${row.original.header.substring(0, maxLength)}...`
              : row.original.header;

          return (
            <Link
              // to={`/jobs/listing/dashboard-job-list/?id=${row.original._id}`}
              className="text-inherit"
            >
              <h4 className="mb-1 text-primary-hover">{shortenedHeader}</h4>
              <span className="text-inherit">
                Format: {row.original.format}
              </span>
            </Link>
          );
        } else if (accessorKey === "serviceType") {
          return (
            <Fragment>
              <span className="mb-1 text-primary-hover">
                <b>{truncateDescription(row.original.serviceType)}</b>
              </span>
              <br />
              <span className="mb-1 text-primary-hover">
                {truncateDescription(row.original.description)}
              </span>
            </Fragment>
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
        } else if (accessorKey === "userDetails") {
          return (
            <Fragment>
              <p className="mb-1 text-primary-hover">{row.original.userName}</p>
            </Fragment>
          );
        } else if (accessorKey === "totalAmountPaid") {
          return (
            <Fragment>
              <p className="mb-1 text-primary-hover">{formatPrice(row.original.currency, row.original.totalAmountPaid)}</p>
            </Fragment>
          );
        } else if (accessorKey === "deliveryDate") {
          const updatedAt = new Date(row.original.deliveryDate);
          const formattedDate = updatedAt.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          return (
            <Fragment>
              <span>{formattedDate}</span>
            </Fragment>
          );
        } else if (accessorKey === "createdAt") {
          const updatedAt = new Date(row.original.createdAt);
          const formattedDate = updatedAt.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          return (
            <Fragment>
              <span>{formattedDate}</span>
            </Fragment>
          );
        } else if (accessorKey === "paymentStatus") {
          return (
            <Fragment>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {row.original.paymentStatus === "paid" ||
                row.original.paymentStatus === "Paid" ? (
                  <Button
                    href="#"
                    variant="success"
                    className="btn-sm"
                    disabled={loadingC}
                    style={{
                      opacity: loadingC ? 0.7 : 1,
                      width: "80px",
                    }}
                  >
                    Paid
                  </Button>
                ) : (
                  <Button
                    href="#"
                    variant="warning"
                    className="btn-sm"
                    style={{
                      opacity: 0.7,
                      width: "80px",
                    }}
                    disabled
                  >
                    Pending
                  </Button>
                )}
              </div>
            </Fragment>
          );
        } else if (accessorKey === "review") {
          return (
            <Fragment>
              <Button
                variant="primary"
                onClick={() =>
                  handleShow(
                    row.original.userId,
                    row.original._id,
                    row.original.jobTitle
                  )
                }
              >
                Post Review
              </Button>
            </Fragment>
          );
        } else if (accessorKey === "action") {
          return (
            <Button
              href="#"
              variant="success"
              className="btn-sm"
              disabled={
                completedJobs[row.original.id] ||
                loadingBookings[row.original.id]
              }
              style={{
                opacity: loadingBookings[row.original.id] ? 0.7 : 1,
              }}
              onClick={() => markCompleted(row.original.id)}
            >
              {loadingBookings[row.original.id]
                ? "Processing..."
                : completedJobs[row.original.id]
                ? "Completed"
                : "Mark Complete"}
            </Button>
          );
        } else if (accessorKey === "department") {
          return (
            <span>
              {/* {formatPrice(row.original.currency, row.original.jobSalary)} */}
              {row.original.department}
            </span>
          );
        } else {
          return <span>{row.original[accessorKey]}</span>;
        }
      },
    }));
  }, [header]);

  return data ? (
    <Fragment>
      <TanstackTable
        data={data}
        columns={columns}
        filter={true}
        filterPlaceholder="Search Gigs"
        pagination={true}
      />
      {/* Modal component for submitting review */}
      <Modal
        show={showReviewModal}
        onHide={() => {
          setReviewText("");
          setRating(0);
          setShowReviewModal(false);
        }}
      >
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
                  onChange={(e) => setReviewText(e.target.value)}
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
              setRating(0);
              setShowReviewModal(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            disabled={Rloading}
            onClick={handleSubmitReview}
          >
            {Rloading ? "Processing" : "Submit Review"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  ) : (
    <div>Loading...</div>
  );
};

export default GigTable;
