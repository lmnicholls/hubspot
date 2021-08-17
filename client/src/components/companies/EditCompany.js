import { Button, Modal, Form } from "react-bootstrap";
import React, { useState } from "react";
import { StyleSheet, css } from "aphrodite";
import { useDispatch } from "react-redux";
import { editCompany } from "../../actions";
import "./companies.css";

export default function EditCompany(props) {
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState(props.companyName);
  const [companyOwner, setCompanyOwner] = useState(props.owner);
  const [phoneNumber, setPhoneNumber] = useState(props.phone);
  const [city, setCity] = useState(props.city);
  const [state, setState] = useState(props.state);
  const [postalCode, setPostalCode] = useState(props.postalCode);
  const [logo, setLogo] = useState(props.logo);
  const [industry, setIndustry] = useState(props.industry);

  const handleEditCompany = (e) => {
    e.preventDefault();
    dispatch(
      editCompany(
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
          <Modal.Title className={css(styles.title)}>
            Edit Company Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleEditCompany(e)}>
            <Form.Group className="mb-3" controlId="formCompanyName">
              <Form.Label className={css(styles.label)}>
                Company Name
              </Form.Label>
              <Form.Control
                type="text"
                value={companyName}
                placeholder="Enter company name"
                className={css(styles.input)}
                required
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCompanyOwner">
              <Form.Label className={css(styles.label)}>
                Company Owner
              </Form.Label>
              <Form.Control
                type="text"
                value={companyOwner}
                placeholder="Enter company owner"
                className={css(styles.input)}
                required
                onChange={(e) => {
                  setCompanyOwner(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label className={css(styles.label)}>
                Phone Number
              </Form.Label>
              <Form.Control
                type="text"
                value={phoneNumber}
                placeholder="Enter phone number"
                className={css(styles.input)}
                required
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label className={css(styles.label)}>City</Form.Label>
              <Form.Control
                type="text"
                value={city}
                placeholder="Enter city"
                className={css(styles.input)}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStateRegion">
              <Form.Label className={css(styles.label)}>
                State/Region
              </Form.Label>
              <Form.Control
                type="text"
                value={state}
                placeholder="Enter state or region"
                className={css(styles.input)}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPostalCode">
              <Form.Label className={css(styles.label)}>Postal Code</Form.Label>
              <Form.Control
                type="text"
                value={postalCode}
                placeholder="Enter postal code"
                className={css(styles.input)}
                onChange={(e) => {
                  setPostalCode(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formIndustry">
              <Form.Label className={css(styles.label)}>Industry</Form.Label>
              <Form.Control
                type="text"
                value={industry}
                placeholder="Enter industry"
                className={css(styles.input)}
                onChange={(e) => {
                  setIndustry(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLogo">
              <Form.Label className={css(styles.label)}>Logo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company logo"
                className={css(styles.input)}
                onChange={(e) => {
                  setLogo(e.target.value);
                }}
              />
            </Form.Group>

            <Button
              variant="secondary"
              className={css(styles.buttons)}
              onClick={props.handleClose}
            >
              Close
            </Button>
            <Button
              variant="primary"
              className={css(styles.buttons)}
              type="submit"
            >
              Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Quicksand",
    fontWeight: "bold",
    color: "white",
  },
  label: {
    fontFamily: "Quicksand",
    fontWeight: "bold",
    fontSize: "18px",
  },
  input: {
    fontFamily: "Quicksand",
  },
  buttons: {
    fontFamily: "Quicksand",
    fontWeight: "bold",
    marginRight: "5px",
  },
});
