// import node module libraries
import { Card, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaNairaSign } from "react-icons/fa6";

// import custom components
import GKTippy from "../../../elements/tooltips/GKTippy";

import axios from "axios";
import { showToast } from "../../../Showtoast";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

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

const ServiceMainListViewCard = (props) => {
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

  const time = getTimeDifference(item.updatedAt);
  const timeString = getTimeDifferenceString(time);

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
    <Card className="card-bordered mb-4 card-hover cursor-pointer">
      <Card.Body>
        <div>
          <div className="d-md-flex">
            <div className="col-md-3">
              {item.user && item.user.image && (
                <Link
                  to={`/services/listing?id=${item._id}`}
                  onClick={() => SearchActivity({ name: item.department })}
                >
                  <Image
                    src={item.user.image}
                    alt={item.user.name}
                    className="img-fluid"
                    style={{ maxHeight: "100px", maxWidth: "100%" }}
                  />
                </Link>
              )}
            </div>
            <div className="ms-md-3 w-100 mt-3 mt-xl-1">
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <h3 className="mb-1 fs-4">
                    <Link
                      to={`/services/listing?id=${item._id}`}
                      onClick={() => SearchActivity({ name: item.department })}
                      className="text-inherit me-1"
                    >
                      {item.serviceName}
                    </Link>
                    {/* {item.featured && (
                      <span className="badge bg-danger-soft ms-2">
                        Featured Job
                      </span>
                    )} */}
                  </h3>
                  <div>
                    <span>category of {item.department}</span>

                    <span className="ms-0">(0 Reviews)</span>
                  </div>
                  <span className="mt-2">
                    Service Description:{" "}
                    {item.description.length > 50
                      ? `${item.description.substring(0, 50)}...`
                      : item.description}
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  {/* Button group */}
                  <div>
                    {/* 
                    <Button
                      variant="outline-primary"
                      className="me-2 mb-2 mb-md-0"
                      onClick={() => navigate(`/jobs/edit-a-service/${item._id}`)}
                    >
                      Edit
                    </Button>
                     */}
                    {/* <Button variant="outline-danger" onClick={handleDelete}>
                        Delete
                      </Button> */}
                  </div>
                </div>
              </div>
              <div className="d-md-flex justify-content-between ">
                <div className="mb-2 mb-md-0">
                  <span className="me-2">
                    <i className="fe fe-briefcase text-muted"></i>
                    <span className="ms-1 ">{item.experience}</span>
                  </span>
                  <span className="me-2">
                    {/* <i className="fe fe-naira-sign text-muted"></i> */}
                    {/* <FaNairaSign style={{ height: "14px" }} /> */}
                    <span className="ms-1 ">
                      {formatPrice(item.currency, item.price)}
                    </span>
                  </span>
                  <span className="me-2">
                    <i className="fe fe-map-pin text-muted"></i>
                    <span className="ms-1 ">{item.serviceType}</span>
                  </span>
                  <span className="me-2">
                    <i className="fe fe-clock text-muted"></i>
                    <span className="ms-1 ">{item.jobSalaryFormat}</span>
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

export default ServiceMainListViewCard;
