import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import { Button } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";
import EditDeal from "./EditDeal";
import { useDispatch } from "react-redux";
import { deleteDeal } from "../../actions/index";
import { getDeals } from "../../actions";

Modal.setAppElement("#root");

const Window = ({ show, onClose, item }) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleClose = () => setShowEdit(false);
  const handleShow = () => setShowEdit(true);

  const dispatch = useDispatch();

  const handleDeleteButton = () => {
    dispatch(deleteDeal(item._id));
    dispatch(getDeals());
    onClose();
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className={css(styles.modal)}
      overlayClassName={css(styles.overlay)}
    >
      <div className={css(styles.modalContentCtn)}>
        <div className={css(styles.closeBtnCtn)}>
          <h1 style={{ flex: "1 90%" }} className={css(styles.dealHeader)}>
            {item.name}
          </h1>
          <button className={css(styles.closeBtn)} onClick={onClose}>
            ✕
          </button>
        </div>
        <div>
          <h4 className={css(styles.detailTitle, styles.detailAboutTitle)}>
            About this deal{" "}
          </h4>
          <p className={css(styles.detail)}>
            <span className={css(styles.detailLabel)}>Amount: </span>$
            {item.amount}
          </p>
          <p className={css(styles.detail)}>
            <span className={css(styles.detailLabel)}>Stage: </span>
            {`${item.stage.status
              .charAt(0)
              .toUpperCase()}${item.stage.status.slice(1)}`}
          </p>
          <p className={css(styles.detail)}>
            <span className={css(styles.detailLabel)}>Owner: </span>
            {item.user}
          </p>
          <p className={css(styles.detail)}>
            <span className={css(styles.detailLabel)}>Close date: </span>
            {new Date(
              item.expectedCloseDate.split("T")[0] + ` 00:00`
            ).toDateString()}
          </p>

          <hr />
          <h4 className={css(styles.detailTitle)}>Company details</h4>
          <p className={css(styles.detail)}>
            <span className={css(styles.detailLabel)}>Name: </span>
            {item.company.companyName}
          </p>
          <p className={css(styles.detail)}>
            <span className={css(styles.detailLabel)}>Owner: </span>
            {item.company.owner}
          </p>
          <p className={css(styles.detail)}>
            <span className={css(styles.detailLabel)}>Phone: </span>
            {item.company.phone}
          </p>
          <p className={css(styles.detail)}>
            <span className={css(styles.detailLabel)}>Industry: </span>
            {item.company.industry}
          </p>
          <p className={css(styles.detail)}>
            <span className={css(styles.detailLabel)}>Date Created: </span>
            {new Date(item.company.dateCreated).toDateString()}
          </p>
          <p className={css(styles.detail)}>
            <span className={css(styles.detailLabel)}>
              Last Activity Date:{" "}
            </span>
            {new Date(item.company.lastActivityDate).toDateString()}
          </p>
          <hr />
          <div className={css(styles.btnCtn)}>
            <Button
              className={css(styles.deleteButton)}
              onClick={handleDeleteButton}
            >
              Delete
            </Button>
            <Button
              className={css(styles.editDetailButton)}
              onClick={handleShow}
            >
              Edit Deal
            </Button>
            <Button
              variant="secondary"
              className={css(styles.cancel)}
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
      <EditDeal
        setShow={setShowEdit}
        show={showEdit}
        handleClose={handleClose}
        handleShow={handleShow}
        companyName={item.company.companyName}
        dealID={item._id}
        user={item.user}
        name={item.name}
        status={item.stage.status}
        amount={item.amount}
        expectedCloseDate={item.expectedCloseDate}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#F4F5F7",
    borderRadius: "3px",
    width: "600px",
    outline: "none",
    fontFamily: "Quicksand",
    placeSelf: "center",
    paddingBottom: "10px",
  },

  overlay: {
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  dealHeader: {
    fontSize: "32px",
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
  detailAboutTitle: {
    paddingTop: "10px",
  },
  detailTitle: {
    paddingLeft: "10px",
    color: "#193753",
    fontWeight: "bold",
  },
  detail: {
    paddingLeft: "20px",
    marginBottom: "1px",
  },
  detailLabel: {
    fontWeight: "bold",
  },
  btnCtn: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "10px",
    fontWeight: "bold",
  },
  save: {
    marginRight: "5px",
    fontWeight: "bold",
    border: "none",
    ":hover": {
      backgroundColor: "#193753",
    },
  },
  cancel: {
    fontWeight: "bold",
    backgroundColor: "#6c757d",
    border: "none",
    ":hover": {
      backgroundColor: "#64686b",
    },
  },
  editDetailButton: {
    marginLeft: "10px",
    fontWeight: "bold",
    backgroundColor: "rgb(37, 83, 125)",
    border: "none",
    color: "white",
    marginRight: "10px",
    ":hover": {
      backgroundColor: "#193753",
    },
  },
  deleteButton: {
    marginLeft: "20px",
    fontWeight: "bold",
    backgroundColor: "rgb(37, 83, 125)",
    border: "none",
    color: "white",
    marginRight: "0px",
    ":hover": {
      backgroundColor: "#193753",
    },
  },
});

export default Window;
