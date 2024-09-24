// import node module libraries
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card, Form, Button, Image } from "react-bootstrap";
import Logo2 from "../assets/unleashified-logo.png";
import Logo from "../assets/LogoList/cote-logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { showToast } from "../Components/Showtoast";

const formSchema = yup.object().shape({
  email: yup
    .string()
    .required("email can't be empty")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email address"
    ),
  role: yup.string().required("Please select a role"),
});

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const submit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://marketplacebackendas-test.azurewebsites.net/api/v1/forgot-password",
        {
          email: data.email,
          userType: data.role,
        }
      );
      setLoading(false);
      showToast(response.data.message);
    } catch (error) {
      setLoading(false);
      showToast(error.response.data.message);
    }
  };
  return (
    <Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={5} md={5} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-4 d-flex flex-column align-items-center justify-content-center">
                <Link to="/">
                  <Image
                    src={Logo}
                    className="mb-4"
                    alt=""
                    style={{ height: "100px", width: "120px" }}
                  />
                </Link>
                <h1 className="mb-1 fw-bold">Forgot Password</h1>
                <span className="text-center">
                  Fill the form to reset your password.
                </span>
              </div>

              {/* Form */}
              <Form onSubmit={handleSubmit(submit)}>
                <Row>
                  <Col lg={12} md={12} className="mb-3">
                    {/*  email */}
                    <Form.Label>Email</Form.Label>
                    {/* <Form.Control
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      required
                    /> */}
                    <Form.Control
                      type="email"
                      id="email"
                      placeholder="Email address here"
                      {...register("email", { required: true })}
                    />
                    <small
                      className="text-danger"
                      style={{
                        visibility: errors.email ? "visible" : "hidden",
                      }}
                    >
                      {errors.email?.message}
                    </small>
                  </Col>

                  {/* role selection */}
                  <Col lg={12} md={12} className="mb-3">
                    <Form.Label>Select Role</Form.Label>
                    <Form.Select {...register("role", { required: true })}>
                      <option value="">Select your role</option>
                      <option value="seeker">Job Seeker</option>
                      <option value="provider">Job Provider</option>
                      <option value="service provider">
                        Service Seeker/Provider
                      </option>
                    </Form.Select>
                    <small
                      className="text-danger"
                      style={{
                        visibility: errors.role ? "visible" : "hidden",
                      }}
                    >
                      {errors.role?.message}
                    </small>
                  </Col>

                  <Col lg={12} md={12} className="mb-3 d-grid gap-2">
                    {/* Button */}
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
                        Send Reset Link
                      </Button>
                    )}
                    {/* <Button variant="primary" type="submit">
                      Send Reset Link
                    </Button> */}
                  </Col>
                </Row>
                <span>
                  Return to <Link to="/authentication/signin">Sign in</Link>
                </span>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ForgetPassword;
