import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { CountryDropdown } from "react-country-region-selector";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineNavigateNext } from "react-icons/md";
import { PiNumberCircleThreeFill, PiNumberCircleTwoFill } from "react-icons/pi";
import flutterwave from "../../../../../assets/Flutterwave.png";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { showToast } from "../../../../../Components/Showtoast";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../../../context/AuthContext";
import AxiosInterceptor from "../../../../../Components/AxiosInterceptor";

const ServiceBilling = () => {
  const authFetch = AxiosInterceptor()
  const location = useLocation();
  const [dataToPass, setDataToPass] = useState(null);
  console.log(dataToPass);
  const navigate = useNavigate();

  const { id } = useParams();

  const { user } = useGlobalContext();

  useEffect(() => {
    setDataToPass(location.state?.dataToPass || null);
  }, [location.state]);

  console.log(dataToPass);

  const userName = sessionStorage.getItem("username");
  const currency = dataToPass?.service?.pricing?.currency;

  const serviceId = dataToPass?.service?._id;

  const [billingInfo, setBillingInfo] = useState({
    username: userName,
    country: "",
    companyName: "",
    state: "",
    address: "",
  });

  const [paymentOption, setPaymentOption] = useState("");
  const [rememberPayment, setRememberPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notLogin, setNotLogin] = useState(false);
  const [navigatePage, setNavigatePage] = useState(false);
  const [navigateLoginPage, setNavigateLoginPage] = useState(false);
  const [billingInfoData, setBillingInfoData] = useState(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState({
    fullName: userName,
    companyName: "",
    country: "",
    state: "",
    address: "",
  });

  useEffect(() => {
    if (user && userName == null) {
      setNotLogin(true);
    }
  }, [user]);

  useEffect(() => {
    if (notLogin) {
      setNavigateLoginPage(true);
    }
  }, []);

  const handleLoginNavigate = () => {
    if (navigateLoginPage) {
      navigate(`/authentication/signin`);
    } else {
      navigate(`/`);
    }
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    setPaymentOption(e.target.value);
  };

  const handleRememberPaymentChange = (e) => {
    setRememberPayment(e.target.checked);
  };

  const handleAddDetails = () => {
    setShowModal(true);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setAdditionalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleCountryChange = (val) => {
    setAdditionalInfo((prevInfo) => ({
      ...prevInfo,
      country: val,
    }));
  };

  const handleSaveDetails = () => {
    setBillingInfo({
      ...billingInfo,
      username: additionalInfo.fullName,
      companyName: additionalInfo.companyName,
      country: additionalInfo.country,
      state: additionalInfo.state,
      address: additionalInfo.address,
    });
    setBillingInfoData({
      ...billingInfo,
      username: additionalInfo.fullName,
      companyName: additionalInfo.companyName,
      country: additionalInfo.country,
      state: additionalInfo.state,
      address: additionalInfo.address,
    });
    setShowModal(false);
  };

  // Function to calculate VAT and total
  const calculateTotal = (price) => {
    const vat = price * 0.075;
    const total = price + vat;
    return { vat, total };
  };

  // If dataToPass is available, calculate the VAT and total
  const { vat, total } = dataToPass
    ? calculateTotal(dataToPass.totalPrice)
    : { vat: 0, total: 0 };

  const shortenedDescription = dataToPass?.service?.description?.slice(0, 100);
  const displayDescription =
    dataToPass?.service?.description?.length > 100
      ? `${shortenedDescription}...`
      : shortenedDescription;

  // flutterwave payment
  const generateTxRef = () => {
    const randomString = Math.random().toString(36).substring(7);
    const timestamp = Date.now();
    return `${timestamp}-${randomString}`;
  };

  const handleFlutterPayment = useFlutterwave({
    public_key: "FLWPUBK_TEST-d99e582b1f593f250ea49b53385f5cce-X",
    tx_ref: generateTxRef(),
    amount: total,
    currency: currency,
    payment_options: "card,mobilemoney,ussd,banktransfer,opay,account,",
    customer: {
      email: sessionStorage.getItem("email"),
      phone_number: "09064000000",
      name: sessionStorage.getItem("username"),
    },
    customizations: {
      title: "Service Purchase Payment",
      description: "Service Purchase Payment",
      logo: sessionStorage.getItem("ecoLogo"),
    },
  });

  // const verifyFlutterwave = async (tx_ref) => {
  //   sessionStorage.removeItem("totalAmount");
  //   try {
  //     const response = await axios.post(
  //       `https://unleashified-backend.azurewebsites.net/api/v1/provider-payment`,
  //       {
  //         reference: tx_ref,
  //         jobId: serviceId,
  //         email: sessionStorage.getItem("email"),
  //         type: "Service",
  //         userId: sessionStorage.getItem("UserId"),
  //         currency: currency,
  //         provider: "flutterwave",
  //       }
  //     );
  //     if (response.data.status === "success") {
  //       // Sending the form data to the DB
  //       const formData = {
  //         userId: sessionStorage.getItem("UserId"),
  //         serviceType: dataToPass.plan,
  //         serviceId: dataToPass.service._id,
  //         description: dataToPass.service.description,
  //         requestedPackageId: dataToPass.service.pricing._id,
  //         extraFastDelivery: "true",
  //         additionalRevision: "false",
  //         copyrights: "true",
  //         fullName: billingInfo.username,
  //         companyName: billingInfo.companyName,
  //         country: billingInfo.country,
  //         stateRegion: billingInfo.state,
  //         address: billingInfo.address,
  //         totalPrice: dataToPass?.totalPrice,
  //       };

  //       console.log("sent to", formData);

  //       await axios.post(
  //         "https://unleashified-backend.azurewebsites.net/api/v1/request-service",
  //         formData
  //       );

  //       setLoading(false);
  //       showToast(response.data.message);
  //       navigate(`/service/order-summary/${id}`, {
  //         state: { dataToPass, billingInfoData },
  //       });
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     showToast(error.response.data.message);
  //   }
  // };

  // Function to format price with currency symbol

  const verifyFlutterwave = async (tx_ref) => {
    setLoading(true);
    try {
      const response = await authFetch.post(
        `https://unleashified-backend.azurewebsites.net/api/v1/provider-payment`,
        {
          reference: tx_ref,
          jobId: serviceId,
          email: sessionStorage.getItem("email"),
          type: "Service",
          userId: sessionStorage.getItem("UserId"),
          currency: currency,
          provider: "flutterwave",
        }
      );
      sendForm(response.data.message);
      // return response;
    } catch (error) {
      setLoading(false);
      console.error("Error:", error.response?.data || error.message);
      showToast(error.response?.data?.message || "An error occurred");
    }
  };

  const sendForm = async (response) => {
    if (response === "Payment Successfull") {
      const extraFDValue = dataToPass.extraFastDelivery ? "true" : "false";
      const additionalRValue = dataToPass.additionalRevision ? "true" : "false";
      const copyrightsValue = dataToPass.copyrights ? "true" : "false";

      const formData = {
        userId: sessionStorage.getItem("UserId"),
        serviceType: dataToPass.plan,
        serviceId: dataToPass.service._id,
        description: dataToPass.service.description,
        requestedPackageId: dataToPass.planId,
        extraFastDelivery: extraFDValue,
        additionalRevision: additionalRValue,
        copyrights: copyrightsValue,
        fullName: billingInfo.username,
        companyName: billingInfo.companyName,
        country: billingInfo.country,
        stateRegion: billingInfo.state,
        address: billingInfo.address,
        totalPrice: total,
        currency: currency,
        gigQuantity: dataToPass.gigQuantity,
      };

      console.log("Sending form data to DB:", formData);

      const dbResponse = await authFetch.post(
        "https://marketplacebackendas-test.azurewebsites.net/api/v1/request-service",
        formData
      );

      console.log("DB response:", dbResponse.data);

      setLoading(false);
      // showToast(response.data.message);

      navigate(`/service/order-summary/${id}`, {
        state: { dataToPass, billingInfoData, total },
      });
    }
  };

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

  return (
    <Container className="mt-5 mb-4">
      {/* Progress Bar */}
      <Row className="mb-4">
        <Col className="d-flex justify-content-center align-center">
          <FaCheckCircle className="me-1 display-6" />
          <span className="fw-bolder me-3">Order Details</span>
          <MdOutlineNavigateNext className="me-2 display-6" />
          <PiNumberCircleTwoFill className="me-1 display-6" />
          <span className="fw-bolder me-3">Confirm & Pay</span>
          <MdOutlineNavigateNext className="me-2 display-6" />
          <PiNumberCircleThreeFill className="me-1 display-6" />
          <span className="text-muted me-3">Order Summary</span>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title className="display-6">Billing Information</Card.Title>
              <div>
                <Row>
                  <Col lg={9}>
                    <div>
                      <strong>
                        <h4>
                          Your invoice will be issued according to the details
                          listed here
                        </h4>
                      </strong>
                    </div>
                    <div>
                      <strong>{billingInfo.username}</strong> -{" "}
                      {billingInfo.companyName}
                    </div>
                    <div>
                      {billingInfo.state} {billingInfo.address}{" "}
                      {billingInfo.country}
                    </div>
                  </Col>
                  <Col>
                    <Button className="mt-2" onClick={handleAddDetails}>
                      Edit details
                    </Button>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Body>
              <Card.Title className="display-6">Description</Card.Title>
              <Card.Title>
                <Row>
                  <Col lg={5}>
                    <Card.Img
                      src={dataToPass?.service?.backgroundCover[0] || null}
                    />
                  </Col>
                  <Col lg={7}>
                    {dataToPass?.service?.header} <br />{" "}
                    <span>&apos;&apos;{displayDescription}&apos;&apos;</span>
                  </Col>
                </Row>
              </Card.Title>
              <Card.Text>
                {dataToPass?.service?.pricing?.type} Package
              </Card.Text>
              <ul>
                <li>{dataToPass?.incentives}</li>
              </ul>
              <div>Gig Quantity : {dataToPass?.gigQuantity}</div>
              <div>
                {dataToPass?.extraFastDelivery
                  ? `Extra Fast-Delivery: ${formatPrice(
                      currency,
                      dataToPass?.extraFastDelivery
                    )}`
                  : ""}
              </div>
              <div>
                {dataToPass?.additionalRevision
                  ? `Additional Revision: ${formatPrice(
                      currency,
                      dataToPass?.additionalRevision
                    )}`
                  : ""}
              </div>
              <div>
                {dataToPass?.copyrights
                  ? `Copyrights : ${formatPrice(
                      currency,
                      dataToPass?.copyrights
                    )}`
                  : ""}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-4 display-6">
                Pricing Information
              </Card.Title>

              <div className="mt-3">
                <div>
                  Package Price:{" "}
                  {formatPrice(
                    dataToPass?.service.pricing.currency,
                    dataToPass?.totalPrice
                  )}
                </div>
                <div>
                  VAT:{" "}
                  {formatPrice(
                    dataToPass?.service.pricing.currency,
                    vat.toFixed(2)
                  )}
                </div>
                <hr />
                <div>
                  Total:{" "}
                  {formatPrice(
                    dataToPass?.service.pricing.currency,
                    total.toFixed(2)
                  )}
                </div>
              </div>
              <Row>
                {/* {paymentOption !== "flutterwave" && (
                  <Button
                    variant="primary"
                    onClick={() => setPaymentOption("flutterwave")}
                  >
                    Pay Now
                  </Button>
                )} */}

                <Form>
                  {/* <Form.Check
                    type="radio"
                    label="Pay Now"
                    name="paymentOption"
                    value="flutterwave"
                    //   checked={paymentOption === "flutterwave"}
                    onChange={handlePaymentChange}
                  /> */}
                  {/* <Form.Check
                    type="checkbox"
                    label="Remember for future payments"
                    checked={rememberPayment}
                    onChange={handleRememberPaymentChange}
                  /> */}
                </Form>
                {/* {paymentOption && ( */}
                <Row>
                  {/* <Button className="me-2 mb-2 mt-2">
                    <img src={flutterwave} alt="paystack" width="150" />
                  </Button> */}
                  <div className="d-grid" style={{ height: "50px" }}>
                    {notLogin ? (
                      <Button variant="primary" onClick={handleLoginNavigate}>
                        Login
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() =>
                          handleFlutterPayment({
                            callback: async (response) => {
                              // const verificationResponse =
                              await verifyFlutterwave(response.transaction_id);

                              // if (
                              //   verificationResponse?.data.status === "success"
                              // ) {
                              //   sendForm();
                              //   // sendForm(verificationResponse);
                              // }

                              closePaymentModal(); // Close the modal programmatically
                            },
                          })
                        }
                      >
                        <img src={flutterwave} alt="paystack" width="150" />
                      </Button>
                    )}
                  </div>
                  {/* <Button className="me-2 mb-2 mt-2">
                      <img src={paystack} alt="paystack" width="150" />
                    </Button> */}
                </Row>
                {/* )} */}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for Additional Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Additional Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={additionalInfo.fullName}
                onChange={handleModalChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Company Name <span className="text-muted">(optional)</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                value={additionalInfo.companyName}
                onChange={handleModalChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="rounded">Country</Form.Label>
              <br />
              <CountryDropdown
                value={additionalInfo.country}
                onChange={handleCountryChange}
                className="p-2 rounded w-full"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>State/Region</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={additionalInfo.state}
                onChange={handleModalChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Address <span className="text-muted">(optional)</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={additionalInfo.address}
                onChange={handleModalChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSaveDetails}>
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ServiceBilling;
