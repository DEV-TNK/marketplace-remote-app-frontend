import React, { useState, useEffect } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { useGlobalContext } from "../../context/AuthContext";
import { showToast } from "../../Components/Showtoast";
import axios from "axios";
import InstructorProfileLayout from "../JobSeekerProfileLayout";

const SocialProfiles = () => {
  const { userId } = useGlobalContext();
  const [formData, setFormData] = useState({
    twitter: "",
    youtube: "",
    instagram: "",
    facebook: "",
    LinkedIn: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchSocialProfiles = async () => {
      const userId = sessionStorage.getItem("UserId");
      try {
        if (!userId) return;
        const response = await axios.get(
          `https://unleashified-backend.azurewebsites.net/api/v1/get-social-profile/${userId}`
        );
        const user = response.data.user;
        // Set the retrieved social profile data into the form fields
        setFormData({
          twitter: user.twitter || "",
          youtube: user.youtube || "",
          instagram: user.instagram || "",
          facebook: user.facebook || "",
          LinkedIn: user.LinkedIn || "",
        });
      } catch (error) {
        console.error("Error fetching social profiles:", error);
      }
    };

    fetchSocialProfiles();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if at least one of the fields is filled out
    if (
      !formData.twitter &&
      !formData.instagram &&
      !formData.facebook &&
      !formData.LinkedIn &&
      !formData.youtube
    ) {
      showToast("Please fill out at least one social profile", "error");
      setLoading(false);
      return;
    }

    try {
      // Set unfilled inputs to "nil"
      const formDataToSend = {
        userId,
        twitter: formData.twitter || "nil",
        instagram: formData.instagram || "nil",
        facebook: formData.facebook || "nil",
        LinkedIn: formData.LinkedIn || "nil",
        youtube: formData.youtube || "nil",
      };

      const response = await axios.post(
        "https://unleashified-backend.azurewebsites.net/api/v1/update-social",
        formDataToSend
      );

      if (response.status === 200) {
        showToast("Social profiles updated successfully", "success");
        setFormData([ ...formData, formDataToSend.data]);
      } else {
        showToast("Failed to update social profiles", "error");
      }
    } catch (error) {
      console.error("Error updating social profiles:", error);
      // showToast("An error occurred while updating social profiles", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <InstructorProfileLayout>
      <Card className="border-0">
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Social Profiles</h3>
            <p className="mb-0">
              Add your social profile links in below social accounts.
            </p>
          </div>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/*  Twitter  */}
            <Row className="mb-5">
              <Col lg={3} md={4} sm={12}>
                <h5>Twitter</h5>
              </Col>
              <Col lg={9} md={8} sm={12}>
                <Form.Control
                  type="text"
                  name="twitter"
                  placeholder="Twitter Profile Name"
                  className="form-control mb-1"
                  value={formData.twitter}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            {/*  Facebook  */}
            <Row className="mb-5">
              <Col lg={3} md={4} sm={12}>
                <h5>Facebook</h5>
              </Col>
              <Col lg={9} md={8} sm={12}>
                <Form.Control
                  type="text"
                  name="facebook"
                  placeholder="Facebook Profile Name"
                  className="form-control mb-1"
                  value={formData.facebook}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            {/*  Instagram  */}
            <Row className="mb-5">
              <Col lg={3} md={4} sm={12}>
                <h5>Instagram</h5>
              </Col>
              <Col lg={9} md={8} sm={12}>
                <Form.Control
                  type="text"
                  name="instagram"
                  placeholder="Instagram Profile Name"
                  className="form-control mb-1"
                  value={formData.instagram}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            {/*  Linked in  */}
            <Row className="mb-5">
              <Col lg={3} md={4} sm={12}>
                <h5>LinkedIn Profile URL</h5>
              </Col>
              <Col lg={9} md={8} sm={12}>
                <Form.Control
                  type="text"
                  name="LinkedIn"
                  placeholder="LinkedIn Profile URL"
                  className="form-control mb-1"
                  value={formData.LinkedIn}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            {/*  Youtube  */}
            <Row className="mb-3">
              <Col lg={3} md={4} sm={12}>
                <h5>YouTube</h5>
              </Col>
              <Col lg={9} md={8} sm={12}>
                <Form.Control
                  type="text"
                  name="youtube"
                  placeholder="YouTube URL"
                  className="form-control mb-1"
                  value={formData.youtube}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            {/* Error message */}
            {errors.general && (
              <Row className="mb-3">
                <Col
                  lg={{ span: 9, offset: 3 }}
                  md={{ span: 8, offset: 4 }}
                  sm={12}
                >
                  <Form.Text className="text-danger">
                    {errors.general}
                  </Form.Text>
                </Col>
              </Row>
            )}

            {/*  Button  */}
            <Row>
              <Col lg={{ span: 6, offset: 3 }} sm={12}>
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? "Processing..." : "Save Social Profile"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </InstructorProfileLayout>
  );
};

export default SocialProfiles;
