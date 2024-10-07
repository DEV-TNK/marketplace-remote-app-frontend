import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Process = () => {
  const navigate = useNavigate();

  const handleApplyNow = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const role = sessionStorage.getItem("role");

    if (accessToken && role === "provider") {
      // If the user is logged in and has the role of provider, redirect to the job posting page
      navigate("/jobs/post-a-job");
    } else {
      // If the user is not logged in or does not have the role of provider, redirect to the sign-in page
      navigate("/authentication/signin");
    }
  };

  return (
    <section className="py-lg-14 pt-8 py-10 bg-white">
      {/* container */}
      <Container>
        <Row>
          <Col xl={{ span: 10, offset: 1 }} md={12} xs={12}>
            <Row className="text-center">
              {/* col */}
              <Col md={12} className="px-lg-10 mb-8 mt-6">
                <span className="text-uppercase text-primary fw-semi-bold ls-md">
                Processus de téléchargement de l'emploi
                </span>
                {/* heading */}
                <h2 className="h1 fw-bold mt-3"> Comment ça marche</h2>
              </Col>
            </Row>
            <Row className="gy-6">
              {/* col */}
              <Col md={4} sm={12}>
                <div className=" text-center">
                  {/* icon */}
                  <div className="icon-shape icon-lg border border-primary border-2 fs-3 rounded-circle mb-4 process-line text-primary smooth-shadow-md">
                    {" "}
                    1
                  </div>
                  {/* heading */}
                  <h3> Cliquez sur 'Publier une offre d'emploi'</h3>
                  {/* text */}
                  <p className="mb-0 px-4">
                  Remplissez les détails de l'emploi, assurez-vous d'inclure vos restrictions géographiques si vous en avez!
                  </p>
                </div>
              </Col>
              {/* col */}
              <Col md={4} sm={12}>
                <div className=" text-center">
                  {/* icon */}
                  <div className="icon-shape icon-lg border border-primary border-2 fs-3 rounded-circle mb-4 process-line text-primary smooth-shadow-md">
                    2
                  </div>
                  {/* heading */}
                  <h3>Révisez </h3>
                  {/* text */}
                  <p className="mb-0 px-2">
                  Prévisualisez le texte et les détails de votre annonce avant de la publier pour être sûr d'attirer les bons utilisateurs, candidats ou prestataires de services postulant pour le poste
                  </p>
                </div>
              </Col>
              {/* col */}
              <Col md={4} sm={12}>
                <div className=" text-center">
                  {/* icon */}
                  <div className="icon-shape icon-lg border border-primary border-2 fs-3 rounded-circle mb-4 text-primary smooth-shadow-md">
                    3
                  </div>
                  {/* heading */}
                  <h3>Soumettez </h3>
                  {/* text */}
                  <p className="mb-0 px-3">
                  Soumettez votre annonce et observez les grands talents postuler
                  </p>
                </div>
              </Col>
              {/* button */}
              <Col sm={12} className="mt-8 text-center">
                <Button onClick={handleApplyNow}> Postuler maintenant</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Process;
