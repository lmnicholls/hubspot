import {
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import React, { useState } from "react";
import { StyleSheet, css } from "aphrodite";
import { useDispatch } from "react-redux";
import { addCompany } from "../../actions";
import "./companies.css";
import axios from "axios";

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
  const [companyURL, setCompanyURL] = useState("");

  const apiKey = process.env.REACT_APP_BIGPICTURE_API_KEY;

  const getCompanyInfoFromURL = async (e) => {
    e.preventDefault();

    return await axios
      .get(
        `https://company.bigpicture.io/v1/companies/find?domain=${companyURL}`,
        {
          headers: {
            Authorization: `${apiKey}`,
          },
        }
      )
      .then((res) => {
        setCompanyName(res.data.name);
        setPhoneNumber(res.data.phone);
        setCity(res.data.geo.city);
        setState(res.data.geo.state);
        setPostalCode(res.data.geo.postalCode);
        setLogo(res.data.logo);
        setIndustry(res.data.category.industry);
      })
      .catch((error) => console.log(error));
  };

  const handleAddCompany = (e) => {
    e.preventDefault();
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
    //clear form after form is submitted
    setCompanyName("");
    setCompanyOwner("");
    setPhoneNumber("");
    setCity("");
    setState("");
    setPostalCode("");
    setLogo("");
    setIndustry("");
    props.handleClose();
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={() => {
          //clear form fields when modal hides
          setCompanyName("");
          setCompanyOwner("");
          setPhoneNumber("");
          setCity("");
          setState("");
          setPostalCode("");
          setLogo("");
          setIndustry("");
          props.handleClose();
        }}
        animation={false}
      >
        <Modal.Header className={css(styles.closeBtnCtn)}>
          <Modal.Title style={{ flex: "1 90%" }} className={css(styles.title)}>
            Create Company
          </Modal.Title>
          <button
            className={css(styles.closeBtn)}
            onClick={() => {
              setCompanyName("");
              setCompanyOwner("");
              setPhoneNumber("");
              setCity("");
              setState("");
              setPostalCode("");
              setLogo("");
              setIndustry("");
              props.handleClose();
            }}
          >
            ✕
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => getCompanyInfoFromURL(e)}>
            <Form.Group className="mb-3" controlId="formCompanyURL">
              <Form.Label className={css(styles.label)}>Company URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Company URL"
                className={css(styles.input)}
                required
                onChange={(e) => {
                  setCompanyURL(e.target.value);
                }}
              />
            </Form.Group>

            <Button
              variant="primary"
              className={css(styles.prefill)}
              type="submit"
            >
              Prefill Company Info
            </Button>
          </Form>

          <Form onSubmit={(e) => handleAddCompany(e)}>
            <div className={css(styles.formRow)}>
              <Form.Group
                className={css(styles.formRowItm)}
                controlId="formCompanyName"
              >
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

              <Form.Group
                className={css(styles.formRowItm)}
                controlId="formCompanyOwner"
              >
                <Form.Label className={css(styles.label)}>
                  Company Owner
                </Form.Label>
                <Form.Select
                  id="formStatusSelect"
                  required
                  className={css(styles.input)}
                  onChange={(e) => {
                    setCompanyOwner(e.target.value);
                  }}
                >
                  <option value="">Choose...</option>
                  <option value="Danna">Danna</option>
                  <option value="Jeremy">Jeremy</option>
                  <option value="Lauren">Lauren</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className={css(styles.formRow)}>
              <Form.Group
                className={css(styles.formRowItm)}
                controlId="formPhoneNumber"
              >
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
            </div>
            <div className={css(styles.formRow)}>
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
                  placeholder="Enter state"
                  className={css(styles.input)}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPostalCode">
                <Form.Label className={css(styles.label)}>
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
            </div>
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
                value={logo}
                placeholder="Enter company logo"
                className={css(styles.input)}
                onChange={(e) => {
                  setLogo(e.target.value);
                }}
              />
            </Form.Group>
            <Container>
              <Row>
                <Col xs={6} md={6}>
                  {logo && <Image src={logo} thumbnail />}
                </Col>
                <Col xs={6} md={6}>
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
                      onClick={() => {
                        setCompanyName("");
                        setCompanyOwner("");
                        setPhoneNumber("");
                        setCity("");
                        setState("");
                        setPostalCode("");
                        setLogo("");
                        setIndustry("");
                        props.handleClose();
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
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
  label: {
    fontFamily: "Quicksand",
    fontWeight: "bold",
    fontSize: "16px",
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
  input: {
    fontFamily: "Quicksand",
  },
  buttonCtn: {
    display: "flex",
    justifyContent: "flex-end",
    fontFamily: "Quicksand",
  },
  prefill: {
    fontWeight: "bold",
    backgroundColor: "rgb(37, 83, 125)",
    border: "none",
    marginBottom: "10px",
    ":hover": {
      backgroundColor: "#193753",
    },
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
  closeBtnCtn: {
    display: "flex",
    backgroundColor: "#193753",
    paddingLeft: "10px",
    paddingRight: "10px",
    color: "white",
    fontFamily: "Quicksand",
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
});
