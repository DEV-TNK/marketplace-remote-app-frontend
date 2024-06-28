// import node module libraries
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Image,
} from "react-bootstrap";
import axios from "axios";

// import custom components
import StatRightBadge from "../Components/marketing/common/stats/StatRightBadge";
import ApexCharts from "../Components/elements/charts/ApexCharts";

// import data files

import {
  EarningsChartSeries,
  EarningsChartOptions,
  OrderColumnChartSeries,
  OrderColumnChartOptions,
} from "../data/charts/ChartData";

// import profile layout wrapper
import ProviderProfileLayout from "./ProviderProfileLayout";

const Dashboard = () => {
  const [amount, setAmount] = useState(null);
  const [top4Payment, setTop4Payment] = useState([]);
  const [completedJobs, setCompletedJobs] = useState(null);
  const [pendingJobs, setPendingJobs] = useState(null);
  const [monthLyJobs, setMonthLyJobs] = useState(null);
  const [ongoingJobs, setOngoingJobs] = useState(null);
  const [totalJobs, setTotalJobs] = useState(null);
  const [newAmount, setNewAmount] = useState(null);
  const [data, setData] = useState([]);

  const [earnings, setEarnings] = useState({
      CFA: 0,
    // USD: 0,
    // EUR: 0,
    // GBP: 0,
  });

  const [selectedCurrency, setSelectedCurrency] = useState("F CFA");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("UserId");

    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // for users fromfgn alat
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
            setUserId(response.data.data.UserId);
          }
        } catch (error) {
          console.log("this is error");
        }
      };
      getUser();
    }
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const userId = sessionStorage.getItem("UserId");
        const response = await axios.get(
          `https://unleashified-backend.azurewebsites.net/api/v1/get-provider-dashboardJobs/${userId}`
        );

        setEarnings(response.data.totalAmountSpent);
        setCompletedJobs(response.data.completedJobs);
        setPendingJobs(response.data.pendingJobs);
        setMonthLyJobs(response.data.monthLyJobs);
        setOngoingJobs(response.data.ongoingJobs);
        setTotalJobs(response.data.totalJobPosting);
        const formattedAmount = response.data.totalAmountSpent.toLocaleString(
          "en-NG",
          {
            style: "currency",
            currency: "F CFA",
          }
        );
        setNewAmount(formattedAmount);
        console.log(formattedAmount); // Output: "₦7,010,000.00"
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const userId = sessionStorage.getItem("UserId");
        const response = await axios.get(
          `https://unleashified-backend.azurewebsites.net/api/v1/jobs-created-by-provider/${userId}`
        );
        const result = response.data;
        const monthlyData = result.map((item) => item.data);

        // Create the final structure with the 'data' property
        const formattedData = [{ data: monthlyData }];
        console.log("this is monthly data", monthlyData);
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const userId = sessionStorage.getItem("UserId");
        const response = await axios.get(
          `https://unleashified-backend.azurewebsites.net/api/v1/get-provider-dashboardPaidJobs/${userId}`
        );
        setTop4Payment(response.data.jobs);
      } catch (error) {
        console.log("internal error");
      }
    };
    fetchdata();
  }, [userId]);

  const formatPrice = (currencyName, priceValue) => {
    switch (currencyName) {
      case "CFA franc":
      case "F CFA":
        return `F CFA${priceValue}`;
      // case "dollars":
      // case "USD":
      //   return `$${priceValue}`;
      // case "euros":
      // case "EUR":
      //   return `€${priceValue}`;
      // case "pounds":
      // case "GBP":
      //   return `£${priceValue}`;
      default:
        return `F CFA${priceValue}`;
    }
  };
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
          <Dropdown.Menu align="end">
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

  return (
    <ProviderProfileLayout>
      {/* Page Content section */}
      <Row>
        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
          <Link to="/JobSeekerdashboard/seeker-payouts">
            <StatRightBadge
              title={`Money Spent (${selectedCurrency})`}
              value={earnings[selectedCurrency] || 0.0}
              colorVariant="success"
              badgeValue={selectedCurrency}
              subtitle="Currency"
            />
          </Link>
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret>{selectedCurrency}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => handleCurrencyChange("F CFA")}>
                F CFA
              </DropdownItem>
              {/* <DropdownItem onClick={() => handleCurrencyChange("USD")}>
                USD
              </DropdownItem>
              <DropdownItem onClick={() => handleCurrencyChange("EUR")}>
                EUR
              </DropdownItem>
              <DropdownItem onClick={() => handleCurrencyChange("GBP")}>
                GBP
              </DropdownItem> */}
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
          <Link to="/Providerdashboard/All-Job">
            <StatRightBadge
              title="Total Job Created"
              subtitle="New this month"
              value={totalJobs || 0}
              badgeValue={monthLyJobs || 0}
              colorVariant="info"
            />
          </Link>
        </Col>
        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
          <Link to="/Providerdashboard/All-Job">
            <StatRightBadge
              title="Total Completed"
              subtitle="Pending"
              value={completedJobs || 0}
              badgeValue={pendingJobs || 0}
              colorVariant="warning"
            />
          </Link>
        </Col>
      </Row>
      {/* <!-- Card --> */}
      {/* <Card className="my-4">
        <Card.Header>
          <h3 className="h4 mb-0">Earnings</h3>
        </Card.Header>
        <Card.Body>
          <ApexCharts
            options={EarningsChartOptions}
            series={EarningsChartSeries}
            height={350}
            type="line"
          />
        </Card.Body>
      </Card> */}
      {/* <!-- Card --> */}
      <Card className="my-4">
        <Card.Header>
          <h3 className="h4 mb-0">Jobs Created</h3>
        </Card.Header>
        <Card.Body>
          <ApexCharts
            options={OrderColumnChartOptions}
            // series={OrderColumnChartSeries}
            series={data}
            height={287}
            type="bar"
          />
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header>
          <h3 className="mb-0 h4">Last Four Paid Jobs</h3>
        </Card.Header>
        <Card.Body className="p-0 ">
          <Table hover responsive className="mb-0 text-nowrap table-centered">
            <thead className="table-light">
              <tr>
                <th scope="col" className="border-0">
                  JOB TITLE
                </th>
                <th scope="col" className="border-0">
                  AMOUNT
                </th>
                <th scope="col" className="border-0">
                  Person's
                </th>
                <th scope="col" className="border-0">
                  Type
                </th>
                <th scope="col" className="border-0">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {top4Payment.map((job, index) => (
                <tr key={index}>
                  <td className="align-middle border-top-0">
                    {job && job.jobTitles.length > 0 ? (
                      job.jobTitles.map((job) => (
                        <ul key={job}>
                          <li>{job}</li>
                        </ul>
                      ))
                    ) : (
                      <p>No Title found</p>
                    )}
                  </td>
                  <td className="align-middle border-top-0">
                    {formatPrice(job.currency, job.jobSalary)}
                  </td>
                  <td className="align-middle border-top-0">{job.number}</td>
                  <td className="align-middle border-top-0">{job.type}</td>
                  <td className="align-middle border-top-0">{job.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      {/* end of Page Content section*/}
    </ProviderProfileLayout>
  );
};
export default Dashboard;
