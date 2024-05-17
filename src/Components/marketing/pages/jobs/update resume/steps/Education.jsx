import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { FormSelect } from "../../../../../../Components/elements/form-select/FormSelect";

const Education = (props) => {
  const { next, previous, data } = props;
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [study, setStudy] = useState("");
  const [studyType, setStudyType] = useState("");
  const [fromMonth, setFromMonth] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [toYear, setToYear] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (data) {
      const { school, degree, study, studyType, startYear, endYear } = data;

      setSchool(school || "");
      setDegree(degree || "");
      setStudy(study || "");
      setStudyType(studyType || "");

      if (startYear) {
        const [startMonth, startYearValue] = startYear.split(", ");
        setFromMonth(startMonth || "");
        setFromYear(startYearValue || "");
      }

      if (endYear) {
        const [endMonth, endYearValue] = endYear.split(", ");
        setToMonth(endMonth || "");
        setToYear(endYearValue || "");
      }
    }
  }, [data]);

  useEffect(() => {
    // Validate form on each state change
    validateForm();
  }, [school, degree, study, studyType, fromMonth, fromYear, toMonth, toYear]);

  const validateForm = () => {
    // Check if all required fields are filled
    const isValid =
      school !== "" &&
      degree !== "" &&
      study !== "" &&
      studyType !== "" &&
      fromMonth !== "" &&
      fromYear !== "" &&
      toMonth !== "" &&
      toYear !== "";
    setIsFormValid(isValid);
  };

  const formatMonthYear = (month, year) => {
    return `${month}, ${year}`;
  };

  const radios = [
    { name: "Full Time", value: "Full Time" },
    { name: "Part Time", value: "Part Time" },
  ];

  const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const years = Array.from({ length: 35 }, (_, i) => {
    const year = 1999 + i;
    return { value: year.toString(), label: year.toString() };
  });

  const saveToSessionStorage = () => {
    const startYearFormatted = formatMonthYear(fromMonth, fromYear);
    const endYearFormatted = formatMonthYear(toMonth, toYear);

    sessionStorage.setItem("school", school);
    sessionStorage.setItem("degree", degree);
    sessionStorage.setItem("study", study);
    sessionStorage.setItem("studyType", studyType);
    sessionStorage.setItem("startYear", startYearFormatted);
    sessionStorage.setItem("endYear", endYearFormatted);
  };

  return (
    <Form>
      <Card className="card-bordered shadow-none mb-3">
        <Card.Body className="p-6">
          <div className="mb-4">
            <h2 className="mb-0">Education</h2>
            <span>
              Add your education detail like school, degree, and graduate.
            </span>
          </div>
          <Row>
            <Col xs={12} className="mb-3">
              <Form.Label htmlFor="school-university">
                School / University / Bootcamp
                <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="school-university"
                placeholder="School / University / Bootcamp"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                required
              />
            </Col>
            <Col md={12} xs={12} className="mb-3">
              <Form.Label htmlFor="degree">
                Degree / Certificate<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="degree"
                placeholder="Degree / Certificate"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
              />
            </Col>
            <Col md={12} xs={12} className="mb-3">
              <Form.Label htmlFor="study">
                Field of Study<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="study"
                placeholder="Field of Study"
                value={study}
                onChange={(e) => setStudy(e.target.value)}
                required
              />
            </Col>
            <Col md={12} xs={12} className="mb-3">
              <Form.Label className="d-block">Course Type</Form.Label>
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant="outline-primary"
                    name="radio"
                    value={radio.value}
                    checked={studyType === radio.value}
                    onChange={(e) => setStudyType(e.currentTarget.value)}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Col>
            <Col xs={12}>
              <Form.Label>From</Form.Label>
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Control
                as={FormSelect}
                options={months}
                value={fromMonth}
                onChange={(e) => setFromMonth(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                Please re-select your From month again
              </Form.Text>
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Control
                as={FormSelect}
                options={years}
                value={fromYear}
                onChange={(e) => setFromYear(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                Please re-select your From Year again
              </Form.Text>
            </Col>
            <Col className="col-12">
              <Form.Label>To</Form.Label>
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Control
                as={FormSelect}
                options={months}
                value={toMonth}
                onChange={(e) => setToMonth(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                Please re-select your To month again
              </Form.Text>
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Control
                as={FormSelect}
                options={years}
                value={toYear}
                onChange={(e) => setToYear(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                Please re-select your To Year again
              </Form.Text>
            </Col>
            <Col
              md={12}
              xs={12}
              className="d-md-flex justify-content-between mb-3"
            >
              <Button variant="outline-secondary" onClick={previous}>
                Previous
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  saveToSessionStorage();
                  next();
                }}
                disabled={!isFormValid}
              >
                Next
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Form>
  );
};

export default Education;
