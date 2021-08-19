import React from "react";
import Modal from "react-modal";
import { Button } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";

Modal.setAppElement("#root");

const Window = ({ show, onClose, item }) => {
  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className={css(styles.modal)}
      overlayClassName={css(styles.overlay)}
    >
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
          About this deal
        </h4>
        <p className={css(styles.detail)}>
          <span className={css(styles.detailLabel)}>Amount: </span>$
          {item.amount}
        </p>
        <p className={css(styles.detail)}>
          <span className={css(styles.detailLabel)}>Stage: </span>
          {`${item.stage.charAt(0).toUpperCase()}${item.stage.slice(1)}`}
        </p>
        <p className={css(styles.detail)}>
          <span className={css(styles.detailLabel)}>Owner: </span>
          {item.user}
        </p>
        <p className={css(styles.detail)}>
          <span className={css(styles.detailLabel)}>Close date: </span>
          {new Date(item.expectedCloseDate).toDateString()}
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
          <span className={css(styles.detailLabel)}>Last Activity Date: </span>
          {new Date(item.company.lastActivityDate).toDateString()}
        </p>
        <hr />
        <div className={css(styles.btnCtn)}>
          <Button className={css(styles.save)}>Save</Button>
          <Button className={css(styles.close)} onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#F4F5F7",
    borderRadius: "2px",
    margin: "48px 0 80px",
    minHeight: "500px",
    width: "800px",
    outline: "none",
    fontFamily: "Quicksand",
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
  },
  save: {
    marginRight: "5px",
    fontWeight: "bold",
    ":hover": {
      backgroundColor: "#193753",
    },
  },
  close: {
    fontWeight: "bold",
    ":hover": {
      backgroundColor: "#193753",
    },
  },
});

export default Window;
