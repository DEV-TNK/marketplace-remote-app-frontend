import React, { useState } from "react";
import { Row, Col, Image, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LevelIconWithTooltip from "../miscellaneous/LevelIconWithTooltip";
import CheckedMark from "../../../../assets/images/svg/checked-mark.svg";
import ProfileBackground from "../../../../assets/images/background/profile-bg.jpg";
import axios from "axios";
import { showToast } from "../../../Showtoast";

const ProfileCover = ({ dashboardData, browseButton, outsourceButton }) => {
  const [avatarImage, setAvatarImage] = useState(dashboardData.avatar);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", sessionStorage.getItem("UserId"));

    axios.post("https://unleashified-backend.azurewebsites.net/api/v1/provider-logo-update", formData)
      .then((response) => {
        console.log("Image uploaded successfully:", response.data);
        setAvatarImage(response.data.user.imageUrl);
        showToast(response.data.message);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        showToast(error.response.data.error);
      });
  };

  return (
    <Row className="align-items-center">
      <Col xl={12} lg={12} md={12} sm={12}>
        <div
          className="pt-16 rounded-top-md"
          style={{
            background: `url(${ProfileBackground})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <Card className="px-4 pt-2 pb-4 rounded-0 rounded-bottom shadow-sm">
          <div className="d-flex align-items-end justify-content-between">
            <div className="d-flex align-items-center">
              <div className="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
                <Image
                  src={avatarImage}
                  className="avatar-xl rounded-circle border border-4 border-white position-relative"
                  alt=""
                />
                {dashboardData.verified && (
                  <Link
                    to="#"
                    className="position-absolute top-0 end-0"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-original-title="Verified"
                  >
                    <Image src={CheckedMark} alt="" height="30" width="30" />
                  </Link>
                )}
              </div>
              <div className="lh-1">
                <h2 className="mb-0">
                  {dashboardData.name}{" "}
                  <LevelIconWithTooltip level={dashboardData.level} />{" "}
                </h2>
                <p className="mb-0 d-block">{dashboardData.username}</p>
              </div>
            </div>
            <div className="d-flex align-items-center mt-3">
              <Button
                variant="outline-primary"
                className="btn-sm"
                onClick={() => document.getElementById("image-upload").click()}
              >
                Update Image
              </Button>
              <input
                type="file"
                id="image-upload"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <Link
                to={browseButton.link}
                className={`btn btn${
                  browseButton.outlinebutton ? "-outline" : ""
                }-primary btn-sm d-none d-md-block ms-2`}
              >
                {browseButton.linkname}
              </Link>
              <Link
                to={dashboardData.link}
                className={`btn btn${
                  dashboardData.outlinebutton ? "-outline" : ""
                }-primary btn-sm d-none d-md-block ms-2`}
              >
                {dashboardData.linkname}
              </Link>
              <Link
                to={outsourceButton.link}
                className={`btn btn${
                  dashboardData.outlinebutton ? "-outline" : ""
                }-primary btn-sm d-none d-md-block ms-2`}
              >
                {outsourceButton.linkname}
              </Link>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileCover;
