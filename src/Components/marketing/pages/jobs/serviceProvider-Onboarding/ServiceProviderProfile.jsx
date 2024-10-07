import { useState, useEffect, Fragment } from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import axios from "axios";
// import { FormSelect } from "../../../../elements/form-select/FormSelect";
import { useNavigate, useLocation } from "react-router-dom";
import { showToast } from "../../../../Showtoast";
import { CountryDropdown } from "react-country-region-selector";
import { MdCancel } from "react-icons/md";

const ServiceProviderProfile = () => {
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
            // setUserId(response.data.data.UserId);
            // setEmail(response.data.data.email);
          }
        } catch (error) {
          console.log("this is error");
        }
      };
      getUser();
    }
  }, [location]);

  const storedUserId = sessionStorage.getItem("UserId");
  const storedEmail = sessionStorage.getItem("email");
  useEffect(() => {
    if (storedUserId) {
      setUserId(storedUserId);
    }

    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const [formData, setFormData] = useState({
    userId: storedUserId,
    firstName: "",
    lastName: "",
    middleName: "",
    email: storedEmail || "",
    phoneNumber: "",
    // userImage: null,
    title: "",
    gender: "",
    country: "",
    language: "",
    responseTime: "",
    // date: "",
    skills: [],
    certification: [{ name: "", image: null }],
    portfolio: [{ name: "", images: [] }],
  });

  // const [phoneOption, setPhoneOption] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const phoneOptions = [
  //   { value: "Home", label: "Home" },
  //   { value: "Work", label: "Work" },
  //   { value: "Mobile", label: "Mobile" },
  // ];

  const [newSkill, setNewSkill] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("userId", formData.userId);
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("middleName", formData.middleName);
      formDataToSend.append("emailAddress", formData.email);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("language", formData.language);
      formDataToSend.append("responseTime", formData.responseTime);

      formData.skills.forEach((skill, index) => {
        formDataToSend.append(`skills[${index}]`, skill);
      });

      formData.certification.forEach((cert, index) => {
        formDataToSend.append(`certification[${index}][name]`, cert.name);
        if (cert.image) {
          formDataToSend.append(`certification[${index}][image]`, cert.image);
        }
      });

      formData.portfolio.forEach((port, index) => {
        formDataToSend.append(`portfolio[${index}][name]`, port.name);
        port.images.forEach((image, imgIndex) => {
          formDataToSend.append(`portfolio[${index}][images][]`, image);
        });
      });

      const response = await axios.post(
        "https://marketplacebackendas-test.azurewebsites.net/api/v1/onboard-service-provider",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);
      showToast(response.data.message);
      navigate("/ServiceProviderdashboard");
      setFormData({
        userId: storedUserId,
        firstName: "",
        lastName: "",
        middleName: "",
        email: email || "",
        phoneNumber: "",
        title: "",
        gender: "",
        country: "",
        language: "",
        responseTime: "",
        skills: [],
        certification: [{ name: "", image: null }],
        portfolio: [{ name: "", images: [] }],
      });
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      showToast(error.response.data.msg || error.message);
    }
  };

  const updateFormData = (data) => {
    setFormData({ ...formData, ...data });
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    const updatedskills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updatedskills });
  };

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
                  Prêt à offrir un service ? Remplissez les informations
                  suivantes pour devenir un Fournisseur de services
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
                        8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6
                        4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516
                        10.68 10.289 10 8 10c-2.29
                        0-3.516.68-4.168 1.332-.678.678-.83
                        1.418-.832 1.664h10z"
                      />
                    </svg>
                  </div>
                  {/* heading */}
                  <h3>Informations sur le fournisseur de services</h3>
                  <p>
                    Ajoutez vos informations personnelles qui seront liées à
                    votre profil d'entreprise
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
                  </Row>
                  <Row>
                    <Col md={6} xs={12} className="mb-3">
                      {/* Middle Name */}
                      <Form.Label htmlFor="middle-name">
                        Deuxième prénom
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="middle-name"
                        placeholder="Deuxième prénom"
                        value={formData.middleName}
                        onChange={(e) =>
                          updateFormData({ middleName: e.target.value })
                        }
                      />
                    </Col>
                    <Col md={6} xs={12} className="mb-3">
                      {/* Title */}
                      <Form.Label htmlFor="title">
                        Titre<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="title"
                        placeholder="Titre"
                        required
                        value={formData.title}
                        onChange={(e) =>
                          updateFormData({ title: e.target.value })
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} xs={12} className="mb-3">
                      {/* Email */}
                      <Form.Label htmlFor="email">
                        Email<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        id="email"
                        placeholder="Email"
                        required
                        value={email}
                        disabled
                        // onChange={(e) =>
                        //   updateFormData({ email: e.target.value })
                        // }
                      />
                    </Col>
                    <Col md={6} xs={12} className="mb-3">
                      {/* Phone Number */}
                      <Form.Label htmlFor="phone-number">
                        Numéro de téléphone
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="phone-number"
                        placeholder="Numéro de téléphone"
                        required
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          updateFormData({ phoneNumber: e.target.value })
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} xs={12} className="mb-3">
                      {/* Gender */}
                      <Form.Label htmlFor="gender">
                        Genre<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        as="select"
                        id="gender"
                        required
                        value={formData.gender}
                        onChange={(e) =>
                          updateFormData({ gender: e.target.value })
                        }
                      >
                        <option value="">Sélectionner le genre</option>
                        <option value="Male">Homme</option>
                        <option value="Female">Femme</option>
                        <option value="Other">Autre</option>
                      </Form.Control>
                    </Col>
                    <Col md={6} xs={12} className="mb-3">
                      {/* Country */}
                      <Form.Label htmlFor="country">
                        Pays<span className="text-danger">*</span>
                      </Form.Label>
                      <CountryDropdown
                        id="country"
                        className="form-control"
                        value={formData.country}
                        onChange={(val) => updateFormData({ country: val })}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} xs={12} className="mb-3">
                      {/* Language */}
                      <Form.Label htmlFor="language">
                      Langue<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="language"
                        placeholder="Langue"
                        required
                        value={formData.language}
                        onChange={(e) =>
                          updateFormData({ language: e.target.value })
                        }
                      />
                    </Col>
                    <Col md={6} xs={12} className="mb-3">
                      {/* Response Time */}
                      <Form.Label htmlFor="response-time">
                      Temps de réponse<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="response-time"
                        placeholder="Temps de réponse"
                        required
                        value={formData.responseTime}
                        onChange={(e) =>
                          updateFormData({ responseTime: e.target.value })
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    {/* <Col md={6} xs={12} className="mb-3"> */}
                    {/* Date */}
                    {/* <Form.Label htmlFor="date">
                        Date<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        id="date"
                        required
                        value={formData.date}
                        onChange={(e) =>
                          updateFormData({ date: e.target.value })
                        }
                      />
                    </Col> */}
                    {/* <Col md={6} xs={12} className="mb-3"> */}
                    {/* User Image */}
                    {/* <Form.Label htmlFor="user-image">
                        User Image{" "}
                        <small className="text-muted">
                          <em className="text-sm">
                            (image files only: png, jpeg, jpg, etc....)
                          </em>
                        </small>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        id="user-image"
                        accept="image/*"
                        onChange={(e) =>
                          updateFormData({ userImage: e.target.files[0] })
                        }
                      />
                    </Col> */}
                  </Row>
                  <Row>
                    <Col md={12} xs={12} className="mb-3">
                      {/* Skills */}
                      <Form.Label htmlFor="skills">Compétences</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          id="skills"
                          placeholder="Ajouter une compétence"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                        />
                        <Button variant="primary" onClick={addSkill}>
                        Ajouter une compétence
                        </Button>
                      </InputGroup>
                      <ul className="mt-2 list-inline">
                        {formData.skills.map((skill, index) => (
                          <li
                            key={index}
                            className="d-inline-block rounded-pill bg-light p-2 m-1"
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="me-auto">{skill}</span>
                              <Button
                                variant="link"
                                onClick={() => removeSkill(index)}
                                className="p-0"
                              >
                                <MdCancel />
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} xs={12} className="mb-3">
                      {/* Certification */}
                      <Form.Label htmlFor="certification">
                        Certification
                      </Form.Label>
                      {formData.certification.map((cert, index) => (
                        <Row key={index} className="align-items-center">
                          <Col md={10} xs={12} className="mb-3 d-inline-flex">
                            <Form.Control
                              type="text"
                              placeholder="Nom du certification"
                              value={cert.name}
                              onChange={(e) => {
                                const updatedCertifications = [
                                  ...formData.certification,
                                ];
                                updatedCertifications[index].name =
                                  e.target.value;
                                updateFormData({
                                  certification: updatedCertifications,
                                });
                              }}
                            />
                            &nbsp;
                            <Form.Control
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const updatedCertifications = [
                                  ...formData.certification,
                                ];
                                updatedCertifications[index].image =
                                  e.target.files[0];
                                updateFormData({
                                  certification: updatedCertifications,
                                });
                              }}
                            />
                          </Col>
                          <Col md={2} xs={12} className="mb-3">
                            <Button
                              variant="danger"
                              onClick={() => {
                                const updatedCertifications =
                                  formData.certification.filter(
                                    (_, i) => i !== index
                                  );
                                updateFormData({
                                  certification: updatedCertifications,
                                });
                              }}
                            >
                              Supprimer
                            </Button>
                          </Col>
                        </Row>
                      ))}
                      <Button
                        variant="primary"
                        onClick={() =>
                          updateFormData({
                            certification: [
                              ...formData.certification,
                              { name: "", image: null },
                            ],
                          })
                        }
                      >
                        Ajouter une certification
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} xs={12} className="mb-3">
                      {/* Portfolio */}
                      <Form.Label htmlFor="portfolio">Portfolio</Form.Label>
                      {formData.portfolio.map((port, index) => (
                        <div key={index} className="mb-3">
                          <Form.Control
                            type="text"
                            placeholder="Nom du portfolio"
                            value={port.name}
                            onChange={(e) => {
                              const updatedPortfolio = [...formData.portfolio];
                              updatedPortfolio[index].name = e.target.value;
                              updateFormData({ portfolio: updatedPortfolio });
                            }}
                            className="mb-2"
                          />
                          <Form.Control
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                              const updatedPortfolio = [...formData.portfolio];
                              updatedPortfolio[index].images = [
                                ...e.target.files,
                              ];
                              updateFormData({ portfolio: updatedPortfolio });
                            }}
                          />
                          <ul className="mt-2">
                            {port.images.length > 0 &&
                              Array.from(port.images).map((file, fileIndex) => (
                                <li key={fileIndex}>{file.name}</li>
                              ))}
                          </ul>
                          <Button
                            variant="danger"
                            onClick={() => {
                              const updatedPortfolio =
                                formData.portfolio.filter(
                                  (_, i) => i !== index
                                );
                              updateFormData({ portfolio: updatedPortfolio });
                            }}
                          >
                            Supprimer le portfolio
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="primary"
                        onClick={() =>
                          updateFormData({
                            portfolio: [
                              ...formData.portfolio,
                              { name: "", images: [] },
                            ],
                          })
                        }
                      >
                         Ajouter un portfolio
                      </Button>
                    </Col>
                  </Row>
                  <div className="mt-4">
                    <Button type="submit" variant="primary" disabled={loading}>
                      {loading ? "Submitting..." : "Soumettre"}
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </section>
    </Fragment>
  );
};

export default ServiceProviderProfile;
