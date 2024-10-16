// import node module libraries
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

// import custom components
import StatRightBadge from "../Components/marketing/common/stats/StatRightBadge";
import ApexCharts from "../Components/elements/charts/ApexCharts";

import "./dashboard.css";
import axios from "axios";
import { useGlobalContext } from "../context/AuthContext";

// import data files
import {
  EarningsChartSeries,
  EarningsChartOptions,
  OrderColumnChartSeries,
  OrderColumnChartOptions,
} from "../data/charts/ChartData";

// import profile layout wrapper
import InstructorProfileLayout from "./JobSeekerProfileLayout";
import AxiosInterceptor from "../Components/AxiosInterceptor";

const Dashboard = () => {
  const authFetch = AxiosInterceptor()
  const [lastApprovedJobs, setLastApprovedJobs] = useState([]);
  const [totalAmount, settotalAmount] = useState(null);
  const [totalJobsApplied, setTotalJobsApplied] = useState(null);
  const [totalJobs, setTotalJobs] = useState(null);
  const [pendingJobs, setPendingJobs] = useState(null);
  const [newJobsApplied, setNewJobsApplied] = useState(null);
  const [data, setData] = useState([]);

  const [earnings, setEarnings] = useState({
    CFA: 0,
    // USD: 0,
    // EUR: 0,
    // GBP: 0,
  });

  const [selectedCurrency, setSelectedCurrency] = useState("F CFA");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userId = sessionStorage.getItem("UserId");
      try {
        const response = await authFetch.get(
          `https://marketplacebackendas-test.azurewebsites.net/api/v1/get-my-earning/${userId}`
        );

        if (response.data.userEarning) {
          setEarnings(response.data.userEarning);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = sessionStorage.getItem("UserId");
        const response = await authFetch.get(
          `https://marketplacebackendas-test.azurewebsites.net/api/v1/seeker-monthly-applications/${userId}`
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
  }, []);

  useEffect(() => {
    // Fetch top 4 courses from backend
    const fetchData = async () => {
      try {
        const userId = sessionStorage.getItem("UserId");
        const response = await authFetch.get(
          `https://marketplacebackendas-test.azurewebsites.net/api/v1/dashboard/${userId}`
        );
        const data = await response.json();
        settotalAmount(data.totalAmount);

        setTotalJobsApplied(data.totalJobsApplied);
        setTotalJobs(data.totalJobs);
        setPendingJobs(data.pendingJobs);
        setNewJobsApplied(data.newJobsApplied);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = sessionStorage.getItem("UserId");
        const response = await authFetch.get(
          `https://marketplacebackendas-test.azurewebsites.net/api/v1/last-approved-jobs/${userId}`
        );
        const data = await response.json();
        setLastApprovedJobs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const { userId } = useGlobalContext();

  const [amountEarned, setAmountEarned] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authFetch.get(
          `https://marketplacebackendas-test.azurewebsites.net/api/v1/get-my-earning/${userId}`
        );

        if (response.data.userEarning) {
          let totalAmount;

          if (typeof response.data.userEarning === "string") {
            // If userEarning is a string, check if it's "0" and set totalAmount accordingly
            totalAmount =
              response.data.userEarning === "0"
                ? "0.0"
                : response.data.userEarning;
          } else {
            // If userEarning is an object, get the totalAmount directly
            totalAmount = response.data.userEarning.totalAmount;
          }
          setAmountEarned(totalAmount);
          // Pass the total amount to the parent component
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]); // Make sure to include userId as a dependency if it's used inside the useEffect
  const formatPrice = (currencyName, priceValue) => {
    switch (currencyName) {
      case "CFA franc":
      case "F CFA":
        return `F CFA${priceValue}`;
      case "dollars":
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

  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "CFA",
  });

  return (
    <InstructorProfileLayout>
      {/* Page Content section */}
      <Row>
        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
          <Link to="/JobSeekerdashboard/seeker-payouts">
            <StatRightBadge
              title={`Revenu disponible (${selectedCurrency})`}
              value={`${selectedCurrency}: ${
                earnings[selectedCurrency] || 0.0
              }`}
              colorVariant="success"
              subtitle="Devise"
              badgeValue={selectedCurrency}
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
          <Link to="/JobSeekerdashboard/My-Job">
            <StatRightBadge
              title="Nombre total d’emplois postulés"
              subtitle="Nouveau poste postulé"
              value={totalJobsApplied}
              badgeValue={newJobsApplied}
              colorVariant="info"
            />
          </Link>
        </Col>
        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
          <Link to="/JobSeekerdashboard/My-Job">
            <StatRightBadge
              title=" Nombre total d’emplois approuvés"
              subtitle=" Emplois en attente"
              value={totalJobs}
              badgeValue={pendingJobs}
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
          <h3 className="h4 mb-0">Demande d’emploi</h3>
        </Card.Header>
        <Card.Body>
          <ApexCharts
            options={OrderColumnChartOptions}
            series={data}
            height={287}
            type="bar"
          />
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header>
          <h3 className="mb-0 h4">Quatre derniers emplois approuvés</h3>
        </Card.Header>
        <Card.Body className="p-0">
          <Table hover responsive className="mb-0 text-nowrap table-centered">
            <thead className="table-light">
              <tr>
                <th scope="col" className="border-0 ">
                  DESCRIPTION DU POSTE
                </th>
                <th scope="col" className="border-0">
                  TYPE
                </th>
                <th scope="col" className="border-0">
                  MONTAN
                </th>
              </tr>
            </thead>
            <tbody>
              {lastApprovedJobs && lastApprovedJobs.length > 0 ? (
                lastApprovedJobs.map((job, index) => (
                  <tr key={index}>
                    <td className="align-middle border-top-0 jobDescriptionCell">
                      {job.jobDescription}
                    </td>

                    <td className="align-middle border-top-0">{job.jobType}</td>
                    <td className="align-middle border-top-0">
                      {formatPrice(job.currency, job.jobSalary)}
                    </td>
                  </tr>
                ))
              ) : (
                <div className="px-5">Aucun emploi n’a été approuvé</div>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      {/* end of Page Content section*/}
    </InstructorProfileLayout>
  );
};
export default Dashboard;
