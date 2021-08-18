import React from "react";
import Modal from "react-modal";
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
        <h1 style={{ flex: "1 90%" }}>{item.title}</h1>
        <button className={css(styles.closeBtn)} onClick={onClose}>
          X
        </button>
      </div>
      <div>
        <h2>Description</h2>
        <p>{item.name}</p>
        <h2>Status</h2>
        <p>{`${item.stage.charAt(0).toUpperCase()}${item.stage.slice(1)}`}</p>
      </div>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#F4F5F7",
    borderRadius: "2px",
    margin: "48px 0 80px",
    minHeight: "450px",
    width: "800px",
    outline: "none",
    padding: "20px",
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
  closeBtnCtn: {
    display: "flex",
  },
  closeBtn: {
    height: "40px",
    width: "35px",
    fontSize: "20px",
    color: "#031D2C",
    border: "none",
    borderRadius: "25px",
    ":hover": {
      backgroundColor: "#DCDCDC",
    },
  },
});

export default Window;
