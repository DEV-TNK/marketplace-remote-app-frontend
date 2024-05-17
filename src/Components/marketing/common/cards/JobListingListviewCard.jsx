import React from "react";
import { Card, Image } from "react-bootstrap";
import { FaNairaSign } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";

function getTimeDifference(updatedAt) {
  const updatedAtDate = new Date(updatedAt);
  const currentTime = new Date();
  const timeDifference = currentTime - updatedAtDate;
  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  return { days, hours: hours % 24, minutes: minutes % 60 };
}

const JobListingListviewCard = ({ item }) => {
  const getTimeDifferenceString = (time) => {
    if (time.days > 0) {
      return `${time.days} days ago`;
    } else if (time.hours > 0) {
      return `${time.hours} hours ago`;
    } else {
      return `${time.minutes} minutes ago`;
    }
  };

  const time = getTimeDifference(item.updatedAt);
  const timeString = getTimeDifferenceString(time);

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
          ActionType: "Job-Click",
        }
      );
      console.log("this is the service response", response.data);
    } catch (error) {
      console.log("error");
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
    <Card className="card-bordered mb-4 card-hover cursor-pointer">
      <Card.Body>
        <div>
          <div className="d-md-flex">
            <div className="col-md-3">
              {item.jobPoster && item.jobPoster.companyLogo && (
                <Link
                  to={`/jobs/listing/?id=${item._id}`}
                  onClick={() => SearchActivity({ name: item.department })}
                >
                  <Image
                    src={item.jobPoster.companyLogo}
                    alt={item.jobPoster.companyName}
                    className="img-fluid"
                    style={{ maxHeight: "100px", maxWidth: "100%" }}
                  />
                </Link>
              )}
            </div>
            <div className="ms-md-3 w-100 mt-3 mt-xl-1">
              <div className="d-flex justify-content-between mb-5">
                <div>
                  <h3 className="mb-1 fs-4">
                    <Link
                      to={`/jobs/listing/?id=${item._id}`}
                      className="text-inherit me-1"
                      onClick={() => SearchActivity({ name: item.department })}
                    >
                      {item.jobTitle}
                    </Link>
                  </h3>
                  <div>
                    {item.jobPoster && item.jobPoster.companyName && (
                      <span>at {item.jobPoster.companyName}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-md-flex justify-content-between ">
                <div className="mb-2 mb-md-0">
                  <span className="me-2">
                    <i className="fe fe-briefcase text-muted"></i>
                    <span className="ms-1 ">{item.jobFormat}</span>
                  </span>
                  <span className="me-2">
                    {/* <FaNairaSign style={{ height: "14px" }} /> */}
                    <span className="ms-1 ">
                      {formatPrice(item.currency, item.jobSalary)}
                    </span>
                  </span>
                  <span className="me-2">
                    <i className="fe fe-map-pin text-muted"></i>
                    <span className="ms-1 ">{item.jobLocation}</span>
                  </span>
                </div>
                <div>
                  <i className="fe fe-clock text-muted"></i>
                  <span>{timeString}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default JobListingListviewCard;
