import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card, Form, Button, Image } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { showToast } from "../../Components/Showtoast";

// import media files
import Logo from "../../assets/images/brand/logo/logo-icon.svg";

const formSchema = yup.object().shape({
  email: yup
    .string()
    .required("email can't be empty")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email address"
    ),
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
        "https://unleashified-backend.azurewebsites.net/api/v1/forgot-password",
        {
          email: data.email,
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
              <div className="mb-4">
                <Link to="/">
                  <Image src={Logo} className="mb-4" alt="" />
                </Link>
                <h1 className="mb-1 fw-bold">Forgot Password</h1>
                <span>Fill the form to reset your password.</span>
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
                  </Col>
                </Row>
                <span>
                  Return to <Link to="/admin/signin">Sign in</Link>
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
