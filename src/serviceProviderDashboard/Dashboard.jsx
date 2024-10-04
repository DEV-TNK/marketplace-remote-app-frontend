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
  OrderColumnChartOptionsSP,
} from "../data/charts/ChartData";

// import profile layout wrapper
import ProviderProfileLayout from "./ServiceProviderProfileLayout";
import ServiceProviderProfileLayout from "./ServiceProviderProfileLayout";

import AxiosInterceptor from "../Components/AxiosInterceptor";

const Dashboard = () => {
  const authFetch = AxiosInterceptor()
  const [amount, setAmount] = useState(null);
  const [top4Payment, setTop4Payment] = useState([]);
  const [completedJobs, setCompletedJobs] = useState(null);
  const [gigsEmployed, setGigsEmployed] = useState(null);
  const [monthLyGigs, setMonthLyGigs] = useState(null);
  const [ongoingGigs, setOngoingGigs] = useState(null);
  const [ongoingEmployedGigs, setOngoingEmployedGigs] = useState(null);
  const [totalGigs, setTotalGigs] = useState(null);
  const [newAmount, setNewAmount] = useState(null);
  const [data, setData] = useState([]);

  const [earnings, setEarnings] = useState({
    NGN: 0,
    USD: 0,
    EUR: 0,
    GBP: 0,
  });

  const [selectedCurrency, setSelectedCurrency] = useState("NGN");
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
        const response = await authFetch.get(
          `https://marketplacebackendas-test.azurewebsites.net/api/v1/service-provider-dashboard/${userId}`
        );

        setCompletedJobs(response.data.totalCompleted);
        setGigsEmployed(response.data.totalGigsEmployed);
        setMonthLyGigs(response.data.newThisMonth);
        setOngoingGigs(response.data.ongoing);
        setOngoingEmployedGigs(response.data.totalOngoingGigsEmployed);
        setTotalGigs(response.data.totalGigCreated);
        const formattedAmount = response.data.moneyEarned.toLocaleString(
          "en-NG",
          {
            style: "currency",
            currency: "NGN",
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
        const response = await axios.get(
          `https://marketplacebackendas-test.azurewebsites.net/api/v1/get-my-earning/${userId}`
        );
        setEarnings(response.data.userEarning);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const userId = sessionStorage.getItem("UserId");
        const response = await axios.get(
          `https://marketplacebackendas-test.azurewebsites.net/api/v1/service-created-per-month/${userId}`
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
          `https://marketplacebackendas-test.azurewebsites.net/api/v1/last-four-paid-gigs/${userId}`
        );
        setTop4Payment(response.data.lastFourPaidGigs);
      } catch (error) {
        console.log("internal error");
      }
    };
    fetchdata();
  }, [userId]);

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

  function truncateDescription(description, maxLength = 40) {
    if (description.length <= maxLength) {
      return description;
    } else {
      return `${description.slice(0, maxLength)}...`;
    }
  }
  // const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  //   <Link
  //     to=""
  //     ref={ref}
  //     onClick={(e) => {
  //       e.preventDefault();
  //       onClick(e);
  //     }}
  //     className="btn-icon btn btn-ghost btn-sm rounded-circle"
  //   >
  //     {children}
  //   </Link>
  // ));

  // const ActionMenu = () => {
  //   return (
  //     <div>
  //       <Dropdown>
  //         <Dropdown.Toggle as={CustomToggle}>
  //           <i className="fe fe-more-vertical text-muted"></i>
  //         </Dropdown.Toggle>
  //         <Dropdown.Menu align="end">
  //           <Dropdown.Header>SETTINGS</Dropdown.Header>
  //           <Dropdown.Item eventKey="1">
  //             <i className="fe fe-edit dropdown-item-icon"></i> Edit
  //           </Dropdown.Item>
  //           <Dropdown.Item eventKey="2">
  //             <i className="fe fe-trash dropdown-item-icon"></i> Remove
  //           </Dropdown.Item>
  //         </Dropdown.Menu>
  //       </Dropdown>
  //     </div>
  //   );
  // };

  return (
    <ServiceProviderProfileLayout>
      {/* Page Content section */}
      <Row>
        <Col lg={3} md={12} sm={12} className="mb-4 mb-lg-0">
          <Link to="/ServiceProviderdashboard/ServiceProvided-payouts">
            <StatRightBadge
              title={`Revenu disponible (${selectedCurrency})`}
              value={
                [selectedCurrency] +
                [" "] +
                `${earnings[selectedCurrency] || 0.0}`
              }
              colorVariant="success"
              badgeValue={selectedCurrency}
              subtitle=" Devise"
            />
          </Link>
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret>{selectedCurrency}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => handleCurrencyChange("NGN")}>
                NGN
              </DropdownItem>
              <DropdownItem onClick={() => handleCurrencyChange("USD")}>
                USD
              </DropdownItem>
              <DropdownItem onClick={() => handleCurrencyChange("EUR")}>
                EUR
              </DropdownItem>
              <DropdownItem onClick={() => handleCurrencyChange("GBP")}>
                GBP
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col lg={3} md={12} sm={12} className="mb-4 mb-lg-0">
          <Link to="/ServiceProviderdashboard/All-Gig">
            <StatRightBadge
              title="Total des services (Gigs) créés"
              subtitle="Nouveau ce mois-ci"
              value={totalGigs || 0}
              badgeValue={monthLyGigs || 0}
              colorVariant="info"
            />
          </Link>
        </Col>
        <Col lg={3} md={12} sm={12} className="mb-4 mb-lg-0">
          <Link to="/ServiceProviderdashboard/All-Gig">
            <StatRightBadge
              title="Total des services (Gigs) terminés"
              subtitle=" En cours"
              value={completedJobs || 0}
              badgeValue={ongoingGigs || 0}
              colorVariant="warning"
            />
          </Link>
        </Col>
        <Col lg={3} md={12} sm={12} className="mb-4 mb-lg-0">
          <Link to="/ServiceProviderDashoard/Outsourced-Gigs">
            <StatRightBadge
              title="Total des services (Gigs) employés"
              subtitle="En attente"
              value={gigsEmployed || 0}
              badgeValue={ongoingEmployedGigs || 0}
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
          <h3 className="h4 mb-0">Services (Gigs) créés</h3>
        </Card.Header>
        <Card.Body>
          <ApexCharts
            options={OrderColumnChartOptionsSP}
            // series={OrderColumnChartSeries}
            series={data}
            height={287}
            type="bar"
          />
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header>
          <h3 className="mb-0 h4">Les quatre derniers gigs payés</h3>
        </Card.Header>
        <Card.Body className="p-0 ">
          <Table hover responsive className="mb-0 text-nowrap table-centered">
            <thead className="table-light">
              <tr>
                <th scope="col" className="border-0">
                Titre du gig
                </th>
                <th scope="col" className="border-0">
                MONTANT
                </th>
                <th scope="col" className="border-0">
                Personne&apos;s
                </th>
                <th scope="col" className="border-0">
                  Type
                </th>
                <th scope="col" className="border-0">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody>
              {top4Payment &&
                top4Payment.map((gig, index) => (
                  <tr key={gig.id}>
                    <td className="align-middle border-top-0">
                      {truncateDescription(gig.serviceRequestTitle) || "No Title found"}
                    </td>
                    <td className="align-middle border-top-0">
                      {gig.currency
                        ? formatPrice(gig.currency, gig.totalAmountPaid)
                        : `${gig.totalAmountPaid}`}
                    </td>
                    <td className="align-middle border-top-0">
                      {gig.fullName}
                    </td>
                    <td className="align-middle border-top-0">
                      {gig.serviceType}
                    </td>
                    <td className="align-middle border-top-0">{gig.status}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      {/* end of Page Content section*/}
    </ServiceProviderProfileLayout>
  );
};
export default Dashboard;
