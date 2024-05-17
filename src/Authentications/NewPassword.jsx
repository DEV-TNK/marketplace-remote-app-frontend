import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row, Card, Form, Button, Image, Alert } from "react-bootstrap";
import Logo from "../assets/unleashified-logo.png";
import Logo2 from "../assets/LogoList/cote-logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { showToast } from "../Components/Showtoast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const formSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/,
      "Password must be at least 8 characters and must contain at least a capital letter, a number, and a special character (!@#$%^&*)"
    ),
  cpassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cpasswordVisible, setCPasswordVisible] = useState(false);
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };
  const toggleCPasswordVisibility = () => {
    setCPasswordVisible((prevVisible) => !prevVisible);
  };

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    console.log("this can submit");
    try {
      const response = await axios.post(
        `https://unleashified-backend.azurewebsites.net/api/v1/reset-password`,
        {
          email: queryParam.get("email"),
          resetToken: queryParam.get("token"),
          newPassword: data.password,
        }
      );
      setLoading(false);
      navigate("/authentication/signin");
      showToast(response.data.message);
    } catch (error) {
      setLoading(false);
      showToast(error.response.data.message);
    }
  };

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col lg={5} md={5} className="py-8 py-xl-0">
        <Card className="shadow-sm">
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
              <h1 className="mb-1 fw-bold">New Password</h1>
              <span className="text-center">
                Fill the form to reset your password.
              </span>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col lg={12} md={12} className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Password"
                      {...register("password", { required: true })}
                    />
                    <div
                      className="position-absolute end-20 top-50 translate-middle-y"
                      style={{ right: "10px", cursor: "pointer" }}
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                  <small className="text-danger">
                    {errors.password?.message}
                  </small>
                </Col>
                <Col lg={12} md={12} className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={cpasswordVisible ? "text" : "password"}
                      placeholder="Confirm Password"
                      {...register("cpassword", { required: true })}
                    />
                    <div
                      className="position-absolute end-20 top-50 translate-middle-y"
                      style={{ right: "10px", cursor: "pointer" }}
                      onClick={toggleCPasswordVisibility}
                    >
                      {cpasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                  <small className="text-danger">
                    {errors.cpassword?.message}
                  </small>
                </Col>
              </Row>
              <Row>
                <Col lg={12} md={12} className="mb-0 d-grid gap-2">
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
                      Reset Password
                    </Button>
                  )}
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ForgetPassword;
