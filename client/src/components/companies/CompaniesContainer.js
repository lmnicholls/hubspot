import NavigationTabs from "../Navigation/NavigationTabs";
import CompaniesListView from "./CompaniesListView";
import "./companies.css";
import { Button } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";
import { useState, useEffect } from "react";
import CreateCompany from "./CreateCompany";
import { useDispatch } from "react-redux";
import { getDeals } from "../../actions";

export default function CompaniesContainer() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDeals());
  }, [dispatch]);

  return (
    <>
      <div className={css(styles.nav_buttons)}>
        <NavigationTabs defaultActiveKey="/companies" />
        <Button
          className={css(styles.createCompanyButton)}
          onClick={handleShow}
        >
          Create company
        </Button>
      </div>
      <CompaniesListView />
      {/* <CompanyUrlModal
        setShow={setShowURLModal}
        show={showURLModal}
        handleClose={() => {
          handleCloseURLModal();
          handleShow();
        }}
        handleShow={handleShowURLModal}
      /> */}
      <CreateCompany
        setShow={setShow}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexFlow: "row",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#193753",
    color: "white",
    margin: "auto",
    paddingLeft: "10px",
    paddingBottom: "5px",
  },
  title: {
    paddingLeft: "10px",
    fontFamily: "Quicksand",
    fontSize: 40,
    marginBottom: 0,
  },
  nav_buttons: {
    paddingLeft: "15px",
    paddingRight: "15px",
    display: "flex",
    flexFlow: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  createCompanyButton: {
    backgroundColor: "#25537d !important",
    fontFamily: "Quicksand ",
    borderColor: "#25537d",
    fontWeight: "bold",
    color: "white",
    ":hover": {
      backgroundColor: "#193753",
    },
  },
});
