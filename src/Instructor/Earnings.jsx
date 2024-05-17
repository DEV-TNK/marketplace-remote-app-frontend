// import node module libraries
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card, Dropdown, Table, Image, Badge } from "react-bootstrap";

// import custom components
import ApexCharts from "../Components/elements/charts/ApexCharts";
import StatTopIcon from "../Components/marketing/common/stats/StatTopIcon";

// import profile layout wrapper
import InstructorProfileLayout from "./JobSeekerProfileLayout";

// import data files
// import BestSellingCoursesData from "../data/marketing/BestSellingCoursesData";
import {
  TotalEarningChartSeries,
  TotalEarningChartOptions,
  EarningsChartSeries,
  EarningsChartOptions,
} from "../data/charts/ChartData";
import EarningData from "./account-settings/EarningData";

const Earnings = () => {
  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const [top4Courses, setTop4Courses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const [totalStudents, settotalStudents] = useState(null);
  const [NumberOfCourse, setNumberOfCourse] = useState(null);

  // useEffect(() => {
  //   // Fetch top 4 courses from backend
  //   const fetchData = async () => {
  //     try {
  //       const userId = sessionStorage.getItem("UserId");
  //       const response = await fetch(
  //         `https://remsana-backend-testing.azurewebsites.net/api/v1/instructorDashboard/${userId}`
  //       );
  //       const data = await response.json();
  //       settotalAmount(data.totalAmount);
  //       settotalStudents(data.totalStudents);
  //       setNumberOfCourse(data.NumberOfCourse);
  //       setTop4Courses(data.top4Courses);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="btn-icon btn btn-ghost btn-sm rounded-circle"
    >
      {children}
    </Link>
  ));

  const ActionMenu = () => {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
            <i className="fe fe-more-vertical text-muted"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu align={"end"}>
            <Dropdown.Header>SETTINGS</Dropdown.Header>
            <Dropdown.Item eventKey="1">
              <i className="fe fe-edit dropdown-item-icon"></i> Edit
            </Dropdown.Item>
            <Dropdown.Item eventKey="2">
              <i className="fe fe-trash dropdown-item-icon"></i> Remove
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  const ChartActionMenu = () => {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
            <i className="fe fe-more-vertical text-muted"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Header>SETTINGS</Dropdown.Header>
            <Dropdown.Item eventKey="1">30 Days</Dropdown.Item>
            <Dropdown.Item eventKey="2">2 Months</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  return (
    <InstructorProfileLayout>
       <EarningData setTotalAmount={setTotalAmount} />  
      <Card className="mb-4 pb-1">
        <Card.Header className="border-0 ">
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Earnings</h3>
            <p className="mb-0">
              You have full control to manage your own account setting.
            </p>
          </div>
        </Card.Header>
      </Card>
      <Row>
        <Col xl={12} lg={12} md={12} className="mb-4">
          <Card>
            <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0">Earnings</h4>
              </div>
              <div>
                <ChartActionMenu />
              </div>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xl={3} lg={4} md={12} sm={12} className="mb-3 mb-lg-0">
                  <div>
                    <StatTopIcon
                      title="Your total earnings"
                      value={
                        (totalAmount / 100)
                          .toLocaleString("en-NG", {
                            style: "currency",
                            currency: "NGN",
                          })
                          .slice(0, -3) +
                        "." +
                        (totalAmount % 100).toString().padStart(2, "0")
                      }
                      iconName="shopping-cart"
                      colorVariant="success"
                      progress={0}
                      flat
                    />
                    <Row>
                      {/* <!-- Total earning chart --> */}
                      <Col className="col ps-0">
                        <ApexCharts
                          options={TotalEarningChartOptions}
                          series={TotalEarningChartSeries}
                          width={130}
                        />
                      </Col>
                      <Col xs="auto">
                        <Badge bg="success">
                          <i className="fe fe-trending-up fs-6 me-2"></i>32%
                        </Badge>
                      </Col>
                    </Row>
                    <p className="mb-0 lh-1.5">
                      Update your payout method in settings.
                    </p>
                  </div>
                </Col>
                {/* Earning chart */}
                <Col xl={9} lg={8} md={12} sm={12}>
                  <ApexCharts
                    options={EarningsChartOptions}
                    series={EarningsChartSeries}
                    height={350}
                    type="line"
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
          <StatTopIcon
            title="Earning this month"
            value={
              (totalAmount / 100)
                .toLocaleString("en-NG", { style: "currency", currency: "NGN" })
                .slice(0, -3) +
              "." +
              (totalAmount % 100).toString().padStart(2, "0")
            }
            iconName="folder"
            colorVariant="primary"
            progress={65}
          />
        </Col>
        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
          <StatTopIcon
            title="Account Balance"
            value={
              (totalAmount / 100)
                .toLocaleString("en-NG", { style: "currency", currency: "NGN" })
                .slice(0, -3) +
              "." +
              (totalAmount % 100).toString().padStart(2, "0")
            }
            iconName="shopping-bag"
            colorVariant="danger"
            progress={65}
          />
        </Col>
        <Col lg={4} md={12} sm={12}>
          <StatTopIcon
            title="Life Time Sales"
            value={
              (totalAmount / 100)
                .toLocaleString("en-NG", { style: "currency", currency: "NGN" })
                .slice(0, -3) +
              "." +
              (totalAmount % 100).toString().padStart(2, "0")
            }
            iconName="send"
            colorVariant="warning"
            progress={65}
          />
        </Col>
      </Row>
      <Card className="mt-4">
        <Card.Header>
          <h3 className="mb-0 h4">Lastest Approved Job</h3>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0 text-nowrap table-centered">
            <thead className="table-light">
              <tr>
                <th scope="col">Job Descriptions</th>
                <th scope="col">type</th>
                <th scope="col">Amount</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {top4Courses.map((course, index) => (
                <tr key={index}>
                  <td className="align-middle border-top-0">
                    <Link to="#">
                      <div className="d-lg-flex align-items-center">
                        <Image
                          src={course.image}
                          alt=""
                          className="rounded img-4by3-lg"
                        />
                        <h5 className="mb-0 ms-lg-3 mt-lg-0 mt-2 text-primary-hover">
                          {course.name}
                        </h5>
                      </div>
                    </Link>
                  </td>
                  <td className="align-middle border-top-0">
                    {course.totalNumberOfSales}
                  </td>
                  <td className="align-middle border-top-0">
                    {(course.totalAmount / 100)
                      .toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      })
                      .slice(0, -3) +
                      "." +
                      (course.totalAmount % 100).toString().padStart(2, "0")}
                  </td>
                  <td className="align-middle border-top-0">
                    <ActionMenu />
                  </td>
                </tr>
              ))}
              {/* {BestSellingCoursesData.map((item, index) => {
                return (
                  <tr key={item.id + index}>
                    <td>
                      <Link to="#">
                        <div className="d-lg-flex align-items-center">
                          <Image
                            src={item.image}
                            alt=""
                            className="rounded img-4by3-lg"
                          />
                          <h5 className="mb-0 ms-lg-3 mt-lg-0 mt-2 text-primary-hover">
                            {item.title}
                          </h5>
                        </div>
                      </Link>
                    </td>
                    <td>{item.sales}</td>
                    <td>${item.amount} </td>
                    <td>
                      <ActionMenu />
                    </td>
                  </tr>
                );
              })} */}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </InstructorProfileLayout>
  );
};

export default Earnings;
