import { useState, Fragment } from "react";
import { Col, Row, Form, Container, Button, InputGroup } from "react-bootstrap";
import axios from "axios";
import { useGlobalContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MdCancel, MdPayments } from "react-icons/md";
import { showToast } from "../../Components/Showtoast";

const PostService = () => {
  const { userId } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [header, setHeader] = useState("");
  const [prefix, setPrefix] = useState("I will");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [format, setFormat] = useState("");
  const [serviceBackground, setServiceBackground] = useState([]);
  const [currency, setCurrency] = useState("");
  const [newFeature, setNewFeature] = useState("");
  // const [PackageType, setPakageType] = useState("");
  const [pricingPlan, setPricingPlan] = useState("starter");
  const [pricingPackages, setPricingPackages] = useState({
    starter: {
      header: "",
      shortDescription: "",
      price: "",
      deliveryTime: "",
      packageType: "",
      copyright: "",
      fdd: "",
      additionalRevision: "",
      whatsIncluded: [],
    },
    professional: {
      basic: {
        header: "",
        shortDescription: "",
        price: "",
        deliveryTime: "",
        packageType: "",
        copyright: "",
        fdd: "",
        additionalRevision: "",
        whatsIncluded: [],
      },
      standard: {
        header: "",
        shortDescription: "",
        price: "",
        deliveryTime: "",
        packageType: "",
        copyright: "",
        fdd: "",
        additionalRevision: "",
        whatsIncluded: [],
      },
      premium: {
        header: "",
        shortDescription: "",
        price: "",
        deliveryTime: "",
        packageType: "",
        copyright: "",
        fdd: "", //extra fast delivery
        additionalRevision: "",
        whatsIncluded: [],
      },
    },
  });

  const departments = [
    { label: "Select Department", label_fr: "Sélectionner le département" },
    { value: "Graphics and Design", label: "Graphics and Design", label_fr: "Graphisme et Design" },
    { value: "Digital Marketing", label: "Digital Marketing", label_fr: "Marketing Digital" },
    { value: "Writing & Translation", label: "Writing & Translation", label_fr: "Rédaction et Traduction" },
    { value: "Video & Animation", label: "Video & Animation", label_fr: "Vidéo et Animation" },
    { value: "Music & Audio", label: "Music & Audio", label_fr: "Musique et Audio" },
    { value: "Programming & Tech", label: "Programming & Tech", label_fr: "Programmation et Technologie" },
    { value: "Business", label: "Business", label_fr: "Affaires" },
    { value: "Lifestyle", label: "Lifestyle", label_fr: "Style de Vie" },
    { value: "AI Services", label: "AI Services", label_fr: "Services d'IA" },
    { value: "Project Manager", label: "Project Manager", label_fr: "Chef de Projet" },
    { value: "Web Development", label: "Web Development", label_fr: "Développement Web" },
];

const formatType = [
    { label: "Select Format", label_fr: "Sélectionner le Format" },
    { value: "remote", label: "Remote", label_fr: "À distance" },
    { value: "onsite", label: "Onsite", label_fr: "Sur site" },
    { value: "hybrid", label: "Hybrid", label_fr: "Hybride" },
];


  const currencyType = [
    { value: "", label: "Select Currency" },
    { value: "NGN", label: "Naira" },
    { value: "USD", label: "Dollars" },
    { value: "EUR", label: "Euros" },
    { value: "GBP", label: "Pounds" },
  ];

  const packageOption = [
    { value: "single", label: "seul" },
    { value: "multiple", label: "Multiple" },
  ];

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fullHeader = `${prefix} ${header}`;

    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("header", fullHeader);
      formData.append("description", description);
      formData.append("department", department);
      formData.append("format", format);
      formData.append("currency", currency);

      // Append serviceBackground files
      serviceBackground.forEach((file, index) => {
        formData.append(`serviceBackground[${index}]`, file);
      });

      // Append pricing details
      formData.append("pricing[currency]", currency);
      formData.append(
        "pricing[type]",
        pricingPlan === "starter" ? "Standard" : "Professional"
      );

      // Handle professional pricing plans with different packages (basic, standard, premium)
      const packages =
        pricingPlan === "starter"
          ? [{ ...pricingPackages.starter, packagePlan: "Starter" }]
          : [
              { ...pricingPackages.professional.basic, packagePlan: "Basic" },
              {
                ...pricingPackages.professional.standard,
                packagePlan: "Standard",
              },
              {
                ...pricingPackages.professional.premium,
                packagePlan: "Premium",
              },
            ];
      // ? [pricingPackages.starter]
      // : Object.values(pricingPackages.professional);

      packages.forEach((pkg, index) => {
        formData.append(
          `pricing[packages][${index}][packagePlan]`,
          pkg.packagePlan
        );
        formData.append(`pricing[packages][${index}][header]`, pkg.header);
        formData.append(
          `pricing[packages][${index}][shortDescription]`,
          pkg.shortDescription || ""
        );
        formData.append(
          `pricing[packages][${index}][price]`,
          Number(pkg.price) || 0
        );
        formData.append(
          `pricing[packages][${index}][deliveryTime]`,
          pkg.deliveryTime || ""
        );
        formData.append(
          `pricing[packages][${index}][additionalRevision][price]`,
          pkg.additionalRevision || 0
        );
        formData.append(
          `pricing[packages][${index}][additionalRevision][additionalDays]`,
          pkg.additionalDays || 0
        );
        formData.append(
          `pricing[packages][${index}][copyrights][price]`,
          pkg.copyright || 0
        );
        formData.append(
          `pricing[packages][${index}][copyrights][additionalDays]`,
          pkg.additionalDays || 0
        );
        formData.append(
          `pricing[packages][${index}][extraFastDelivery][price]`,
          pkg.fdd || 0
        );
        pkg.whatsIncluded.forEach((item, i) => {
          formData.append(
            `pricing[packages][${index}][incentives][${i}]`,
            item
          );
        });
      });

      const response = await axios.post(
        "https://marketplacebackendas-test.azurewebsites.net/api/v1/provider-create-service",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(formData);
      console.log("Response:", response.data);
      showToast(response.data.message);
      navigate("/ServiceProviderdashboard/All-Gig");
      // resetForm();
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  // const resetForm = () => {
  //   setHeader("");
  //   setDescription("");
  //   setTags({
  //     desiredCandidate: [],
  //     jobResponsibilities: [],
  //     jobPerksAndBenefits: [],
  //   });
  //   setDepartment("");
  //   setFormat("");
  //   setServiceBackground([]);
  //   setCurrency("");
  //   setPricingPlan("starter");
  //   setPricingPackages({
  //     starter: {
  //       header: "",
  //       shortDescription: "",
  //       price: "",
  //       deliveryTime: "",
  //     },
  //     professional: {
  //       basic: {
  //         header: "",
  //         shortDescription: "",
  //         price: "",
  //         deliveryTime: "",
  //       },
  //       standard: {
  //         header: "",
  //         shortDescription: "",
  //         price: "",
  //         deliveryTime: "",
  //       },
  //       premium: {
  //         header: "",
  //         shortDescription: "",
  //         price: "",
  //         deliveryTime: "",
  //       },
  //     },
  //   });
  // };

  const handleBackgroundChange = (files) => {
    setServiceBackground([...serviceBackground, ...files]);
  };

  const handleRemoveBackground = (index) => {
    setServiceBackground(serviceBackground.filter((_, i) => i !== index));
  };

  const handlePricingPackageChange = (plan, field, value, type = "starter") => {
    setPricingPackages((prevPackages) => {
      if (type === "professional") {
        return {
          ...prevPackages,
          professional: {
            ...prevPackages.professional,
            [plan]: {
              ...prevPackages.professional[plan],
              [field]: value,
            },
          },
        };
      }
      return {
        ...prevPackages,
        [plan]: { ...prevPackages[plan], [field]: value },
      };
    });
  };

  const pricingTypes = [
    { value: "starter", label: "Débutant" },
    { value: "professional", label: "Professionnel" },
  ];

  const addFeature = (planType, packageType = null) => {
    if (newFeature.trim()) {
      setPricingPackages((prevState) => {
        const updatedState = { ...prevState };
        if (planType === "starter") {
          if (!updatedState.starter.whatsIncluded.includes(newFeature.trim())) {
            updatedState.starter.whatsIncluded = [
              ...prevState.starter.whatsIncluded,
              newFeature.trim(),
            ];
          }
        } else if (planType === "professional") {
          if (
            !updatedState.professional[packageType].whatsIncluded.includes(
              newFeature.trim()
            )
          ) {
            updatedState.professional[packageType].whatsIncluded = [
              ...prevState.professional[packageType].whatsIncluded,
              newFeature.trim(),
            ];
          }
        }
        return updatedState;
      });
      setNewFeature("");
    }
  };

  const removeFeature = (planType, index, packageType = null) => {
    setPricingPackages((prevState) => {
      const updatedState = { ...prevState };
      if (planType === "starter") {
        updatedState.starter.whatsIncluded =
          prevState.starter.whatsIncluded.filter((_, i) => i !== index);
      } else if (planType === "professional") {
        updatedState.professional[packageType].whatsIncluded =
          prevState.professional[packageType].whatsIncluded.filter(
            (_, i) => i !== index
          );
      }
      return updatedState;
    });
  };

  return (
    <Fragment>
      <section className="py-6 py-lg-14 bg-white">
        <Container>
          <Row>
            <Col md={12}>
              <Col lg={6} className="mb-12">
                <h3
                  className="display-4 mb-3 fw-bold"
                  style={{ color: "#754ffe" }}
                >
                  Publier un service
                </h3>
                <p className="mb-4 lead">
                Boostez votre carrière : partagez votre expertise avec des clients du monde entier sur notre plateforme !
                </p>
              </Col>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={4} className="mb-3">
                    <div className="mb-4 mt-4">
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
                    <h3 className="display-5" style={{ color: "#754ffe" }}>
                    Détails du service
                    </h3>
                    <p className="text-muted">
                    Fournissez les détails de votre service
                    </p>
                  </Col>
                  <Col md={8} className="mb-8">
                    <Form.Group
                      as={Row}
                      className="mb-3 mt-4 justify-content-center"
                    >
                      <Col md={9} className="mb-3">
                        <Form.Label md={4} htmlFor="header">
                        En-tête<span className="text-danger">*</span>
                        </Form.Label>
                        <div className="d-flex">
                          <Form.Select
                            value={prefix}
                            onChange={(e) => setPrefix(e.target.value)}
                            style={{
                              marginRight: "0",
                              paddingRight: "0",
                              maxWidth: "150px",
                              borderTopRightRadius: "0",
                              borderBottomRightRadius: "0",
                            }}
                          >
                            <option value="I will">Je vais</option>
                            <option value="Our Agency will">
                            Notre agence va
                            </option>
                          </Form.Select>
                          <Form.Control
                            type="text"
                            id="header"
                            placeholder="Entrer l'en-tête"
                            value={header}
                            onChange={(e) => setHeader(e.target.value)}
                            required
                            style={{
                              marginLeft: "0",
                              paddingLeft: "10px",
                              borderTopLeftRadius: "0",
                              borderBottomLeftRadius: "0",
                            }}
                          />
                        </div>
                      </Col>
                      <Col md={9} className="mb-3">
                        <Form.Label md={4} htmlFor="description">
                          Description<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          id="description"
                          rows={4}
                          placeholder="Entrer la description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </Col>
                      <Col md={5} className="mb-3">
                        <Form.Label md={2} htmlFor="department">
                        Département<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                          as="select"
                          id="department"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          required
                        >
                          {departments.map((dept, index) => (
                            <option key={index} value={dept.value}>
                              {dept.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={4} className="mb-3">
                        <Form.Label md={2} htmlFor="format">
                          Format<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                          as="select"
                          id="format"
                          defaultValue="Select Format"
                          value={format}
                          onChange={(e) => setFormat(e.target.value)}
                          required
                        >
                          {formatType.map((dept, index) => (
                            <option key={index} value={dept.value}>
                              {dept.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={9} className="mb-3">
                        <Form.Label md={4} htmlFor="serviceBackground">
                        Arrière-plan du service{" "}
                          <small className="text-muted">
                            <em className="text-sm">
                            (fichiers d'images uniquement : png, jpeg, jpg, etc....)
                            </em>
                          </small>
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) =>
                            handleBackgroundChange(e.target.files)
                          }
                        />
                        <div style={{ marginTop: "0.5rem" }}>
                          {serviceBackground.map((image, index) => (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "0.5rem",
                              }}
                              className="d-inline-flex"
                            >
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Background ${index}`}
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  marginRight: "1px",
                                }}
                              />
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleRemoveBackground(index)}
                                style={{ marginRight: "10px" }}
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      </Col>
                    </Form.Group>
                  </Col>
                  <hr style={{ color: "#754ffe" }} />
                  {/* Pricing Section */}
                  <Col md={4} className="mb-3 mt-4">
                    <div className="mb-4">
                      <MdPayments
                        style={{ color: "#754ffe", width: 30, height: 30 }}
                      />
                    </div>
                    <h3 className="display-5" style={{ color: "#754ffe" }}>
                    Tarification
                    </h3>
                    <p className="text-muted">
                    Définissez la tarification pour votre service
                    </p>
                  </Col>
                  <Col md={8}>
                    <Form.Group
                      as={Row}
                      className="mb-3 mt-4 justify-content-center"
                    >
                      <Col md={5}>
                        <Form.Label md={2} htmlFor="currency">
                        Devise<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                          as="select"
                          id="currency"
                          placeholder="Devise"
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          required
                        >
                          {currencyType.map((currency, index) => (
                            <option key={index} value={currency.value}>
                              {currency.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={5}>
                        <Form.Label md={4} htmlFor="pricingPlan">
                        Plan tarifaire<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                          as="select"
                          id="pricingPlan"
                          value={pricingPlan}
                          onChange={(e) => setPricingPlan(e.target.value)}
                          required
                        >
                          {pricingTypes.map((plan, index) => (
                            <option key={index} value={plan.value}>
                              {plan.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3"></Form.Group>
                    {pricingPlan === "starter" ? (
                      <div>
                        <h2
                          className="text-center"
                          style={{ color: "#754ffe" }}
                        >
                          Plan de démarrage
                        </h2>
                        <Form.Group
                          as={Row}
                          className="mb-3 justify-content-center"
                        >
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="starterHeader">
                            En-tête<span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="starterHeader"
                              placeholder="Entrer l'en-tête"
                              value={pricingPackages.starter.header}
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "starter",
                                  "header",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label
                              md={4}
                              htmlFor="starterShortDescription"
                            >
                              Brève description
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="starterShortDescription"
                              placeholder="Entrer une brève description"
                              value={pricingPackages.starter.shortDescription}
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "starter",
                                  "shortDescription",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="starterPrice">
                            Prix<span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              id="starterPrice"
                              placeholder="Entrer le prix"
                              value={pricingPackages.starter.price}
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "starter",
                                  "price",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="starterDeliveryTime">
                            Délai de livraison
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="starterDeliveryTime"
                              placeholder="Entrer le délai de livraison"
                              value={pricingPackages.starter.deliveryTime}
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "starter",
                                  "deliveryTime",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </Col>
                          <Col md={10} xs={12} className="mb-3">
                            {/* What's included */}
                            <Form.Label htmlFor="whatsIncluded">
                            Qu'est-ce qui est inclus ?
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup>
                              <Form.Control
                                type="text"
                                id="whatsIncluded"
                                placeholder=" Ajouter des fonctionnalités incluses dans ce package"
                                value={newFeature}
                                onChange={(e) => setNewFeature(e.target.value)}
                              />
                              <Button
                                variant="primary"
                                onClick={() => addFeature("starter")}
                              >
                                Ajouter plus
                              </Button>
                            </InputGroup>
                            <ul className="mt-2 list-inline">
                              {pricingPackages.starter.whatsIncluded.map(
                                (feature, index) => (
                                  <li
                                    key={index}
                                    className="d-inline-block rounded-pill bg-light p-2 m-1"
                                  >
                                    <div className="d-flex justify-content-between align-items-center">
                                      <span className="me-auto">{feature}</span>
                                      <Button
                                        variant="link"
                                        onClick={() =>
                                          removeFeature("starter", index)
                                        }
                                        className="p-0"
                                      >
                                        <MdCancel />
                                      </Button>
                                    </div>
                                  </li>
                                )
                              )}
                            </ul>
                          </Col>

                          <Col md={5}>
                            <Form.Label md={2} htmlFor="package type">
                            Type de forfait 
                              <small className="text-muted">
                                <em>
                                (Autoriser des services uniques/multiples par plan.)
                                </em>
                              </small>
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Select
                              as="select"
                              id="packageType"
                              placeholder="Enter Package type"
                              value={pricingPackages.starter.packageType}
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "starter",
                                  "packageType",
                                  e.target.value
                                )
                              }
                              required
                            >
                              {packageOption.map((packageV, index) => (
                                <option key={index} value={packageV.value}>
                                  {packageV.label}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="CopyrightPrice">
                            Prix du copyright
                              <small className="text-muted">
                                <em>(optionnel)</em>
                              </small>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              id="CopyrightPrice"
                              placeholder="Entrer le prix du droit d'auteur"
                              value={pricingPackages.starter.copyright}
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "starter",
                                  "copyright",
                                  e.target.value
                                )
                              }
                            />
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="Fdd">
                            Prix de la livraison en 1 jour rapide 
                              <small className="text-muted">
                                <em>(optionnel)</em>
                              </small>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              id="Fast-1-day"
                              placeholder="entrer le prix"
                              value={pricingPackages.starter.fdd}
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "starter",
                                  "fdd",
                                  e.target.value
                                )
                              }
                            />
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="additionalRevision">
                            Prix de révision supplémentaire
                              <small className="text-muted">
                                <em>(optionnel)</em>
                              </small>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              id="Additional-revision"
                              placeholder="entrer le prix"
                              value={pricingPackages.starter.additionalRevision}
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "starter",
                                  "additionalRevision",
                                  e.target.value
                                )
                              }
                            />
                          </Col>
                        </Form.Group>
                      </div>
                    ) : (
                      <>
                        <h2
                          className="text-center"
                          style={{ color: "#754ffe" }}
                        >
                          Professional Plan
                        </h2>
                        <Form.Group
                          as={Row}
                          className="mb-3 mt-4 justify-content-center"
                        >
                          <h3
                            className="text-center mb-2"
                            style={{ color: "#754ffe" }}
                          >
                            BASIC
                          </h3>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="basicHeader">
                              Basic Header<span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="basicHeader"
                              placeholder="Enter header"
                              value={pricingPackages.professional.basic.header}
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "basic",
                                  "header",
                                  e.target.value,
                                  "professional"
                                )
                              }
                              required
                            />
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="basicShortDescription">
                              Short Description
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="basicShortDescription"
                              placeholder="Enter short description"
                              value={
                                pricingPackages.professional.basic
                                  .shortDescription
                              }
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "basic",
                                  "shortDescription",
                                  e.target.value,
                                  "professional"
                                )
                              }
                              required
                            />
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="basicPrice">
                              Price<span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="basicPrice"
                              placeholder="entrer le prix"
                              value={pricingPackages.professional.basic.price}
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "basic",
                                  "price",
                                  e.target.value,
                                  "professional"
                                )
                              }
                              required
                            />
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="basicDeliveryTime">
                              Delivery Time
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="basicDeliveryTime"
                              placeholder="Enter delivery time"
                              value={
                                pricingPackages.professional.basic.deliveryTime
                              }
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "basic",
                                  "deliveryTime",
                                  e.target.value,
                                  "professional"
                                )
                              }
                              required
                            />
                          </Col>
                          <Col md={10} xs={12} className="mb-3">
                            {/* What's included */}
                            <Form.Label htmlFor="whatsIncluded">
                              What&apos;s included ?
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup>
                              <Form.Control
                                type="text"
                                id="whatsIncluded"
                                placeholder="Add features that comes with this package"
                                value={newFeature}
                                onChange={(e) => setNewFeature(e.target.value)}
                              />
                              <Button
                                variant="primary"
                                onClick={() =>
                                  addFeature("professional", "basic")
                                }
                              >
                                Add More
                              </Button>
                            </InputGroup>
                            <ul className="mt-2 list-inline">
                              {pricingPackages.professional.basic.whatsIncluded.map(
                                (feature, index) => (
                                  <li
                                    key={index}
                                    className="d-inline-block rounded-pill bg-light p-2 m-1"
                                  >
                                    <div className="d-flex justify-content-between align-items-center">
                                      <span className="me-auto">{feature}</span>
                                      <Button
                                        variant="link"
                                        onClick={() =>
                                          removeFeature(
                                            "professional",
                                            index,
                                            "basic"
                                          )
                                        }
                                        className="p-0"
                                      >
                                        <MdCancel />
                                      </Button>
                                    </div>
                                  </li>
                                )
                              )}
                            </ul>
                          </Col>
                          <Col md={5}>
                            <Form.Label md={2} htmlFor="package type">
                              Package Type
                              <small className="text-muted">
                                <em>
                                  (Allow single/multiple services per plan.)
                                </em>
                              </small>
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Select
                              as="select"
                              id="packageType"
                              placeholder="Enter Package type"
                              value={
                                pricingPackages.professional.basic.packageType
                              }
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "basic",
                                  "packageType",
                                  e.target.value,
                                  "professional"
                                )
                              }
                              required
                            >
                              {packageOption.map((packageV, index) => (
                                <option key={index} value={packageV.value}>
                                  {packageV.label}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="CopyrightPrice">
                              Copyright Price
                              <small className="text-muted">
                                <em>(optional)</em>
                              </small>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              id="CopyrightPrice"
                              placeholder="Enter Copyright price"
                              value={
                                pricingPackages.professional.basic.copyright
                              }
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "basic",
                                  "copyright",
                                  e.target.value,
                                  "professional"
                                )
                              }
                            />
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="Fdd">
                              Fast-1-day delivery price
                              <small className="text-muted">
                                <em>(optional)</em>
                              </small>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              id="Fast-1-day"
                              placeholder="entrer le prix"
                              value={pricingPackages.professional.basic.fdd}
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "basic",
                                  "fdd",
                                  e.target.value,
                                  "professional"
                                )
                              }
                            />
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="additionalRevision">
                              Additional Revision Price
                              <small className="text-muted">
                                <em>(optional)</em>
                              </small>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              id="Additional-revision"
                              placeholder="entrer le prix"
                              value={
                                pricingPackages.professional.basic
                                  .additionalRevision
                              }
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "basic",
                                  "additionalRevision",
                                  e.target.value,
                                  "professional"
                                )
                              }
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group
                          as={Row}
                          className="mb-3 mt-4 justify-content-center"
                        >
                          <h3
                            className="text-center mb-2 "
                            style={{ color: "#754ffe" }}
                          >
                            STANDARD
                          </h3>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="standardHeader">
                              Standard Header
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="standardHeader"
                              placeholder="Enter header"
                              value={
                                pricingPackages.professional.standard.header
                              }
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "standard",
                                  "header",
                                  e.target.value,
                                  "professional"
                                )
                              }
                              required
                            />
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label
                              md={4}
                              htmlFor="standardShortDescription"
                            >
                              Short Description
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="standardShortDescription"
                              placeholder="Enter short description"
                              value={
                                pricingPackages.professional.standard
                                  .shortDescription
                              }
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "standard",
                                  "shortDescription",
                                  e.target.value,
                                  "professional"
                                )
                              }
                              required
                            />
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="standardPrice">
                              Price<span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="standardPrice"
                              placeholder="entrer le prix"
                              value={
                                pricingPackages.professional.standard.price
                              }
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "standard",
                                  "price",
                                  e.target.value,
                                  "professional"
                                )
                              }
                              required
                            />
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="standardDeliveryTime">
                              Delivery Time
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="standardDeliveryTime"
                              placeholder="Enter delivery time"
                              value={
                                pricingPackages.professional.standard
                                  .deliveryTime
                              }
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "standard",
                                  "deliveryTime",
                                  e.target.value,
                                  "professional"
                                )
                              }
                              required
                            />
                          </Col>
                          <Col md={10} xs={12} className="mb-3">
                            {/* What's included */}
                            <Form.Label htmlFor="whatsIncluded">
                              What&apos;s included ?
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup>
                              <Form.Control
                                type="text"
                                id="whatsIncluded"
                                placeholder="Add features that comes with this package"
                                value={newFeature}
                                onChange={(e) => setNewFeature(e.target.value)}
                              />
                              <Button
                                variant="primary"
                                onClick={() =>
                                  addFeature("professional", "standard")
                                }
                              >
                                Add More
                              </Button>
                            </InputGroup>
                            <ul className="mt-2 list-inline">
                              {pricingPackages.professional.standard.whatsIncluded.map(
                                (feature, index) => (
                                  <li
                                    key={index}
                                    className="d-inline-block rounded-pill bg-light p-2 m-1"
                                  >
                                    <div className="d-flex justify-content-between align-items-center">
                                      <span className="me-auto">{feature}</span>
                                      <Button
                                        variant="link"
                                        onClick={() =>
                                          removeFeature(
                                            "professional",
                                            index,
                                            "standard"
                                          )
                                        }
                                        className="p-0"
                                      >
                                        <MdCancel />
                                      </Button>
                                    </div>
                                  </li>
                                )
                              )}
                            </ul>
                          </Col>
                          <Col md={5}>
                            <Form.Label md={2} htmlFor="package type">
                              Package Type
                              <small className="text-muted">
                                <em>
                                  (Allow single/multiple services per plan.)
                                </em>
                              </small>
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Select
                              as="select"
                              id="packageType"
                              placeholder="Enter Package type"
                              value={
                                pricingPackages.professional.standard
                                  .packageType
                              }
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "standard",
                                  "packageType",
                                  e.target.value,
                                  "professional"
                                )
                              }
                              required
                            >
                              {packageOption.map((packageV, index) => (
                                <option key={index} value={packageV.value}>
                                  {packageV.label}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="CopyrightPrice">
                              Copyright Price
                              <small className="text-muted">
                                <em>(optional)</em>
                              </small>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              id="CopyrightPrice"
                              placeholder="Enter Copyright price"
                              value={
                                pricingPackages.professional.standard.copyright
                              }
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "standard",
                                  "copyright",
                                  e.target.value,
                                  "professional"
                                )
                              }
                            />
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="Fdd">
                              Fast-1-day delivery price
                              <small className="text-muted">
                                <em>(optional)</em>
                              </small>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              id="Fast-1-day"
                              placeholder="entrer le prix"
                              value={pricingPackages.professional.standard.fdd}
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "standard",
                                  "fdd",
                                  e.target.value,
                                  "professional"
                                )
                              }
                            />
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="additionalRevision">
                              Additional Revision Price
                              <small className="text-muted">
                                <em>(optional)</em>
                              </small>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              id="Additional-revision"
                              placeholder="entrer le prix"
                              value={
                                pricingPackages.professional.standard
                                  .additionalRevision
                              }
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "standard",
                                  "additionalRevision",
                                  e.target.value,
                                  "professional"
                                )
                              }
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group
                          as={Row}
                          className="mb-3 mt-4 justify-content-center"
                        >
                          <h3
                            className="text-center"
                            style={{ color: "#754ffe" }}
                          >
                            PREMIUM
                          </h3>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="premiumHeader">
                              Premium Header
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="premiumHeader"
                              placeholder="Enter header"
                              value={
                                pricingPackages.professional.premium.header
                              }
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "premium",
                                  "header",
                                  e.target.value,
                                  "professional"
                                )
                              }
                              required
                            />
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label
                              md={4}
                              htmlFor="premiumShortDescription"
                            >
                              Short Description
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="premiumShortDescription"
                              placeholder="Enter short description"
                              value={
                                pricingPackages.professional.premium
                                  .shortDescription
                              }
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "premium",
                                  "shortDescription",
                                  e.target.value,
                                  "professional"
                                )
                              }
                              required
                            />
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="premiumPrice">
                              Price<span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="premiumPrice"
                              placeholder="entrer le prix"
                              value={pricingPackages.professional.premium.price}
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "premium",
                                  "price",
                                  e.target.value,
                                  "professional"
                                )
                              }
                              required
                            />
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="premiumDeliveryTime">
                              Delivery Time
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="premiumDeliveryTime"
                              placeholder="Enter delivery time"
                              value={
                                pricingPackages.professional.premium
                                  .deliveryTime
                              }
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "premium",
                                  "deliveryTime",
                                  e.target.value,
                                  "professional"
                                )
                              }
                              required
                            />
                          </Col>
                          <Col md={10} xs={12} className="mb-3">
                            {/* What's included */}
                            <Form.Label htmlFor="whatsIncluded">
                              What&apos;s included ?
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup>
                              <Form.Control
                                type="text"
                                id="whatsIncluded"
                                placeholder="Add features that comes with this package"
                                value={newFeature}
                                onChange={(e) => setNewFeature(e.target.value)}
                              />
                              <Button
                                variant="primary"
                                onClick={() =>
                                  addFeature("professional", "premium")
                                }
                              >
                                Add More
                              </Button>
                            </InputGroup>
                            <ul className="mt-2 list-inline">
                              {pricingPackages.professional.premium.whatsIncluded.map(
                                (feature, index) => (
                                  <li
                                    key={index}
                                    className="d-inline-block rounded-pill bg-light p-2 m-1"
                                  >
                                    <div className="d-flex justify-content-between align-items-center">
                                      <span className="me-auto">{feature}</span>
                                      <Button
                                        variant="link"
                                        onClick={() =>
                                          removeFeature(
                                            "professional",
                                            index,
                                            "premium"
                                          )
                                        }
                                        className="p-0"
                                      >
                                        <MdCancel />
                                      </Button>
                                    </div>
                                  </li>
                                )
                              )}
                            </ul>
                          </Col>
                          <Col md={5}>
                            <Form.Label md={2} htmlFor="package type">
                              Package Type
                              <small className="text-muted">
                                <em>
                                  (Allow single/multiple services per plan.)
                                </em>
                              </small>
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Select
                              as="select"
                              id="packageType"
                              placeholder="Enter Package type"
                              value={
                                pricingPackages.professional.premium.packageType
                              }
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "premium",
                                  "packageType",
                                  e.target.value,
                                  "professional"
                                )
                              }
                              required
                            >
                              {packageOption.map((packageV, index) => (
                                <option key={index} value={packageV.value}>
                                  {packageV.label}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="CopyrightPrice">
                              Copyright Price
                              <small className="text-muted">
                                <em>(optional)</em>
                              </small>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              id="CopyrightPrice"
                              placeholder="Enter Copyright price"
                              value={
                                pricingPackages.professional.premium.copyright
                              }
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "premium",
                                  "copyright",
                                  e.target.value,
                                  "professional"
                                )
                              }
                            />
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="Fdd">
                              Fast-1-day delivery price
                              <small className="text-muted">
                                <em>(optional)</em>
                              </small>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              id="Fast-1-day"
                              placeholder="entrer le prix"
                              value={pricingPackages.professional.premium.fdd}
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "premium",
                                  "fdd",
                                  e.target.value,
                                  "professional"
                                )
                              }
                            />
                          </Col>
                          <Col md={5} className="mb-3">
                            <Form.Label md={4} htmlFor="additionalRevision">
                              Additional Revision Price
                              <small className="text-muted">
                                <em>(optional)</em>
                              </small>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              id="Additional-revision"
                              placeholder="entrer le prix"
                              value={
                                pricingPackages.professional.premium
                                  .additionalRevision
                              }
                              onChange={(e) =>
                                handlePricingPackageChange(
                                  "premium",
                                  "additionalRevision",
                                  e.target.value,
                                  "professional"
                                )
                              }
                            />
                          </Col>
                        </Form.Group>
                      </>
                    )}
                  </Col>
                  <Col md={12} className="text-end mb-3">
                    <Button
                      variant="primary"
                      type="submit"
                      style={{
                        padding: "10px 16px",
                        fontSize: "1rem",
                        marginRight: "70px",
                      }}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Soumettre"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default PostService;
