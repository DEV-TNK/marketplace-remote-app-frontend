import React, { useState, useEffect } from "react";
import {
  ButtonGroup,
  ToggleButton,
  Col,
  Row,
  Form,
  Container,
  Button,
} from "react-bootstrap";
import GKTagsInput from "../../../../../Components/elements/tags/GKTagsInput";
import { FormSelect } from "../../../../elements/form-select/FormSelect";
import axios from "axios";
import { useGlobalContext } from "../../../../../context/AuthContext";
import { showToast } from "../../../../Showtoast";
import { useNavigate, useParams } from "react-router-dom";

const EditAService = () => {
  const { userId } = useGlobalContext();
  const {id } = useParams()
  const [tags, setTags] = useState({
    serviceBenefits: [],
  });
  const [loading, setLoading] = useState(false);
  const [serviceHeading, setServiceHeading] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [department, setDepartment] = useState("");
  const [serviceUrls, setServiceUrls] = useState([{ name: "", url: "" }]);
  const [serviceType, setServiceType] = useState("");
  const [status, setStatus] = useState("active");
  const [totalJobDone, setTotalJobDone] = useState("");
  const [jobSalaryFormat, setJobSalaryFormat] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [currency, setCurrency] = useState("")

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await axios.get(`https://unleashified-backend.azurewebsites.net/api/v1/get-a-service/${id}`);
        const serviceData = response.data.service; // Assuming the API response contains service data
  
        // Update state variables with fetched service data
        setServiceHeading(serviceData.serviceHeading);
        setServiceName(serviceData.serviceName);
        setDescription(serviceData.description);
        setExperience(serviceData.experience);
        setDepartment(serviceData.department);
        setServiceUrls(serviceData.serviceUrl);
        setServiceType(serviceData.serviceType);
        setStatus(serviceData.status);
        setTotalJobDone(serviceData.totalJobDone);
        setJobSalaryFormat(serviceData.jobSalaryFormat);
        setPrice(serviceData.price);
        setTags({ serviceBenefits: serviceData.benefit });
        setImage(serviceData.image);
        setCurrency(serviceData.currency);

        // Select the department option in the dropdown
      const departmentSelect = document.getElementById('department-select');
      if (departmentSelect) {
        departmentSelect.value = serviceData.department;
      }

      const salaryFormatSelect = document.getElementById('salary-format');
      if(salaryFormatSelect){
        salaryFormatSelect.value = serviceData.jobSalaryFormat;
      }

      const currencySelect = document.getElementById('currency');
      if (currencySelect){
        currencySelect.value = serviceData.currency
      }
      // console.log(serviceData)
      } catch (error) {
        console.error("Error fetching service data:", error);
        showToast("Error fetching service data");
      }
    };
  
    fetchServiceData();
  }, [id]);
  

  const handleTagAdd = (tag, category) => {
    setTags((prevTags) => ({
      ...prevTags,
      [category]: [...prevTags[category], tag],
    }));
  };
  const navigate = useNavigate();

  const handleTagRemove = (tag, category) => {
    setTags((prevTags) => ({
      ...prevTags,
      [category]: prevTags[category].filter((t) => t.name !== tag.name),
    }));
  };

  const handleNameChange = (index, value) => {
    const updatedUrls = [...serviceUrls];
    updatedUrls[index].name = value;
    setServiceUrls(updatedUrls);
  };

  const handleUrlChange = (index, value) => {
    const updatedUrls = [...serviceUrls];
    updatedUrls[index].url = value;
    setServiceUrls(updatedUrls);
  };

  const addUrlField = () => {
    setServiceUrls([...serviceUrls, { name: "", url: "" }]);
  };

  const removeUrlField = (index) => {
    const updatedUrls = [...serviceUrls];
    updatedUrls.splice(index, 1);
    setServiceUrls(updatedUrls);
  };

  const handleImageChange = (file) => {
    if (file) {
      // Update the image state with the file object
      setImage(file);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      const formattedTags = {
        serviceBenefits: tags.serviceBenefits.map((tag) => ({
          name: tag.name,
        })),
      };
      const formattedServiceUrls = serviceUrls.map((item) => ({
        name: item.name,
        url: item.url,
      }));

      const formattedBenefits = JSON.stringify(formattedTags.serviceBenefits);
      const formattedServicelink = JSON.stringify(formattedServiceUrls);

      const formData = new FormData();
      formData.append("seekerId", userId);
      formData.append("serviceHeading",serviceHeading);
      formData.append("serviceName", serviceName);
      formData.append("benefit", formattedTags.serviceBenefits);
      formData.append("description", description);
      formData.append("serviceUrl", formattedServiceUrls);
      formData.append("experience", experience);
      formData.append("department", department);
      formData.append("serviceType", serviceType);
      formData.append("status", status);
      formData.append("jobSalaryFormat", jobSalaryFormat);
      formData.append("price", price);
      formData.append("currency", currency);
      if (image) {
        formData.append("image", image);
      }
  

      const response = await axios.patch(
        `https://unleashified-backend.azurewebsites.net/api/v1/edit-service/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      showToast(response.data.message);
      navigate("/JobSeekerdashboard");
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      showToast(error.response.data.msg);
      
    }
  };


  const departments = [
    { value: "Graphics & Design", label: "Graphics & Design" },
    { value: "Digital Marketing", label: "Digital Marketing" },
    { value: "Video & Animation", label: "Video & Animation" },
    { value: "Music & Audio", label: "Music & Audio" },
    { value: "Programming & Tech", label: "Programming & Tech" },
    { value: "Business Development", label: "Business Development" },
    { value: "Photography", label: "Photography" },
    { value: "Catering", label: "Catering" },
    { value: "Lifestyle & Health", label: "Lifestyle & Health" },
    { value: "Logo Making", label: "Logo Making" },
    { value: "Mobile Developer", label: "Mobile Developer" },
    { value: "Data Analytics", label: "Data Analytics" },
    { value: "Product Manager", label: "Product Manager" },
    { value: "UI / UX Design", label: "UI / UX Design" },
    { value: "SEO", label: "SEO" },
    { value: "Finance", label: "Finance" },
    { value: "End-to-End Projects", label: "End-to-End Projects" },
    { value: "SEO", label: "SEO" },
  ];

  const jobSalaryFormats = [
    { value: "Fixed", label: "Fixed" },
    { value: "Hourly", label: "Hourly" },
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
    { value: "Yearly", label: "Yearly" },
  ];


    // // Function to format price with currency symbol
    // const formatPrice = (currency, price) => {
    //   switch (currency) {
    //     case "naira":
    //       return `₦${price}`;
    //         case "dollars":
    //           return `$${price}`;
    //         case "euros":
    //           return `€${price}`;
    //         case "pounds":
    //           return `£${price}`;
    //         default:
    //           return price;
    //       }
    //       };


  return (
    <section className="py-6 py-lg-12 bg-white">
      <Container>
        <Row>
          <Col md={12} lg={5}>
            <div className="mb-12">
              <h1 className="display-4 mb-3 fw-bold">Edit Service</h1>
              <p className="mb-0 lead">
                Ready to edit a Service for yourself? Choose your service below
                and edit all the service information
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={4} md={4} xs={12}>
            <div className="mb-4">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="currentColor"
                  className="bi bi-info-circle text-primary"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0
                8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    d="m8.93
                  6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738
                  3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252
                  1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275
                  0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0
                  1 1 0 0 1 2 0z"
                  />
                </svg>
              </div>
              <h3> Service information</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adillicitudin iaculis
                nunc et convallis.
              </p>
            </div>
          </Col>
          <Col lg={{ span: 7, offset: 1 }} md={8} xs={12}>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Row>
                {/* Job Title */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="service-title">
                    Service Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="service-title"
                    placeholder="Write  the service Title"
                    required
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                  />
                </Col>
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="service-heading">
                    Service Heading
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    id="job-description"
                    placeholder="Write Service Heading"
                    value={serviceHeading}
                    onChange={(e) => setServiceHeading(e.target.value)}
                  />
                </Col>
                {/* Job Role */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="job-role">
                    Service Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    id="job-role"
                    placeholder="Write Service Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Col>
                {/* Select Department */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="department">
                    Select Service Department
                    <span className="text-danger">*</span>
                  </Form.Label>

                  <Form.Control
                    as={FormSelect}
                    id="department-select"
                    options={departments}
                    placeholder="Select Service Department"
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                  />
                </Col>

                <Col md={12} xs={12} className="mb-3">
                  {/* Job location */}
                  <Form.Label className="d-block">Service Type</Form.Label>
                  <Form.Check
                    type="radio"
                    name="job-format"
                    label="Onsite"
                    checked={serviceType === "Onsite"}
                    onChange={() => setServiceType("Onsite")}
                  />
                  <Form.Check
                    type="radio"
                    name="job-format"
                    label="Remote"
                    checked={serviceType === "Remote"}
                    onChange={() => setServiceType("Remote")}
                  />
                  <Form.Check
                    type="radio"
                    name="job-format"
                    label="Hybrid"
                    checked={serviceType === "Hybrid"}
                    onChange={() => setServiceType("Hybrid")}
                  />
                </Col>

                {/* Job Salary */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="job-salary">Service Price</Form.Label>
                  <Form.Control
                    type="text"
                    id="job-salary"
                    placeholder="Enter Service Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Col>

                 {/* Select Currency */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="currency">Currency</Form.Label>
                  <Form.Control
                    as="select"
                    id="currency"
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="">Select currency</option>
                    <option value="NGN">Naira</option>
                    <option value="EUR">Euros</option>
                    <option value="USD">Dollars</option>
                    <option value="GBP">Pounds</option>
                  </Form.Control>
                </Col>

                {/* Select Job Format */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="jobSalaryFormat">
                    Service Price Format<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as={FormSelect}
                    options={jobSalaryFormats}
                    id="salary-format"
                    placeholder="Select Service Price format"
                    onChange={(e) => setJobSalaryFormat(e.target.value)}
                    required
                  />
                </Col>
                {/* Job Experience */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="job-experience">
                    Job Experience
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="job-experience"
                    placeholder="Enter job experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </Col>
                {/* Job Delivery */}
                {/* <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="job-delivery">Total job done</Form.Label>
                  <Form.Control
                    type="text"
                    id="job-delivery"
                    placeholder="Enter Total Job done"
                    value={totalJobDone}
                    onChange={(e) => setTotalJobDone(e.target.value)}
                  />
                </Col> */}

                {/* Job Responsibilities */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="serviceBenefits">
                    Service Benefits
                  </Form.Label>
                  <GKTagsInput
                    defaultTags={tags.serviceBenefits}
                    onAddTag={(tag) => handleTagAdd(tag, "serviceBenefits")}
                    onRemoveTag={(tag) =>
                      handleTagRemove(tag, "serviceBenefits")
                    }
                  />
                </Col>
                <Row>
                  {/* General form label for Service URLs */}
                  <Col md={12} className="mb-3">
                    <Form.Label>Service(s) URL(s) </Form.Label>
                  </Col>

                  {/* Render serviceUrl inputs dynamically */}
                  {serviceUrls && serviceUrls.map((item, index) => (
                    <React.Fragment key={index}>
                      <Col md={5} className="mb-3">
                        <Form.Label htmlFor={`url-name-${index}`}>
                          URL Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          id={`url-name-${index}`}
                          placeholder="Enter URL Name"
                          value={item.name}
                          onChange={(e) =>
                            handleNameChange(index, e.target.value)
                          }
                        />
                      </Col>
                      <Col md={5} className="mb-3">
                        <Form.Label htmlFor={`url-link-${index}`}>
                          URL Link
                        </Form.Label>
                        <Form.Control
                          type="text"
                          id={`url-link-${index}`}
                          placeholder="Enter URL Link"
                          value={item.url}
                          onChange={(e) =>
                            handleUrlChange(index, e.target.value)
                          }
                        />
                      </Col>
                      <Col md={2} className="mb-3 align-self-end">
                        {index > 0 && (
                          <Button
                            variant="danger"
                            onClick={() => removeUrlField(index)}
                            className="mt-auto"
                          >
                            Remove
                          </Button>
                        )}
                      </Col>
                    </React.Fragment>
                  ))}
                  <Col md={12} className="mb-3">
                    <Button variant="primary" onClick={addUrlField}>
                      Add More
                    </Button>
                  </Col>
                </Row>

                 {/* upload image */}
                <Row>
                  <Col md={12} xs={12} className="mb-3 mt-3">
                    <Form.Label>
                    Upload service Image <em>(PNG or JPG, no bigger than 800px wide and tall.)</em>
                    </Form.Label>

                    <Form.Control
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e.target.files[0])}
                    />
                  </Col>
                </Row>

                {/* Submit Button */}
                <Col md={12} xs={12} className="mb-3">
                  {loading ? (
                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      className="opacity-50"
                      disabled
                    >
                      Processing
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={handleSubmit}>
                      Submit
                    </Button>
                  )}
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EditAService;