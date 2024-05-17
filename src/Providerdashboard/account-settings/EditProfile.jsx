// import node module libraries
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, Form, Row, Col, Button, Image } from "react-bootstrap";
import axios from "axios";
import { showToast } from "../../Components/Showtoast";
import { FormSelect } from "../../Components/elements/form-select/FormSelect";
import { FlatPickr } from "../../Components/elements/flat-pickr/FlatPickr";
import { useGlobalContext } from "../../context/AuthContext";
import InstructorProfileLayout from "../../Instructor/InstructorProfileLayout";
import Avatar3 from "../../assets/images/avatar/person.png";

const EditProfile = () => {
  const { userId } = useGlobalContext();
  const pathInfo = useLocation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    birthday: new Date(),
    state: "",
    country: "",
    image: null,
    portfolio: "", 
    description: "", 
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) return; // Add this check to ensure userId is defined
        const response = await axios.get(
          `https://remsana-backend-testing.azurewebsites.net/api/v1/get-user-details/${userId}`
        );
        const userData = response.data.userDetails;
        setFormData({
          firstName: userData.firstName,
          lastName: userData.lastName,
          contact: userData.contact,
          birthday: new Date(userData.birthday),
          state: userData.state,
          country: userData.country,
          image: userData.image,
          portfolio: userData.portfolio, 
          description: userData.description, 
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
        showToast(error.response?.data?.message || "An error occurred.");
      }
    };
  
    fetchUserData(); // Call fetchUserData only if userId is defined
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await axios.post(
        `https://remsana-backend-testing.azurewebsites.net/api/v1/update-profile/${userId}`,
        formDataToSend
      );
      showToast(response.data.message);

      // Reset form fields after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        contact: "",
        birthday: new Date(),
        state: "",
        country: "",
        image: null, 
        portfolio: "",
        description: "",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file); 
    const image = file ? URL.createObjectURL(file) : null;
    console.log("Image URL:", image); 
    setFormData({ ...formData, image });
  };


  const statelist = [
    { value: "Abia", label: "Abia" },
    { value: "Adamawa", label: "Adamawa" },
    { value: "Akwa Ibom", label: "Akwa Ibom" },
    { value: "Anambra", label: "Anambra" },
    { value: "Bauchi", label: "Bauchi" },
    { value: "Bayelsa", label: "Bayelsa" },
    { value: "Benue", label: "Benue" },
    { value: "Borno", label: "Borno" },
    { value: "Cross River", label: "Cross River" },
    { value: "Delta", label: "Delta" },
    { value: "Ebonyi", label: "Ebonyi" },
    { value: "Edo", label: "Edo" },
    { value: "Ekiti", label: "Ekiti" },
    { value: "Enugu", label: "Enugu" },
    { value: "Gombe", label: "Gombe" },
    { value: "Imo", label: "Imo" },
    { value: "Jigawa", label: "Jigawa" },
    { value: "Kaduna", label: "Kaduna" },
    { value: "Kano", label: "Kano" },
    { value: "Katsina", label: "Katsina" },
    { value: "Kebbi", label: "Kebbi" },
    { value: "Kogi", label: "Kogi" },
    { value: "Kwara", label: "Kwara" },
    { value: "Lagos", label: "Lagos" },
    { value: "Nasarawa", label: "Nasarawa" },
    { value: "Niger", label: "Niger" },
    { value: "Ogun", label: "Ogun" },
    { value: "Ondo", label: "Ondo" },
    { value: "Osun", label: "Osun" },
    { value: "Oyo", label: "Oyo" },
    { value: "Plateau", label: "Plateau" },
    { value: "Rivers", label: "Rivers" },
    { value: "Sokoto", label: "Sokoto" },
    { value: "Taraba", label: "Taraba" },
    { value: "Yobe", label: "Yobe" },
    { value: "Zamfara", label: "Zamfara" },
  ];

  const countrylist = [
    { value: "Nigeria", label: "Nigeria" },
    { value: "Togo", label: "Togo" },
  ];

  return (
    <InstructorProfileLayout>
      <Card className="border-0">
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Profile Details</h3>
            <p className="mb-0">
              You have full control to manage your own account setting.
            </p>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="d-lg-flex align-items-center justify-content-between">
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="d-flex align-items-center mb-4 mb-lg-0">
                <Image
                  src={formData.image || Avatar3}
                  id="img-uploaded"
                  className="avatar-xl rounded-circle"
                  alt="User Avatar"
                />
                <div className="ms-3">
                  <h4 className="mb-0">Your avatar</h4>
                  <p className="mb-0">
                    PNG or JPG, no bigger than 800px wide and tall.
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div>
                <Button variant="outline-secondary" size="sm">
                  Update
                </Button>{" "}
                <Button variant="outline-danger" size="sm">
                  Delete
                </Button>
              </div>
            </Form>
          </div>
          <hr className="my-5" />
          <div>
            <h4 className="mb-0">Personal Details</h4>
            <p className="mb-4">Edit your personal information and address.</p>
            {/* Form */}
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Row>
                {/* First name */}
                <Col md={6} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="contact"
                      placeholder="Phone"
                      required
                      value={formData.contact}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formBirthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      as={FlatPickr}
                      name="birthday"
                      placeholder="Date of Birth"
                      required
                      value={formData.birthday}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                
                <Col md={6} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formState">
                    <Form.Label>State</Form.Label>
                    <FormSelect
                      options={statelist}
                      type="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formCountry">
                    <Form.Label>Country</Form.Label>
                    <FormSelect
                      options={countrylist}
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>

                <Col md={6} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formShortPortfolio">
                    <Form.Label>Short Portfolio</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter a short Portfolio e.g (A Frontend Developer)"
                      required
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>

                {/* Portfolio Description */}
                <Col md={6} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Portfolio Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter your portfolio description e.g (i am an innovation designer.....)"
                      required
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>

                {/* Button */}
                <Col sm={12} md={12}>
                  {loading ? (
                    <Button
                      variant="primary"
                      type="submit"
                      className="opacity-50"
                      disabled
                    >
                      Processing
                    </Button>
                  ) : (
                    <Button variant="primary" type="submit">
                      Update Profile
                    </Button>
                  )}
                </Col>
              </Row>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </InstructorProfileLayout>
  );
};

export default EditProfile;
