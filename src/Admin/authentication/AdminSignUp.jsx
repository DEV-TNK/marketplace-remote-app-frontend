// import node module libraries
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card, Form, Button, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as yup from "yup";
import axios from "axios";
import { showToast } from "../../Components/Showtoast";

// import media files
import Logo from "../../assets/remsana-logo.png";

const formSchema = yup.object().shape({
  fullName: yup.string().required(" name can't be empty"),
  email: yup
    .string()
    .required("email can't be empty")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email address"
    ),
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

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://remsana-backend-testing.azurewebsites.net/api/v1/register",
        {
          email: data.email,
          userType: "admin",
          password: data.password,
          username: data.fullName,
        }
      );
      setLoading(false);
      if (response.status === 201) {
        console.log(response.data.message);
        showToast(response.data.message);
        navigate(`/authentication/verify-email?email=${data.email}`);
      }
    } catch (error) {
      setLoading(false);
      console.log("this is not good");
      showToast(error.response.data.message);
    }
  };
  return (
    <Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={5} md={5} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-4">
                <Link to="/">
                  <Image src={Logo} className="mb-4" alt="" />
                </Link>
                <h1 className="mb-1 fw-bold">Sign up</h1>
                <span>
                  Already have an account?{" "}
                  <Link to="/admin/signin" className="ms-1">
                    Sign in
                  </Link>
                </span>
              </div>
              {/* Form */}
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col lg={12} md={12} className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      {...register("fullName")}
                    />
                    <small className="text-danger">
                      {errors.fullName && errors.fullName.message}
                    </small>
                  </Col>
                  <Col lg={12} md={12} className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      {...register("email")}
                    />
                    <small className="text-danger">
                      {errors.email && errors.email.message}
                    </small>
                  </Col>
                  <Col lg={12} md={12} className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Password"
                        {...register("password")}
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
                      {errors.password && errors.password.message}
                    </small>
                  </Col>
                  <Col lg={12} md={12} className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Confirm Password"
                        {...register("cpassword")}
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
                      {errors.cpassword && errors.cpassword.message}
                    </small>
                  </Col>
                  <Col lg={12} md={12} className="mb-0 d-grid gap-2">
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
                        Sign Up as Admin
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form>
              {error && <div className="text-danger mt-2">{error}</div>}
              <hr className="my-4" />
              <div className="mt-4 text-center">
                {/* Commenting out social media icons and links */}
                {/*
                                <Link
                                    to="#"
                                    className="btn-social btn-social-outline btn-facebook"
                                >
                                    <i className="fab fa-facebook"></i>
                                </Link>{' '}
                                <Link
                                    to="#"
                                    className="btn-social btn-social-outline btn-twitter"
                                >
                                    <i className="fab fa-twitter"></i>
                                </Link>{' '}
                                <Link
                                    to="#"
                                    className="btn-social btn-social-outline btn-linkedin"
                                >
                                    <i className="fab fa-linkedin"></i>
                                </Link>{' '}
                                <Link
                                    to="#"
                                    className="btn-social btn-social-outline btn-github"
                                >
                                    <i className="fab fa-github"></i>
                                </Link>
                                */}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SignUp;
