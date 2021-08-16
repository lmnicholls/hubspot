import { Button, Modal, Form } from "react-bootstrap";
import React, { useState } from "react";
import { StyleSheet, css } from "aphrodite";
import { useDispatch } from "react-redux";
import { addCompany } from "../../actions";

export default function CreateCompany(props) {
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [companyOwner, setCompanyOwner] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [logo, setLogo] = useState("");
  const [industry, setIndustry] = useState("");

  const handleAddCompany = (e) => {
    e.preventDefault();
    console.log(
      companyName,
      companyOwner,
      phoneNumber,
      city,
      state,
      postalCode,
      logo,
      industry
    );
    dispatch(
      addCompany(
        companyName,
        companyOwner,
        phoneNumber,
        city,
        state,
        postalCode,
        logo,
        industry
      )
    );
    props.handleClose();
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleAddCompany(e)}>
            <Form.Group className="mb-3" controlId="formCompanyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                required
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCompanyOwner">
              <Form.Label>Company Owner</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company owner"
                required
                onChange={(e) => {
                  setCompanyOwner(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                required
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStateRegion">
              <Form.Label>State/Region</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter state or region"
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPostalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal code"
                onChange={(e) => {
                  setPostalCode(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formIndustry">
              <Form.Label>Industry</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter industry"
                onChange={(e) => {
                  setIndustry(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLogo">
              <Form.Label>Logo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company logo"
                onChange={(e) => {
                  setLogo(e.target.value);
                }}
              />
            </Form.Group>

            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
