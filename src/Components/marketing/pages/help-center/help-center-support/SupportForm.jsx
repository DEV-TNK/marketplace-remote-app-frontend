import React from 'react';
import { Col, Row, Card, Container, Form, Button } from 'react-bootstrap';
import { FormSelect } from '../../../../../Components/elements/form-select/FormSelect';
import HelpCenterSupport from '../help-center-support/HelpCenterSupport';
import NavbarDefault from '../../../../../Pages/home-academy/navbars/NavbarDefault';
import FooterWithLinks from '../../../../../Pages/home-academy/FooterWithLinks';

const SupportForm = () => {
    const subjetOptions = [
        { value: 1, label: 'General' },
        { value: 2, label: 'Accounts' },
        { value: 3, label: 'Payment' }
    ];

    return (
        <>
            <NavbarDefault />
            <HelpCenterSupport />
            <section className="py-10">
                <Container>
                    <Row>
                        <Col md={{ offset: 2, span: 8 }} xs={12}>
                            <div className="mb-3">
                                {/* lead  */}
                                <p className="lead mb-8">
                                    Can’t find the answer you’re looking for? Don't worry! Get in
                                    touch with the Docs Support team, we will be glad to assist you.
                                </p>
                            </div>
                            <div>
                                {/* form - submit a request */}
                                <Card className="border">
                                    <Card.Body className="p-5">
                                        <h2 className="mb-4 fw-semi-bold">Submit a Request</h2>
                                        {/* form  */}
                                        <Form>
                                            {/* your name  */}
                                            <Form.Group className="mb-3" controlId="name">
                                                <Form.Label>
                                                    Your Name <span className="text-danger">*</span>
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Your Name"
                                                    required
                                                />
                                            </Form.Group>
                                            {/* email address  */}
                                            <Form.Group className="mb-3" controlId="email">
                                                <Form.Label>
                                                    Email Address <span className="text-danger">*</span>
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Email address here"
                                                    required
                                                />
                                            </Form.Group>
                                            {/* select subject  */}
                                            <Form.Group className="mb-3" controlId="subject">
                                                <Form.Label>Subject </Form.Label>
                                                <Form.Control
                                                    as={FormSelect}
                                                    placeholder="Select"
                                                    options={subjetOptions}
                                                />
                                            </Form.Group>
                                            {/* description  */}
                                            <Form.Group className="mb-3" controlId="description">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    placeholder="Write down here"
                                                />
                                            </Form.Group>
                                            {/* submit button  */}
                                            <Button variant="primary" type="submit">
                                                Submit
                                            </Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                    <FooterWithLinks />
                </Container>
            </section>
        </>
    );
};

export default SupportForm;
