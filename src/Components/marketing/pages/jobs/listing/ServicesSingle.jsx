// import node module libraries
import { Row, Col, Container, Button, Image, Modal } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

import { FaNairaSign } from "react-icons/fa6";

// import sub components
import JobListingListviewCard from "../../../../../Components/marketing/common/cards/JobListingListviewCard";
import GKTippy from "../../../../../Components/elements/tooltips/GKTippy";

// import data files
import JobsListingData from "../../../../../data/marketing/jobs/JobsListingData";
import { useEffect, useState } from "react";
import axios from "axios";

function getTimeDifference(updatedAt) {
  // Parse the updatedAt string to a Date object
  const updatedAtDate = new Date(updatedAt);

  // Get the current time
  const currentTime = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentTime - updatedAtDate;

  // Convert milliseconds to minutes
  const minutes = Math.floor(timeDifference / (1000 * 60));

  // Convert minutes to hours
  const hours = Math.floor(minutes / 60);

  // Convert hours to days
  const days = Math.floor(hours / 24);

  return { days, hours: hours % 24, minutes: minutes % 60 };
}

const ServicesSingle = () => {
  //   const slug = slugInfo.slug;
  //   const job = JobsListingData.find((job) => job.slug === slug);
  //   const similarJobs = JobsListingData.filter((job) => job.slug !== slug).slice(
  //     0,
  //     4
  //   );
  const [serviceDetails, setServiceDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const jobId = queryParam.get("id");
  const [showFallback, setShowFallback] = useState(false);

  const url = window.location.href;

  useEffect(() => {
    const getAService = async () => {
      try {
        const response = await axios.get(
          `https://unleashified-backend.azurewebsites.net/api/v1/get-a-service/${jobId}`
        );
        setServiceDetails(response.data.service);
        setUserDetails(response.data.userDetails);
      } catch (error) {
        console.log(error);
      }
    };
    getAService();
  }, []);

  const getTimeDifferenceString = (time) => {
    if (time.days > 0) {
      return `${time.days} days ago`;
    } else if (time.hours > 0) {
      return `${time.hours} hours ago`;
    } else {
      return `${time.minutes} minutes ago`;
    }
  };

  const time = getTimeDifference(serviceDetails.updatedAt);
  const timeString = getTimeDifferenceString(time);

  // to share service
  const handleShare = async () => {
    try {
      // Check if Web Share API is supported by the browser
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: url,
        });
        console.log("Page shared successfully");
      } else {
        console.log("coming here");
        // Show fallback for browsers that don't support Web Share API
        setShowFallback(true);
      }
    } catch (error) {
      console.error("Error sharing page:", error);
    }
  };

  const handleCopy = () => {
    // Copy the URL to the clipboard
    navigator.clipboard.writeText(url);
  };

  
  const currencyName = serviceDetails.currency
  const priceValue = serviceDetails.price
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
    <section className="py-14 bg-white">
      <Container>
        <Row>
          <Col xl={{ span: 8, offset: 2 }} md={12}>
            <div className="d-xl-flex ">
              <div className="mb-3 mb-md-0">
                {userDetails && (
                  <Image
                    src={userDetails && userDetails.userImage}
                    alt={`${userDetails && userDetails.firstName} ${
                      userDetails.lastName
                    }`}
                    className="icon-shape border rounded-circle"
                    style={{ height: "100px", width: "120px" }}
                  />
                )}
              </div>

              {/* text */}
              <div className="ms-xl-3  w-100 mt-3 mt-xl-0">
                <div className="d-flex justify-content-between mb-5">
                  <div>
                    <h1 className="mb-1 h2 ">{`${
                      userDetails && userDetails.firstName
                    } ${userDetails.lastName}`}</h1>
                    <div>
                      {serviceDetails && serviceDetails.serviceName && (
                        <span>Service as {serviceDetails.serviceName}, </span>
                      )}
                      {serviceDetails && serviceDetails.department && (
                        <span>Department: {serviceDetails.department} </span>
                      )}

                      {/* star */}
                      {/* <span className="text-dark ms-2 fw-medium">
                        {job.rating}{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          fill="currentColor"
                          className="bi bi-star-fill text-warning align-baseline"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                      </span> */}
                      {/* <span className="ms-0">({job.totalReviews} Reviews)</span> */}
                    </div>
                    {userDetails && userDetails.contact && (
                      <span>Contact: {userDetails.contact} </span>
                    )}
                    ,
                    {userDetails && userDetails.email && (
                      <span>Email: {userDetails.email} </span>
                    )}
                  </div>
                  <div onClick={handleShare}>
                    {/* bookmark */}
                    <GKTippy content="Share Job Post">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        // width="100"
                        // height="100"
                        width="24"
                        height="24"
                        // viewBox="0 0 16 16"
                        viewBox="0 0 24 24"
                      >
                        <path d="M 18 2 A 3 3 0 0 0 15 5 A 3 3 0 0 0 15.054688 5.5605469 L 7.9394531 9.7109375 A 3 3 0 0 0 6 9 A 3 3 0 0 0 3 12 A 3 3 0 0 0 6 15 A 3 3 0 0 0 7.9355469 14.287109 L 15.054688 18.439453 A 3 3 0 0 0 15 19 A 3 3 0 0 0 18 22 A 3 3 0 0 0 21 19 A 3 3 0 0 0 18 16 A 3 3 0 0 0 16.0625 16.712891 L 8.9453125 12.560547 A 3 3 0 0 0 9 12 A 3 3 0 0 0 8.9453125 11.439453 L 16.060547 7.2890625 A 3 3 0 0 0 18 8 A 3 3 0 0 0 21 5 A 3 3 0 0 0 18 2 z"></path>
                      </svg>
                    </GKTippy>
                  </div>
                </div>
                <div>
                  {/* year */}
                  <div className="d-md-flex justify-content-between ">
                    <div className="mb-2 mb-md-0">
                      <span className="me-2">
                        {" "}
                        <i className="fe fe-briefcase text-muted"></i>
                        <span className="ms-1 ">
                          {serviceDetails.experience}
                        </span>
                      </span>
                      {/* text */}
                      <span className="me-2">
                        {/* <FaNairaSign style={{ height: "15px" }} /> */}
                        <span className="ms-1 ">{formatPrice(serviceDetails.currency, serviceDetails.price)}</span>
                      </span>
                      <span className="me-2">
                        <i className="fe fe-clock text-muted"></i>
                        <span className="ms-1 ">
                          {serviceDetails.jobSalaryFormat} Payment
                        </span>
                      </span>
                      {/* location */}
                      <span className="me-2">
                        <i className="fe fe-map-pin text-muted"></i>
                        <span className="ms-1 ">
                          {serviceDetails.serviceType}
                        </span>
                      </span>
                    </div>
                    <div>
                      {/* time */}
                      <i className="fe fe-clock text-muted"></i>{" "}
                      <span>{timeString}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-4" />
            <div>
              <p>
                <span>
                  Total Job Done:{" "}
                  <span className="text-dark">
                    {serviceDetails.totalJobDone}
                  </span>
                </span>
              </p>
            </div>
            {/* <div
              dangerouslySetInnerHTML={{
                __html: job.jobDetails,
              }}
            /> */}
            {/* button */}
            <div className="mt-5">
              <h1 className="fs-3">Service description</h1>
              <p>{serviceDetails.description}</p>
            </div>
            <div className="mt-5">
              <h1 className="fs-3">Role</h1>
              <p>{serviceDetails.serviceHeading}</p>
            </div>
            <div className="mt-5">
              {serviceDetails.benefit && serviceDetails.benefit.length > 0 ? (
                <div>
                  <h3 className="fe-3">Benefits:</h3>
                  {serviceDetails.benefit.map((benefits) => (
                    <li key={benefits._id}>{benefits.name}</li>
                  ))}
                </div>
              ) : (
                <p>No responsibilities specified</p>
              )}
            </div>
            <div className="mt-5">
              {serviceDetails.serviceUrl &&
              serviceDetails.serviceUrl.length > 0 ? (
                <div>
                  <h3 className="fe-3">Name and Link(s) to Job done before</h3>
                  {serviceDetails.serviceUrl.map((serviceUrl) => (
                    <li key={serviceUrl._id}>
                      {serviceUrl.name} :- {serviceUrl.url}{" "}
                    </li>
                  ))}
                </div>
              ) : (
                <p> No Name and Link(s) to Job done before</p>
              )}
            </div>
            {/* <Link to={`/jobs/apply-for-this-job/?id=${jobId}`}>
              <div className="mt-5 d-grid">
                <Button type="button" variant="primary">
                  Apply for this Job
                </Button>
              </div>
            </Link> */}
          </Col>
        </Row>
        <Row>
          {/* <Col xl={{ span: 8, offset: 2 }} md={12}>
            <div className="mt-12">
              <h2 className="mb-4">Similar Jobs</h2>
              {similarJobs.map((job, index) => {
                return <JobListingListviewCard item={job} key={index} />;
              })}
            </div>
          </Col> */}
          <Col xl={{ span: 8, offset: 2 }} md={12} className="mt-8">
            <div className="d-xl-flex border p-4 rounded">
              <div className="mb-3 mb-md-0">
                {userDetails && (
                  <img
                    src={userDetails.userImage}
                    alt={`${userDetails.firstName} ${userDetails.lastName}`}
                    className="icon-shape border rounded-circle"
                    style={{ maxHeight: "100px", maxWidth: "100%" }}
                  />
                )}
              </div>

              {/* text */}
              <div className="ms-xl-3 w-100 mt-3 mt-xl-0">
                <div className="d-flex justify-content-between mb-5">
                  <div>
                    <h1 className="mb-1 h2">{`${userDetails.firstName} ${userDetails.lastName}`}</h1>
                    {userDetails && userDetails.contact && (
                      <h5>Contact: {userDetails.contact} </h5>
                    )}
                    {userDetails && userDetails.email && (
                      <h5>Email: {userDetails.email} </h5>
                    )}

                    {serviceDetails && serviceDetails.serviceName && (
                      <span>Service as {serviceDetails.serviceName}, </span>
                    )}
                  </div>
                  <div>
                    <Button variant="success">Contact Information</Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {showFallback && (
          <Modal show={showFallback} onHide={() => setShowFallback(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Copy Service Link</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input type="text" value={url} readOnly /> <br />
              <Button className="mt-5 " onClick={handleCopy}>
                Copy
              </Button>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowFallback(false)}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </section>
  );
};

export default ServicesSingle;
