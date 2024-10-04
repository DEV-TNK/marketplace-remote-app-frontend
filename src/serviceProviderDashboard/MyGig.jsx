import { useState, useEffect } from "react";

import { Card, Tab, Nav, Spinner } from "react-bootstrap";
import GigTable from "./GigTable";
import ServiceProviderProfileLayout from "./ServiceProviderProfileLayout";
import axios from "axios";

const MyGig = () => {
  const [gigs, setGigs] = useState([]);
  const [ongoingGigs, setOngoingGigs] = useState([]);
  const [completedGigs, setcompletedGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = sessionStorage.getItem("UserId");

  const ongoingGigsHeader = [
    // { accessorKey: "serviceRequestTitle", header: "Gig Title" },
    { accessorKey: "serviceType", header: "Type de gig et description" },
    { accessorKey: "totalAmountPaid", header: "Salaire du gig" },
    { accessorKey: "username", header: "Nom d'utilisateur" },
    // { accessorKey: "review", header: "Review" },
    { accessorKey: "deliveryDate", header: "Date de demande" },
    { accessorKey: "status", header: "Statut" },
    { accessorKey: "paymentStatus", header: "Statut du paiement" },
    { accessorKey: "action", header: "Action" },
  ];

  const completedGigsHeader = [
    // { accessorKey: "serviceRequestTitle", header: "Gig Title" },
    { accessorKey: "serviceType", header: "Type de gig et description" },
    { accessorKey: "totalAmountPaid", header: "Salaire du gig" },
    { accessorKey: "username", header: "Nom d'utilisateur" },
    { accessorKey: "review", header: "Critique" },
    { accessorKey: "deliveryDate", header: "Date de fin" },
    { accessorKey: "status", header: "Statut" },
    { accessorKey: "paymentStatus", header: "Statut du paiement" },
  ];

  useEffect(() => {
    const fetchgigs = async () => {
      try {
        const response = await axios.get(
          `https://marketplacebackendas-test.azurewebsites.net/api/v1/my-gigs/${userId}`
        );
        // setGigs(response.data.gigs);
        setOngoingGigs(response.data.ongoingGigs);
        setcompletedGigs(response.data.completedGigs);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching gigs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchgigs();
  }, []);

  useEffect(() => {
    const fetchAllGigs = async () => {
      try {
        const response = await axios.get(
          `https://marketplacebackendas-test.azurewebsites.net/api/v1/get-my-services/${userId}`
        );
        const allGigsData = response.data.myServices.map((item) => item);
        setGigs(allGigsData);
        // console.log("fetch", allGigsData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllGigs();
  }, [userId]);

  const allgigsHeader = [
    {
      accessorKey: "header",
      header: "Titre du gig ",
      cell: ({ row }) => `${row.original.header} - ${row.original.format}`,
    },
    { accessorKey: "department", header: "Département" },

    { accessorKey: "createdAt", header: "Date de publication" },
    { accessorKey: "status", header: "Statut" },
    // { accessorKey: "paymentStatus", header: "Payment Status" },
  ];

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

  return (
    <ServiceProviderProfileLayout>
      <Card className="border-0">
        <Tab.Container defaultActiveKey="all">
          <Card>
            <Card.Header className="border-bottom-0 p-0 bg-white">
              <Nav className="nav-lb-tab">
                <Nav.Item>
                  <Nav.Link eventKey="all" className="mb-sm-3 mb-md-0">
                    Tous
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="ongoinggig" className="mb-sm-3 mb-md-0">
                  Gigs en cours
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="completedgig" className="mb-sm-3 mb-md-0">
                  Gigs terminés
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Header>
              <div className="mb-3 mb-lg-0">
                <h3 className="mb-0">gigs</h3>
                <p className="mb-0">
                Gérer votre gig et ses mises à jour comme en direct, brouillon,et en perspicacité.
                </p>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <Tab.Content>
                <Tab.Pane eventKey="all" className="pb-4">
                  {isLoading ? (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ minHeight: "200px" }}
                    >
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : (
                    <GigTable header={allgigsHeader} data={gigs} />
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="ongoinggig" className="pb-4">
                  <GigTable
                    header={ongoingGigsHeader}
                    data={ongoingGigs}
                    // gigId={ongoingGigs._id}
                    price={gigs.price}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="completedgig" className="pb-4">
                  <GigTable
                    header={completedGigsHeader}
                    data={completedGigs}
                    // gigId={completedGigs._id}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </Card>
    </ServiceProviderProfileLayout>
  );
};

export default MyGig;
