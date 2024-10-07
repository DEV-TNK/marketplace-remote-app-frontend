import { useState, useEffect, Fragment } from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { FormSelect } from "../../../../elements/form-select/FormSelect";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../../../../../Components/Showtoast";
import { useGlobalContext } from "../../../../../context/AuthContext";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import NavbarDefault from "../../../../../Layout/navbars/NavbarJobPages";

const UpdateProviderProfile = () => {
  // const { userId } = useGlobalContext();
  const navigate = useNavigate();
  const [phoneOption, setPhoneOption] = useState("");
  const phoneOptions = [
    { value: "Home", label: "domicile" },
    { value: "Work", label: "travail" },
    { value: "Mobile", label: "Mobile" },
  ];
  const userId = sessionStorage.getItem("UserId");
  const [loading, setLoading] = useState(false);
  const [providerProfile, setProviderProfile] = useState(null);
  const [formData, setFormData] = useState({
    jobPosterId: userId,
    firstName: "",
    lastName: "",
    companyEmail: "",
    companyContact: "",
    companyName: "",
    companyWebsite: "",
    CompanyIndustry: "",
    companyDescription: "",
    companyLocation: "",
    companyLogo: null,
    companyDesignation: "",
    companyType: "",
  });

  const selectCountry = (val) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      companyLocation: val,
    }));
  };

  useEffect(() => {
    const fetchProviderProfile = async () => {
      try {
        const userId = sessionStorage.getItem("UserId");
        const response = await axios.get(
          `https://marketplacebackendas-test.azurewebsites.net/api/v1/get-provider-profile/${userId}`
        );
        const profileData = response.data;

        // Update provider profile state
        setProviderProfile(profileData);

        // Update form data with profile data
        if (profileData) {
          const {
            jobPosterId,
            firstName,
            lastName,
            companyEmail,
            companyContact,
            companyName,
            companyWebsite,
            CompanyIndustry,
            companyDescription,
            companyLogo,
            companyLocation,
            companyDesignation,
            companyType,
          } = profileData;

          setFormData({
            jobPosterId,
            firstName,
            lastName,
            companyEmail,
            companyContact,
            companyName,
            companyWebsite,
            CompanyIndustry,
            companyDescription,
            companyLocation,
            companyDesignation,
            companyType,
          });
        }
      } catch (error) {
        console.error("Error fetching provider profile:", error);
      }
    };

    fetchProviderProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();

      // Iterate over each key-value pair in formData and append to formDataToSend
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await axios.post(
        "https://marketplacebackendas-test.azurewebsites.net/api/v1/create-provider",
        formDataToSend, // Send the FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
          },
        }
      );
      setLoading(false);
      showToast(response.data.message);
      navigate("/Providerdashboard");
    } catch (error) {
      console.error("Error updating provider profile:", error);
      setLoading(false);
      showToast(error.response.data.msg);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "companyLogo" && files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0], // Set companyLogo to the File object
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
      <NavbarDefault />
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
                        name="firstName"
                        placeholder="Prénom"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
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
                        name="lastName"
                        placeholder="Nom de famille"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
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
                        name="companyEmail"
                        placeholder="Entrez votre adresse email"
                        required
                        value={formData.companyEmail}
                        onChange={handleChange}
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
                          name="companyContact"
                          required
                          value={formData.companyContact}
                          onChange={handleChange}
                        />
                        <Form.Control
                          as={FormSelect}
                          options={phoneOptions}
                          placeholder="États"
                          defaultselected=""
                          value={phoneOption}
                          onChange={handleChange}
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
                        name="companyName"
                        placeholder="Nom de l'entreprise"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
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
                        name="companyWebsite"
                        placeholder="Site Web de l'entreprise"
                        required
                        value={formData.companyWebsite}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col xs={12} className="mb-3">
                      {/* Company website */}
                      <Form.Label htmlFor="company-industry">
                      Secteur d'activité de l'entreprise<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="CompanyIndustry"
                        id="company-industry"
                        placeholder="Secteur d'activité de l'entreprise e.g Tech"
                        value={formData.CompanyIndustry}
                        onChange={handleChange}
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
                      {/* <Form.Select
                        onChange={handleChange}
                        value={formData.companyLocation}
                        name="companyLocation"
                      >
                        <option>Select Location</option>
                        {jobLocations.map((location, index) => (
                          <option key={index} value={location.value}>
                            {location.label}
                          </option>
                        ))}
                      </Form.Select> */}
                    </Col>

                    <Col xs={12} className="mb-3">
                      {/* Company website */}
                      <Form.Label htmlFor="company-type">
                      Type d'entreprise<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select
                        onChange={handleChange}
                        value={formData.companyType}
                        name="companyType"
                      >
                        <option>sélectionner le type</option>
                        {jobType.map((location, index) => (
                          <option key={index} value={location.value}>
                            {location.label}
                          </option>
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
                        onChange={handleChange}
                        value={formData.companyDesignation}
                        name="companyDesignation"
                      >
                        <option>sélectionner le titre</option>
                        {jobDesignation.map((location, index) => (
                          <option key={index} value={location.value}>
                            {location.label}
                          </option>
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
                          onChange={handleChange}
                        />
                        <Form.Label
                          htmlFor="company-logo"
                          className="input-group-text mb-0"
                        >
                          téléverser
                        </Form.Label>
                      </InputGroup>
                      <Form.Text className="fs-6">
                      Le logo de l'entreprise doit être un fichier PNG ou JPG de 500 x 500 pixels
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
                        name="companyDescription"
                        type="text"
                        placeholder="Description de l'entreprise"
                        required
                        value={formData.companyDescription}
                        onChange={handleChange}
                        rows={5}
                      />
                    </Col>
                    <Col md={12} xs={12} className="mb-5">
                      {/* confirmation checkbox */}
                      <Form.Check type="checkbox" id="tnd-accept">
                        <Form.Check.Input
                          type="checkbox"
                          checked={formData.termsAccepted}
                          onChange={handleChange}
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

export default UpdateProviderProfile;
