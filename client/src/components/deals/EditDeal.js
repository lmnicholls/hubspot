import { Button, Modal, Form } from "react-bootstrap";
import React, { useState } from "react";
import { StyleSheet, css } from "aphrodite";
import { useDispatch, useSelector } from "react-redux";
import { editDealDetails } from "../../actions";
import "./deals.css";

export default function EditDeal(props) {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies);
  const companyNames = companies?.map((company) => company.companyName);

  const dealID = props.dealID;

  const [companyName, setCompanyName] = useState(props.companyName);
  const [user, setUser] = useState(props.user);
  const [name, setName] = useState(props.name);
  const [status, setStatus] = useState(props.status);
  const [amount, setAmount] = useState(props.amount);
  const [expectedCloseDate, setExpectedCloseDate] = useState(
    props.expectedCloseDate
  );

  const handleEditDeal = (e) => {
    e.preventDefault();
    dispatch(
      editDealDetails(
        dealID,
        name,
        status,
        amount,
        companyName,
        user,
        expectedCloseDate
      )
    );
    props.handleClose();
  };

  let companyKey = 0;

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title className={css(styles.title)}>Edit Deal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleEditDeal(e)}>
            <Form.Group className="mb-3" controlId="formCompanyName">
              <Form.Label className={css(styles.label)}>
                Company Name
              </Form.Label>
              <Form.Select
                id="inlineFormCustomSelect"
                required
                value={companyName}
                className={css(styles.input)}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
              >
                <option value="">Choose A Company...</option>
                {companyNames?.map((name) => (
                  <option key={companyKey++} value={name}>
                    {name}
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
                value={user}
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
                value={name}
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
                defaultValue={status}
                required
                className={css(styles.input)}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="">Choose...</option>
                <option value="initiated">Initiated</option>
                <option value="qualified">Qualified</option>
                <option value="contract sent">Contract Sent</option>
                <option value="closed won">Closed Won</option>
                <option value="closed Lost">Closed Lost</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label className={css(styles.label)}>Amount</Form.Label>
              <Form.Control
                type="number"
                required
                value={amount}
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
                value={expectedCloseDate.slice(0, 10)}
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
