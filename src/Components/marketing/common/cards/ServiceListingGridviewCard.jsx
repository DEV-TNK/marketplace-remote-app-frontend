import React from "react";
import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaNairaSign } from "react-icons/fa6";
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

const ServiceListingGridviewCard = (props) => {
  const { item } = props;

  const getTimeDifferenceString = (time) => {
    if (time.days > 0) {
      return `${time.days} days ago`;
    } else if (time.hours > 0) {
      return `${time.hours} hours ago`;
    } else {
      return `${time.minutes} minutes ago`;
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
          ActionType: "Service-Click",
        }
      );
      console.log("this is the service response", response.data);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <Card className="card-bordered card-hover cursor-pointer h-100 ">
      <Card.Body className="p-0">
        <div
          className="position-relative  top-0 start-0 w-100 "
          style={{
            height: "200px",
            // or any specific width you prefer
            backgroundImage: `url(${item.image})`,
            backgroundSize: "cover",
            borderRadius: "5px 5px 0 0",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            objectFit: "contain",
          }}
        >
          <div
            className="mb-3 mb-md-0  pt-13 "
            style={{
              width: "100px",
              height: "110px",
              marginLeft: "10px",
              // border: "5px white solid",
              // borderRadius: "40px",
              // position: "relative",
              // bottom: "0px",
            }}
          >
            {item.user && item.user.image && (
              <Link
                to={`/services/listing?id=${item._id}`}
                onClick={() => SearchActivity({ name: item.department })}
              >
                <Image
                  src={item.user.image}
                  alt={item.user.name}
                  className="img-fluid user-image button-0"
                  style={{
                    height: "100px",
                    borderRadius: "10px",
                  }}
                />
              </Link>
            )}
          </div>
        </div>

        <div className="content w-100 mt-3 px-5">
          <div className="d-flex justify-content-between mb-4">
            <div>
              <h3 className="mb-1 fs-4">
                <Link
                  to={`/services/listing?id=${item._id}`}
                  onClick={() => SearchActivity({ name: item.department })}
                  className="text-inherit me-1"
                >
                  {item.serviceName}
                </Link>
              </h3>
              <div>
                {item.user && item.user.name && (
                  <span>by {item.user.name}</span>
                )}
              </div>
            </div>
            <div>{/* Bookmark */}</div>
          </div>
        </div>
        <div className="details px-5 pb-5">
          <div className="mb-4">
            <div className="mb-2 mb-md-0">
              <div className="mt-1">
                <i className="fe fe-briefcase text-muted"></i>
                <span className="ms-1">{item.jobSalaryFormat}</span>
              </div>
              <div className="mt-1">
                {/* <FaNairaSign style={{ height: "14px" }} /> */}
                <span className="ms-1">
                  {formatPrice(item.currency, item.price)}
                </span>
              </div>
              <div className="mt-1">
                <i className="fe fe-map-pin text-muted"></i>
                <span className="ms-1 ">{item.serviceType}</span>
              </div>
            </div>
          </div>
          <div>
            <i className="fe fe-clock text-muted"></i>
            <span>{timeString}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ServiceListingGridviewCard;
