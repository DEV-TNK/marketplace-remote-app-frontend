import React, { Fragment, useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import TanstackTable from "../Components/elements/advance-table/TanstackTable";
import { showToast } from "../Components/Showtoast";
import axios from "axios";
import { toast } from "react-toastify";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import "./OutSource.css";
import PaystackPop from "@paystack/inline-js";

const OutSourceJobTable = ({ data, header }) => {
  const emailUser = sessionStorage.getItem("email");
  const UserId = sessionStorage.getItem("UserId");
  const [loading, setLoading] = useState(false);
  const [loadingC, setLoadingC] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [jobDetails, setJobDetails] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currencyValue, setCurrencyValue] = useState(null);
  const [jobId, setJobId] = useState(null);

  useEffect(() => {
    if (jobDetails && jobDetails.length > 0) {
      const total = jobDetails.reduce(
        (acc, job) => acc + parseFloat(job.price) * job.numberOfPerson,
        0
      );
      setTotalAmount(total);
      setCurrencyValue(jobDetails.length > 0 ? jobDetails[0].currency : "");
      console.log("this is total amount", totalAmount);
    }
  }, [jobDetails, totalAmount]);

  // Function to format price with currency symbo
  const formatPrice = (currencyName) => {
    switch (currencyName) {
      case "NGN":
        return `₦`;
      case "USD":
        return `$`;
      case "EUR":
        return `€`;
      case "GBP":
        return `£`;
      default:
        return `₦`;
    }
  };

  const email = sessionStorage.getItem("email");
  const username = sessionStorage.getItem("username");

  // flutterwave payment
  const generateTxRef = () => {
    const randomString = Math.random().toString(36).substring(7); // Generate a random string
    const timestamp = Date.now(); // Get the current timestamp
    return `${timestamp}-${randomString}`; // Combine timestamp and random string
  };
  const config = {
    public_key: "FLWPUBK_TEST-d99e582b1f593f250ea49b53385f5cce-X",
    tx_ref: generateTxRef(),
    amount: totalAmount,
    currency: currencyValue,
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: email,
      phone_number: "09064766113",
      name: username,
    },
    customizations: {
      title: "Out-Source Job Payment",
      description: "Payment for items in cart",
      logo: "https://res.cloudinary.com/djhnaee9k/image/upload/v1714038296/et5gicqtnuw4u1tqujjr.png",
    },
  };
  const handleFlutterPayment = useFlutterwave(config);

  const verifyFlutterwave = async (tx_ref) => {
    try {
      const response = await axios.post(
        "https://unleashified-backend.azurewebsites.net/api/v1/provider-payment",
        {
          reference: tx_ref,
          email: emailUser,
          jobId: jobId,
          userId: UserId,
          type: "Out-Source",
          currency: currencyValue,
          provider: "flutterwave",
        }
      );
      setLoading(false);
      setShowModal(false);
      showToast(response.data.message);
    } catch (error) {
      setLoading(false);
      setShowModal(true);
      showToast(error.response.data.message);
    }
  };

  // paystack payment
  const handlePayment = () => {
    //  setLoading(true);
    //
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: "pk_test_57f928ef3b08dc974a816c89f7687c37e9afb03c",
      email: email,
      amount: totalAmount * 100,
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
              type: "Out-Source",
              currency: "NGN",
              provider: "paystack",
            }
          )
          .then((response) => {
            // if (response.status === 201) {
            setLoading(false);
            setShowModal(false);
            showToast(response.data.message);
            // } else {
            //   setLoading(false);
            //   // Handle other response statuses if needed
            // }
            console.log(response);
          })
          .catch((error) => {
            setLoading(false);
            // Handle any errors during verification
            showToast(error.response.data.message);
            console.log(error);
          });
      },
      onCancel() {
        setLoading(false);
        console.log("enter here");
        showToast("You have canceled the transaction");
      },
    });
  };

  const handleShow = (job) => {
    setJobDetails(job.jobs);
    setJobId(job._id.toString());
    console.log("this is job id", jobId);
    setShowModal(true);
    console.log("this is the show job", job);
  };

  const navigate = useNavigate();

  const markCompleted = async (jobId) => {
    setLoadingC(true);
    try {
      const response = await axios.post(
        "https://unleashified-backend.azurewebsites.net/api/v1/mark-job-completed",
        {
          jobId: jobId,
          userId: UserId,
        }
      );
      setLoadingC(false);
      showToast(response.data.message);
    } catch (error) {
      setLoadingC(false);
      showToast(error.response.data.message);
    }
  };
  const columns = useMemo(() => {
    return header.map(({ accessorKey, header }) => ({
      header: header,
      accessorKey: accessorKey,
      cell: ({ row }) => {
        if (accessorKey === "title") {
          return (
            <Link
              to={`/jobs/listing/dashboard-job-list/?id=${row.original._id}`}
              className="text-inherit"
            >
              {row.original.jobs && row.original.jobs.length > 0 && (
                <ul>
                  {row.original.jobs.map((job) => (
                    <li key={job.title}>{job.title}</li>
                  ))}
                </ul>
              )}
              <h4 className="mb-1 text-primary-hover">{row.original.title}</h4>
              <span className="text-inherit">{row.original.deliveryDate}</span>
            </Link>
          );
        } else if (accessorKey === "numberOfPerson") {
          return (
            <Fragment>
              {row.original.jobs && row.original.jobs.length > 0 && (
                <ul>
                  {row.original.jobs.map((job) => (
                    <li key={job.numberOfPerson}>
                      {job.numberOfPerson} person's
                    </li>
                  ))}
                </ul>
              )}
            </Fragment>
          );
        } else if (accessorKey === "type") {
          return (
            <Fragment>
              {row.original.jobs && row.original.jobs.length > 0 && (
                <ul>
                  {row.original.jobs.map((job) => (
                    <li key={job.type}>{job.type}</li>
                  ))}
                </ul>
              )}
            </Fragment>
          );
        } else if (accessorKey === "format") {
          return (
            <Fragment>
              {row.original.jobs && row.original.jobs.length > 0 && (
                <ul>
                  {row.original.jobs.map((job) => (
                    <li key={job.format}>{job.format}</li>
                  ))}
                </ul>
              )}
            </Fragment>
          );
        } else if (accessorKey === "completedDate") {
          const updatedAt = new Date(row.original.updatedAt);
          const formattedDate = updatedAt.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          return (
            <Fragment>
              <p>{formattedDate}</p>
            </Fragment>
          );
        } else if (accessorKey === "paymentStatus") {
          return (
            <Fragment>
              {row.original.paymentStatus === "paid" ? (
                <Button variant="success" disabled>
                  Paid
                </Button>
              ) : (
                <button
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ opacity: loading ? 0.7 : 1 }}
                  onClick={() => {
                    handleShow(row.original);
                  }}
                >
                  {loading ? "Processing" : "Make Payment"}
                </button>
              )}
            </Fragment>
          );
        } else if (accessorKey === "action") {
          return (
            <Fragment>
              {row.original.paymentStatus === "paid" ? (
                <Button
                  href="#"
                  variant="success"
                  className="btn-sm"
                  disabled={loadingC}
                  style={{ opacity: loadingC ? 0.7 : 1 }}
                  // onClick={() => markCompleted(row.original._id)}
                >
                  {loadingC ? "Processing" : "Completed"}
                </Button>
              ) : (
                <Button
                  href="#"
                  variant="success"
                  className="btn-sm"
                  style={{ opacity: ".7" }}
                  disabled
                >
                  Completed
                </Button>
              )}
            </Fragment>
          );
        } else {
          return <span>{row.original[accessorKey]}</span>;
        }
      },
    }));
  }, [header]);

  return data && data.length ? (
    <Fragment>
      <TanstackTable
        data={data}
        columns={columns}
        filter={true}
        filterPlaceholder="Search Jobs"
        pagination={true}
      />
      {/* Modal component for submitting review */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="w-100 mb-3">
            <h4 className="mb-3">Job Details</h4>

            <table>
              <thead>
                <tr>
                  <th style={{ width: "200px" }}>Title&rsquo;s</th>
                  <th style={{ width: "120px" }}>Price</th>
                  <th style={{ width: "100px" }}>Person&rsquo;s</th>
                  <th style={{ width: "200px" }}>Sub-Total</th>
                </tr>
              </thead>
              <tbody>
                {jobDetails &&
                  jobDetails.length > 0 &&
                  jobDetails.map((job) => (
                    <tr key={job._id}>
                      <td>{job.title}</td>
                      <td>{job.price}</td>
                      <td>{job.numberOfPerson}</td>
                      <td>{parseFloat(job.price) * job.numberOfPerson}</td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr className="table-footer">
                  <td colSpan="3">
                    <strong>Total Amount: </strong>
                  </td>
                  <td>
                    <strong>
                      {formatPrice(currencyValue)}
                      {jobDetails &&
                        jobDetails.length > 0 &&
                        jobDetails.reduce(
                          (total, job) =>
                            total + parseFloat(job.price) * job.numberOfPerson,
                          0
                        )}
                    </strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <h2 className="position start">Pay with</h2>
          <Button
            className="secondary mr-5"
            onClick={() => {
              handleFlutterPayment({
                callback: (response) => {
                  console.log(response);
                  verifyFlutterwave(response.transaction_id);
                  closePaymentModal(); // this will close the modal programmatically
                },
                onClose: () => {},
              });
            }}
          >
            Flutterwave
          </Button>
          <Button variant="primary" onClick={() => handlePayment()}>
            PayStack
          </Button>
          <div className="w-100 ">
            <p
              style={{ height: "40px" }}
              className="border-start border-warning"
            >
              <span className="mt-5">
                {" "}
                <strong>OR</strong>
              </span>
            </p>{" "}
          </div>
          <div className="w-100 mt-5">
            <h3>Pay Into the following accouNT details</h3>
            <p>Account Name: GFA</p>
            <p>Bank: Zenith</p>
            <p>Acc Number: 0000000000</p>

            <h2>Note</h2>
            <p>
              After making payment to the bank account details above, send the
              below details for payment confirmation to info@unleashified.com
            </p>
            <p>
              Clear Payment Receit <br /> Job Id from the Outsource Job screen{" "}
              <br />
              User Account Name and email address
            </p>
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  ) : (
    <div>Loading not ...</div>
  );
};

export default OutSourceJobTable;
