import React, { useState, useEffect } from "react";
import { Row, Col, Container, Image, Button } from "react-bootstrap";
import axios from "axios";
import { FaNairaSign } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import GKTippy from "../../Components/elements/tooltips/GKTippy";
import { Hr } from "react-bootstrap-icons";

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

const OutsourceJobSingle = () => {
  const [jobDetails, setJobDetails] = useState(null);
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const jobId = queryParam.get("id");

  const getTimeDifferenceString = (time) => {
    if (!time) {
      return "Unknown"; 
    }
  
    if (time.days > 0) {
      return `${time.days} days ago`;
    } else if (time.hours > 0) {
      return `${time.hours} hours ago`;
    } else {
      return `${time.minutes} minutes ago`;
    }
  };
  
  
  const time = jobDetails ? getTimeDifference(jobDetails.updatedAt) : null;
  const timeString = getTimeDifferenceString(time);
  

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(
        `https://unleashified-backend.azurewebsites.net/api/v1/get-single-outsource-job/${jobId}`
      );
      if (response.data && response.data.requiredJob) {
        setJobDetails(response.data.requiredJob);
      }
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  if (!jobDetails) {
    return <div>Loading...</div>;
  }

  const formatPrice = (currency, price) => {
    // Implement your logic to format price here
    return `${currency} ${price}`;
  };

//   const timeString = "Put your time string here";

  const handleShare = async () => {
    // Implement your share functionality here
  };

  return (
    <section className="py-14 bg-white">
      <Container>
      <Row>
        <Col xl={{ span: 8, offset: 2 }} md={12}>
          <div className="d-xl-flex ">
            <div className="mb-3 mb-md-0">
            {jobDetails && jobDetails.jobPoster && jobDetails.jobPoster.companyLogo && (
                      <Image
                        src={jobDetails.jobPoster.companyLogo}
                        alt="logo"
                        className="icon-shape border rounded-circle"
                        style={{ height: "100px", width: "120px" }}
                      />
              )}
            </div>

            {/* text */}
            <div className="ms-xl-3  w-100 mt-3 mt-xl-0">
              <div className="d-flex justify-content-between mb-5">
                <div>
                <h1 className="mb-1 h2">
                    {jobDetails.jobPoster && jobDetails.jobPoster.companyName}
                  </h1>
                  {/* <h1 className="mb-1 h2 "> */}
                    {jobDetails &&
                    jobDetails.jobPoster &&
                    jobDetails.jobPoster.companyContact && (
                      <h5>Contact: {jobDetails.jobPoster.companyContact}</h5>
                    )}
                  {jobDetails &&
                    jobDetails.jobPoster &&
                    jobDetails.jobPoster.companyEmail && (
                      <h5>Email: {jobDetails.jobPoster.companyEmail}</h5>
                    )}
                </div>
                <div onClick={handleShare}>
                  {/* bookmark */}
                  {/* <GKTippy content="Share Job Post">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M 18 2 A 3 3 0 0 0 15 5 A 3 3 0 0 0 15.054688 5.5605469 L 7.9394531 9.7109375 A 3 3 0 0 0 6 9 A 3 3 0 0 0 3 12 A 3 3 0 0 0 6 15 A 3 3 0 0 0 7.9355469 14.287109 L 15.054688 18.439453 A 3 3 0 0 0 15 19 A 3 3 0 0 0 18 22 A 3 3 0 0 0 21 19 A 3 3 0 0 0 18 16 A 3 3 0 0 0 16.0625 16.712891 L 8.9453125 12.560547 A 3 3 0 0 0 9 12 A 3 3 0 0 0 8.9453125 11.439453 L 16.060547 7.2890625 A 3 3 0 0 0 18 8 A 3 3 0 0 0 21 5 A 3 3 0 0 0 18 2 z"></path>
                    </svg>
                  </GKTippy> */}
                </div>
              </div>
              <div>
                {/* year */}
                <div className="d-md-flex justify-content-between ">
                  <div className="mb-2 mb-md-0">
                    {/* time */}
                    <i className="fe fe-clock text-muted"></i>{" "}
                    <span>{timeString}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <hr />
        <Row>
          <Col xl={{ span: 8, offset: 2 }} md={12}>
            {jobDetails.jobs.map((job, index) => (
              <div key={index}>
                {index > 0 && <hr style={{ borderTop: "2px solid black" }} />}
                <h3>Job Details {index + 1}</h3>
                <div className="d-xl-flex">
                  <div className="mb-3 mb-md-0">
                    {job.jobPoster && job.jobPoster.companyLogo && (
                      <Image
                        src={job.jobPoster.companyLogo}
                        alt="logo"
                        className="icon-shape border rounded-circle"
                        style={{ height: "100px", width: "120px" }}
                      />
                    )}
                  </div>
                  <div className="ms-xl-3 w-100 mt-3 mt-xl-0">
                    <div className="d-flex justify-content-between mb-5">
                      <div>
                        <h1 className="mb-1 h2">{job.title}</h1>
                        <div>
                          {job.jobPoster && job.jobPoster.companyName && (
                            <span>at {job.jobPoster.companyName}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="d-md-flex justify-content-between">
                        <div className="mb-2 mb-md-0">
                          <span className="me-2">
                            <i className="fe fe-briefcase text-muted"></i>
                            <span className="ms-1">{job.format} Job</span>
                          </span>
                          <span className="me-2">
                            <FaNairaSign style={{ height: "15px" }} />
                            <span className="ms-1">{job.price}</span>
                          </span>
                          <span className="me-2">
                            <span className="ms-1">
                              {job.salaryFormat} Payment
                            </span>
                          </span>
                          <span className="me-2">
                            <i className="fe fe-map-pin text-muted"></i>
                            <span className="ms-1">{job.location}</span>
                          </span>
                          <span className="me-2">
                            <span className="ms-1">Type: {job.type}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <h1 className="fs-3">Job description</h1>
                  <p>{job.description}</p>
                </div>
                <div className="mt-5">
                  <h1 className="fs-3">Roles</h1>
                  <p>{job.roles}</p>
                </div>
                <div className="mt-5">
                  <h1 className="fs-3">Payment Status</h1>
                  <p>{job.paymentStatus}</p>
                </div>
                <div className="mt-5">
                  <h1 className="fs-3">Status</h1>
                  <p>{job.status}</p>
                </div>
                <div className="mt-5">
                  <h1 className="fs-3">Currency</h1>
                  <p>{job.currency}</p>
                </div>
                <div className="mt-5">
                  <h1 className="fs-3">Experience</h1>
                  <p>{job.experience}</p>
                </div>
                <div className="mt-5">
                  <h3 className="fe-3">Desired Candidate Profile:</h3>
                  <ul>
                    {job.desiredCandidate &&
                      job.desiredCandidate.map((candidate, index) => (
                        <li key={index}>{candidate.name}</li>
                      ))}
                  </ul>
                </div>
                <div className="mt-5">
                  <h1 className="fs-3">Number Of Persons</h1>
                  <p>{job.numberOfPerson}</p>
                </div>
                <div className="mt-5">
                  <h1 className="fs-3">Years Of Experience</h1>
                  <p>{job.yearsOfExperience}</p>
                </div>
                <div className="mt-5">
                  <h1 className="fs-3">Type</h1>
                  <p>{job.type}</p>
                </div>
                <div className="mt-5">
                  <h1 className="fs-3">Format</h1>
                  <p>{job.format}</p>
                </div>
                <div className="mt-5">
                  <h1 className="fs-3">Location</h1>
                  <p>{job.location}</p>
                </div>
                <div className="mt-5">
                  <h1 className="fs-3">Salary Format</h1>
                  <p>{job.salaryFormat}</p>
                </div>
                <div className="mt-5">
                  <h1 className="fs-3">Price</h1>
                  <p>{job.price}</p>
                </div>
              </div>
            ))}
          </Col>
        </Row>
        <Col xl={{ span: 8, offset: 2 }} md={12} className="mt-8">
          <div className="d-xl-flex border p-4 rounded">
            <div className="mb-3 mb-md-0">
              {jobDetails.jobPoster && jobDetails.jobPoster.companyLogo && (
                <Image
                  src={jobDetails.jobPoster.companyLogo}
                  alt="Company Logo"
                  className="icon-shape border rounded-circle"
                  style={{ height: "100px", width: "120px" }}
                />
              )}
            </div>
            <div className="ms-xl-3 w-100 mt-3 mt-xl-0">
              <div className="d-flex justify-content-between mb-5">
                <div>
                  <h1 className="mb-1 h2">
                    {jobDetails.jobPoster && jobDetails.jobPoster.companyName}
                  </h1>
                  {jobDetails &&
                    jobDetails.jobPoster &&
                    jobDetails.jobPoster.companyContact && (
                      <h5>Contact: {jobDetails.jobPoster.companyContact}</h5>
                    )}
                  {jobDetails &&
                    jobDetails.jobPoster &&
                    jobDetails.jobPoster.companyEmail && (
                      <h5>Email: {jobDetails.jobPoster.companyEmail}</h5>
                    )}
                </div>
                <div>
                  <Button variant="success">Contact Information</Button>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Container>
    </section>
  );
};
export default OutsourceJobSingle;
