import { Button, Modal, Form } from "react-bootstrap";
import React, { useState } from "react";
import { StyleSheet, css } from "aphrodite";
import { useDispatch, useSelector } from "react-redux";
import { addDeal } from "../../actions";
import "./deals.css";

export default function CreateDeal(props) {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies);
  const companyNamesAndIDs = companies?.map((company) => {
    return {
      companyName: company.companyName,
      companyID: company._id,
    };
  });

  const [companyID, setCompanyID] = useState("");
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");
  const [expectedCloseDate, setExpectedCloseDate] = useState("");

  const handleAddDeal = (e) => {
    e.preventDefault();
    dispatch(addDeal(companyID, user, name, status, amount, expectedCloseDate));
    props.handleClose();
  };

  let companyKey = 0;

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title className={css(styles.title)}>Add A Deal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleAddDeal(e)}>
            <Form.Group className="mb-3" controlId="formCompanyName">
              <Form.Label className={css(styles.label)}>
                Company Name
              </Form.Label>
              <Form.Select
                id="inlineFormCustomSelect"
                required
                className={css(styles.input)}
                onChange={(e) => {
                  setCompanyID(e.target.value);
                }}
              >
                <option value="">Choose A Company...</option>
                {companyNamesAndIDs?.map((company) => (
                  <option key={companyKey++} value={company.companyID}>
                    {company.companyName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCompanyOwner">
              <Form.Label className={css(styles.label)}>
                Company Owner
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company owner"
                className={css(styles.input)}
                required
                onChange={(e) => {
                  setUser(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formname">
              <Form.Label className={css(styles.label)}>Deal Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a name for this deal"
                className={css(styles.input)}
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label className={css(styles.label)}>Status</Form.Label>
              <Form.Select
                id="formStatusSelect"
                required
                className={css(styles.input)}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="">Choose...</option>
                <option value="Initiated">Initiated</option>
                <option value="Qualified">Qualified</option>
                <option value="Contract Sent">Contract Sent</option>
                <option value="Closed Won">Closed Won</option>
                <option value="Closed Lost">Closed Lost</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label className={css(styles.label)}>Amount</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Deal Amount"
                className={css(styles.input)}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCloseDate">
              <Form.Label className={css(styles.label)}>
                Expected Close Date
              </Form.Label>
              <Form.Control
                type="date"
                required
                placeholder="Enter expected close date"
                className={css(styles.input)}
                onChange={(e) => {
                  setExpectedCloseDate(e.target.value);
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
