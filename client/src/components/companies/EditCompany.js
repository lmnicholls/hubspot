import { Button, Modal, Form } from "react-bootstrap";
import React, { useState } from "react";
import { StyleSheet, css } from "aphrodite";
import { useDispatch } from "react-redux";
import { editCompany } from "../../actions";
import "./companies.css";

export default function EditCompany(props) {
  const dispatch = useDispatch();
  const companyID = props.companyID;
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
        companyID,
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
        <Modal.Header>
          <Modal.Title className={css(styles.title)}>
            Edit Company Details
          </Modal.Title>
          <button className={css(styles.closeBtn)} onClick={props.handleClose}>
            ✕
          </button>
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
            <div className={css(styles.formRow)}>
              <Form.Group
                className={css(styles.formRowItm)}
                controlId="formCity"
              >
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

              <Form.Group
                className={css(styles.formRowItm)}
                controlId="formStateRegion"
              >
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
            </div>
            <div className={css(styles.formRow)}>
              <Form.Group
                className={css(styles.formRowItm)}
                controlId="formPostalCode"
              >
                <Form.Label className={css(styles.label, styles.bottomForm)}>
                  Postal Code
                </Form.Label>
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

              <Form.Group
                className={css(styles.formRowItm)}
                controlId="formIndustry"
              >
                <Form.Label className={css(styles.label, styles.bottomForm)}>
                  Industry
                </Form.Label>
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
            </div>
            <Form.Group className="mb-3" controlId="formLogo">
              <Form.Label className={css(styles.label, styles.bottomForm)}>
                Logo
              </Form.Label>
              <Form.Control
                type="text"
                value={logo}
                placeholder="Enter company logo"
                className={css(styles.input)}
                onChange={(e) => {
                  setLogo(e.target.value);
                }}
              />
            </Form.Group>
            <div className={css(styles.buttonCtn)}>
              <Button
                variant="primary"
                className={css(styles.save)}
                type="submit"
              >
                Save
              </Button>
              <Button
                variant="secondary"
                className={css(styles.cancel)}
                onClick={props.handleClose}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
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
  formRow: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "space-between",
  },
  formRowItm: {
    marginRight: "10px",
    width: "50%",
  },
  label: {
    fontFamily: "Quicksand",
    fontWeight: "bold",
    fontSize: "18px",
  },
  input: {
    fontFamily: "Quicksand",
  },
  bottomForm: {
    paddingTop: "12px",
  },
  buttons: {
    fontFamily: "Quicksand",
    fontWeight: "bold",
    marginRight: "5px",
  },
  closeBtn: {
    fontSize: "20px",
    color: "white",
    border: "none",
    backgroundColor: "#193753",
    ":hover": {
      color: "red",
    },
  },
  buttonCtn: {
    display: "flex",
    justifyContent: "flex-end",
    fontFamily: "Quicksand",
  },
  save: {
    marginRight: "5px",
    fontWeight: "bold",
    backgroundColor: "rgb(37, 83, 125)",
    border: "none",
    ":hover": {
      backgroundColor: "#193753",
    },
  },
  cancel: {
    fontWeight: "bold",
    border: "none",
  },
});
