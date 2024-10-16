import { useState } from "react";
import { Fragment } from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import axios from "axios";
import { FormSelect } from "../../../../elements/form-select/FormSelect";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../../../../context/AuthContext";
import { showToast } from "../../../../Showtoast";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useEffect } from "react";

const ProviderProfile = () => {
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const queryParam = new URLSearchParams(location.search);
    const userId = queryParam.get("Userid");
    if (userId) {
      const getUser = async () => {
        try {
          const response = await axios.get(
            `https://marketplacebackendas-test.azurewebsites.net/api/v1/get-fgn-user-details/${userId}`
          );
          if (response.data) {
            sessionStorage.setItem("accessToken", response.data.accessToken);
            sessionStorage.setItem("refreshToken", response.data.refreshToken);
            sessionStorage.setItem("UserId", response.data.data.UserId);
            sessionStorage.setItem("username", response.data.data.username);
            sessionStorage.setItem("image", response.data.data.image);
            sessionStorage.setItem("role", response.data.data.role);
            sessionStorage.setItem("email", response.data.data.email);
            setUserId(response.data.data.UserId);
            setEmail(response.data.data.email);
          }
        } catch (error) {
          console.log("this is error");
        }
      };
      getUser();
    }
  }, [location]);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("UserId");
    const storedEmail = sessionStorage.getItem("email");

    if (storedUserId) {
      setUserId(storedUserId);
    }

    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  // const { userId, email } = useGlobalContext();
  // const email = sessionStorage.getItem("email");

  console.log("this is userId", userId);
  // const UserId = sessionStorage.getItem("UserId");
  const [formData, setFormData] = useState({
    jobPosterId: userId || "",
    firstName: "",
    lastName: "",
    companyEmail: sessionStorage.getItem("email"),
    companyContact: "",
    companyName: "",
    companyWebsite: "",
    CompanyIndustry: "",
    companyLogo: null,
    companyDescription: "",
    companyLocation: "",
    companyDesignation: "",
    companyType: "",
  });
  const selectCountry = (val) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      companyLocation: val,
    }));
  };

  const [phoneOption, setPhoneOption] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const phoneOptions = [
    { value: "Home", label: "domicile" },
    { value: "Work", label: "travail" },
    { value: "Mobile", label: "Mobile" },
  ];

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      const response = await axios.post(
        "https://marketplacebackendas-test.azurewebsites.net/api/v1/create-provider",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);
      showToast(response.data.message);
      navigate("/Providerdashboard");
      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        companyEmail: email,
        companyContact: "",
        companyName: "",
        companyWebsite: "",
        companyIndustry: "",
        companyLogo: null,
        companyDescription: "",
        companyLocation: "",
        companyDesignation: "",
        companyType: "",
      });
      // Handle success notification or redirect
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      showToast(error.response.data.msg || error);
    }
  };
  // Function to update form data state
  const updateFormData = (data) => {
    setFormData({ ...formData, ...data, jobPosterId: userId || "" });
  };

  const jobType = [
    { value: "Individual", label: "Individual" },
    { value: "SME", label: "SME" },
    { value: "Startup", label: "Startup" },
    { value: "Corporation", label: "Corporation" },
    { value: "Government ", label: "Government " },
    { value: "Conglomerate", label: "Conglomerate" },
    { value: "NGO", label: "NGO" },
    { value: "Non of the Above", label: "Non of the Above" },
  ];

  const jobDesignation = [
    { value: "Agriculture", label: "Agriculture" },
    { value: "Mining", label: "Mining" },
    { value: "Fishing", label: "Fishing" },
    { value: "Forestry", label: "Forestry" },
    { value: "Manufacturing", label: "Manufacturing" },
    { value: "Construction", label: "Construction" },
    { value: "Retail", label: "Retail" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Hospitality", label: "Hospitality" },
    { value: "Education", label: "Education" },
    { value: "Finance", label: "Finance" },
    { value: "Transportation", label: "Transportation" },
    { value: "Information Technology", label: "Information Technology" },
    { value: "Research and Development", label: "Research and Development" },
    { value: "Consultancy", label: "Consultancy" },
    { value: "Energy", label: "Energy" },
    { value: "Real Estate", label: "Real Estate" },
    { value: "Media and Entertainment", label: "Media and Entertainment" },
    { value: "Government", label: "Government" },
  ];

  return (
    <Fragment>
      <section className="py-6 py-lg-12 bg-white">
        <Container>
          <Row>
            <Col md={12} lg={6}>
            <div className="mb-12">
                <h1 className="display-4 mb-3 fw-bold">
                Complétez ce profil pour continuer
                </h1>
                <p className="mb-0 lead">
                Prêt à publier une offre d'emploi pour votre entreprise ? Remplissez les informations suivantes pour devenir un Fournisseur d'emploi
                </p>
              </div>
            </Col>
          </Row>
          {/* form */}
          <Form encType="multipart/form-data" onSubmit={handleSubmit}>
            <Row>
              <Col lg={4} md={4} xs={12}>
                <div className="mb-4">
                  <div className="mb-4">
                    {/* icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      fill="currentColor"
                      className="bi bi-person text-primary"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0
                        6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4
                        8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6
                        4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516
                        10.68 10.289 10 8 10c-2.29
                        0-3.516.68-4.168 1.332-.678.678-.83
                        1.418-.832 1.664h10z"
                      />
                    </svg>
                  </div>
                  {/* heading */}
                  <h3>1. Informations sur le posteur d'emploi</h3>
                  <p>
                  Ajoutez vos informations personnelles qui seront liées à votre profil d'entreprise
                  </p>
                </div>
              </Col>
              <Col lg={{ span: 7, offset: 1 }} md={8} xs={12}>
                <div>
                  <Row>
                    <Col md={6} xs={12} className="mb-3">
                      {/* First Name */}
                      <Form.Label htmlFor="first-name">
                      Prénom<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="first-name"
                        placeholder="Prénom"
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          updateFormData({ firstName: e.target.value })
                        }
                      />
                    </Col>
                    <Col md={6} xs={12} className="mb-3">
                      {/* Last Name */}
                      <Form.Label htmlFor="last-name">
                      Nom de famille<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="last-name"
                        placeholder="Nom de famille"
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          updateFormData({ lastName: e.target.value })
                        }
                      />
                    </Col>
                    <Col md={12} xs={12} className="mb-3">
                      {/* Email */}
                      <Form.Label htmlFor="email">
                        Email<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        id="email"
                        placeholder="Entrez votre adresse email"
                        required
                        defaultValue={email || ""}
                        disabled
                      />
                    </Col>
                    <Col md={12} xs={12} className="mb-3">
                      {/* Phone Number */}
                      <Form.Label htmlFor="phone">
                      Numéro de téléphone<span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup className="mb-2">
                        <Form.Control
                          type="text"
                          id="phone"
                          placeholder="téléphone"
                          required
                          value={formData.companyContact}
                          onChange={(e) =>
                            updateFormData({ companyContact: e.target.value })
                          }
                        />
                        <Form.Control
                          as={FormSelect}
                          options={phoneOptions}
                          defaultselected=""
                          value={phoneOption}
                          onChange={(e) => setPhoneOption(e.target.value)}
                          required
                          style={{ maxWidth: "8rem" }}
                        />
                      </InputGroup>
                      {/* confirmation checkbox */}
                      <Form.Check
                        type="checkbox"
                        id="confirm"
                        label="Envoyez-moi des mises à jour importantes à ce numéro."
                        className="fs-6"
                        value=""
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <hr className="my-10" />
            <Row>
              <Col lg={4} md={4} xs={12}>
                <div className="mb-4">
                  <div className="mb-4">
                    {/* icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      fill="currentColor"
                      className="bi bi-building text-primary"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.763.075A.5.5 0 0 1 15
                        .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0
                        1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0
                        1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0
                        1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1
                        10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1
                        .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"
                      />
                      <path
                        d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2
                        2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2
                        0h1v1h-1V9zm-2 2h1v1H8v-1zm2
                        0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8
                        7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8
                        5h1v1H8V5zm2 0h1v1h-1V5zm2
                        0h1v1h-1V5zm0-2h1v1h-1V3z"
                      />
                    </svg>
                  </div>
                  {/* heading */}
                  <h3>2. Informations sur l'entreprise</h3>
                  {/* text */}
                  <p>
                  Ajoutez des informations sur l'entreprise qui aideront à identifier votre entreprise
                  </p>
                </div>
              </Col>
              <Col lg={{ span: 7, offset: 1 }} md={8} xs={12}>
                <div>
                  <Row>
                    <Col xs={12} className="mb-3">
                      {/* Company name */}
                      <Form.Label htmlFor="company-name">
                      Nom de l'entreprise<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="company-name"
                        placeholder="Nom de l'entreprise"
                        required
                        value={formData.companyName}
                        onChange={(e) =>
                          updateFormData({ companyName: e.target.value })
                        }
                      />
                    </Col>
                    <Col xs={12} className="mb-3">
                      {/* Company website */}
                      <Form.Label htmlFor="company-website">
                      Site Web de l'entreprise<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="company-website"
                        placeholder="Site Web de l'entreprise"
                        required
                        value={formData.companyWebsite}
                        onChange={(e) =>
                          updateFormData({ companyWebsite: e.target.value })
                        }
                      />
                    </Col>
                    <Col xs={12} className="mb-3">
                      {/* Company website */}
                      <Form.Label htmlFor="company-industry">
                        Secteur d'activité de l'entreprise<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="company-industry"
                        placeholder="Company Industry e.g Tech"
                        required
                        value={formData.CompanyIndustry}
                        onChange={(e) =>
                          updateFormData({ CompanyIndustry: e.target.value })
                        }
                      />
                    </Col>
                    <Col xs={12} className="mb-3">
                      {/* Company website */}
                      <Form.Label htmlFor="company-location">
                      Localisation de l'entreprise<span className="text-danger">*</span>
                      </Form.Label>
                      <div className="input-group">
                        <CountryDropdown
                          value={formData.companyLocation}
                          onChange={(val) => selectCountry(val)}
                          className="form-control" // Apply form-control class directly to CountryDropdown
                        />
                      </div>
                    </Col>

                    <Col xs={12} className="mb-3">
                      {/* Company website */}
                      <Form.Label htmlFor="company-type">
                        Type d'entreprise<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select
                        onChange={(e) =>
                          updateFormData({
                            companyType: e.target.value,
                          })
                        }
                      >
                        <option>sélectionner le type</option>
                        {jobType.map((location, index) => (
                          <option key={index}>{location.label}</option>
                        ))}
                      </Form.Select>
                    </Col>

                    <Col xs={12} className="mb-3">
                      {/* Company website */}
                      <Form.Label htmlFor="company-designation">
                      Désignation de l'entreprise
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select
                        onChange={(e) =>
                          updateFormData({
                            companyDesignation: e.target.value,
                          })
                        }
                      >
                        <option>sélectionner le titre</option>
                        {jobDesignation.map((location, index) => (
                          <option key={index}>{location.label}</option>
                        ))}
                      </Form.Select>
                    </Col>

                    <Col md={12} xs={12} className="mb-3">
                      {/* Company Logo */}
                      <Form.Label>Logo de l'entreprise</Form.Label>
                      <InputGroup className="mb-2">
                        <Form.Control
                          id="company-logo"
                          type="file"
                          name="companyLogo"
                          accept=".png, .jpg, .jpeg" // Accept only PNG and JPG files
                          onChange={(e) =>
                            updateFormData({ companyLogo: e.target.files[0] })
                          }
                        />
                        <Form.Label
                          htmlFor="company-logo"
                          className="input-group-text mb-0"
                        >
                          téléverser
                        </Form.Label>
                      </InputGroup>
                      <Form.Text className="fs-6">
                      Company logo should be a PNG or JPG file of 500 x 500 pixels // Le logo de l'entreprise doit être un fichier PNG ou JPG de 500 x 500 pixels
                      </Form.Text>
                    </Col>

                    <Col md={12} xs={12} className="mb-3">
                      {/* Company description */}
                      <Form.Label htmlFor="company-description">
                      Description de l'entreprise
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        className="form-control"
                        id="company-description"
                        name="company-description"
                        type="text"
                        placeholder="Company description"
                        required
                        value={formData.companyDescription}
                        onChange={(e) =>
                          updateFormData({ companyDescription: e.target.value })
                        }
                        rows={5}
                      />
                    </Col>
                    <Col md={12} xs={12} className="mb-5">
                      {/* confirmation checkbox */}
                      <Form.Check type="checkbox" id="tnd-accept">
                        <Form.Check.Input
                          type="checkbox"
                          checked={formData.termsAccepted}
                          onChange={(e) =>
                            updateFormData({ termsAccepted: e.target.checked })
                          }
                        />
                        <Form.Check.Label>
                          J'accepte les <Link to="#">termes et conditions </Link>{" "}pour la publication d'une offre d'emploi dans l'entreprise
                        </Form.Check.Label>
                      </Form.Check>
                    </Col>
                    <Col md={12} xs={12}>
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
                          Soumettre
                        </Button>
                      )}
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </section>
    </Fragment>
  );
};

export default ProviderProfile;
