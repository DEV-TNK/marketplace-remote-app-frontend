import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card, Form, Button, Image } from "react-bootstrap";
import Logo from "../assets/unleashified-logo.png";
import Logo2 from "../assets/LogoList/cote-logo.png";
import "./signupforms/signup.css";
import { useGlobalContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import NavbarDefault from "../Pages/home-academy/navbars/NavbarDefault";

const formSchema = yup.object().shape({
  email: yup
    .string()
    .required("email can't be empty")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email address"
    ),
  password: yup.string().required("Password is required"),
  // .matches(
  //   /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/,
  //   "invalid Password"
  // ),
});

const SignIn = () => {
  const { loading, Login } = useGlobalContext();
  const [passwordVisibile, passwordNotVisible] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

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
  return (
    <Fragment>
      {/* <NavbarDefault /> */}

      <Row
        className="align-items-center h-100 w-100 justify-content-center g-8"
        style={{ marginLeft: "0px", marginRight: "0px" }}
      >
        {/* Left Section */}
        <Col
          lg={12}
          md={12}
          className="d-flex"
          style={{ paddingLeft: "0rem", paddingRight: "0rem" }}
        >
          <Col lg={5} md={5} className="fixed-left">
            <Card className="h-100 bg-primary">
              {/* Content for the left section goes here */}
            </Card>
          </Col>
          {/* Right Section */}
          <Col lg={7} md={7} className="overflow-y-auto">
            <Card className="h-100">
              <Card.Body className="py-6 px-3 ">
                <div className="mb-4">
                  <Link to="/" smooth="true" duration={500}>
                    <Image
                      src={Logo}
                      className="mb-4"
                      alt=""
                      style={{ height: "100px", width: "160px" }}
                    />
                  </Link>
                  <h1 className="mb-1 fw-bold">Sign in</h1>
                  <span>
                    Don’t have an account?
                    <Link to="/authentication/signup" className="ms-1">
                      Sign up
                    </Link>
                  </span>
                </div>
                {/* Form */}
                <Form onSubmit={handleSubmit(Login)}>
                  <Row>
                    <Col lg={12} md={12} className="mb-3">
                      {/* Username or email */}
                      <Form.Label>Email</Form.Label>
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
                    <Col lg={12} md={12} className="mb-3">
                      {/* Password */}
                      <Form.Label>Password</Form.Label>
                      <div className="position-relative">
                        <Form.Control
                          type={passwordVisible ? "text" : "password"}
                          id="password"
                          placeholder="**************"
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
                      <small
                        className="text-danger"
                        style={{
                          visibility: errors.password ? "visible" : "hidden",
                        }}
                      >
                        {errors.password?.message}
                      </small>
                    </Col>
                    <Link
                      to="/authentication/Forget-password"
                      className="ms-1 text-bold"
                    >
                      Forgot Password
                    </Link>

                    <Col lg={12} md={12} className="mb-0 d-grid gap-2 mt-6">
                      {/* Button */}
                      {/* <Button variant="primary" type="submit">
                        Sign in
                      </Button> */}
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
                          Sign in
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Form>
                {/* <hr className="my-4" />
                <div className="mt-4 text-center">
                  <Link
                    to="#"
                    className="btn-social btn-social-outline btn-facebook"
                  >
                    <i className="fab fa-facebook"></i>
                  </Link>
                  <Link
                    to="#"
                    className="btn-social btn-social-outline btn-twitter"
                  >
                    <i className="fab fa-twitter"></i>
                  </Link>
                  <Link
                    to="#"
                    className="btn-social btn-social-outline btn-linkedin"
                  >
                    <i className="fab fa-linkedin"></i>
                  </Link>
                  <Link
                    to="#"
                    className="btn-social btn-social-outline btn-github"
                  >
                    <i className="fab fa-github"></i>
                  </Link>
                </div> */}
              </Card.Body>
            </Card>
          </Col>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SignIn;
