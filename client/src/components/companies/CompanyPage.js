import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import spinner from "../../images/Spinner.gif";
import EditCompany from "./EditCompany";

export default function CompanyPage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id } = useParams();
  const currentCompany = useSelector((state) =>
    state.companies?.find((company) => {
      return company._id === id;
    })
  );

  const deals = useSelector((state) =>
    state.deals?.filter((deal) => {
      return deal.company._id === id;
    })
  );

  let dealKey = 0;

  if (!currentCompany || !deals) {
    return (
      <div className={css(styles.loadingText)}>
        <img src={spinner} className={css(styles.spinner)} alt="spinner" />
        Loading Company...
      </div>
    );
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      <EditCompany
        setShow={setShow}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        companyID={currentCompany._id}
        companyName={currentCompany.companyName}
        owner={currentCompany.owner}
        phone={currentCompany.phone}
        city={currentCompany.city}
        state={currentCompany.state_region}
        postalCode={currentCompany.postalCode}
        logo={currentCompany.logo}
        industry={currentCompany.industry}
      />
      <div className={css(styles.backButtonDiv)}>
        <Link to={`/companies`} className={css(styles.backButton)}>
          &lt;&lt; Back to Companies
        </Link>
      </div>
      <Container>
        <Row>
          <Col>
            <div className={css(styles.container)}>
              <div>
                <div className={css(styles.companyDiv)}>
                  <div className={css(styles.companyTitle)}>
                    {currentCompany.logo === "" ? (
                      <span></span>
                    ) : (
                      <img
                        src={currentCompany.logo}
                        className={css(styles.companyListImg)}
                        alt="logo"
                      ></img>
                    )}
                    {currentCompany.companyName}
                  </div>
                  <hr />
                  <div className={css(styles.companyDetails)}>
                    <h6 className={css(styles.heading)}>About this company</h6>
                    <div className={css(styles.detail)}>
                      <h6 className={css(styles.title)}>Industry</h6>
                      <h6 className={css(styles.info)}>
                        {currentCompany.industry}
                      </h6>
                    </div>
                    <div className={css(styles.detail)}>
                      <h6 className={css(styles.title)}>Company Owner</h6>
                      <h6 className={css(styles.info)}>
                        {currentCompany.owner}
                      </h6>
                    </div>
                    <div className={css(styles.detail)}>
                      <h6 className={css(styles.title)}>Phone</h6>
                      <h6 className={css(styles.info)}>
                        {currentCompany.phone}
                      </h6>
                    </div>
                    <div className={css(styles.detail)}>
                      <h6 className={css(styles.title)}>City</h6>
                      <h6 className={css(styles.info)}>
                        {currentCompany.city}
                      </h6>
                    </div>
                    <div className={css(styles.detail)}>
                      <h6 className={css(styles.title)}>State/Region</h6>
                      <h6 className={css(styles.info)}>
                        {currentCompany.state_region}
                      </h6>
                    </div>
                    <div className={css(styles.detail)}>
                      <h6 className={css(styles.title)}>Postal Code</h6>
                      <h6 className={css(styles.info)}>
                        {currentCompany.postalCode}
                      </h6>
                    </div>
                    <hr />
                  </div>
                  <div className={css(styles.editButtonDiv)}>
                    <Button
                      onClick={handleShow}
                      className={css(styles.editCompanyButton)}
                    >
                      Edit Company
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div className={css(styles.container)}>
              <div>
                <div className={css(styles.companyDiv)}>
                  <div className={css(styles.companyTitle)}>
                    Deals with {currentCompany.companyName}
                  </div>
                  <hr />

                  <div className={css(styles.companyDetails)}>
                    <Container>
                      {deals.length === 0 && (
                        <h6 className={css(styles.heading)}>
                          No deals with this company.
                        </h6>
                      )}

                      {deals.length !== 0 &&
                        deals.map((deal) => {
                          return (
                            <div key={dealKey++}>
                              <Row>
                                <Table borderless>
                                  <thead>
                                    <tr className={css(styles.heading)}>
                                      <th colSpan={2}>{deal.name}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className={css(styles.dealTitle)}>
                                        Deal State:
                                      </td>
                                      <td className={css(styles.info)}>
                                        {deal.stage.status}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className={css(styles.dealTitle)}>
                                        Amount:
                                      </td>
                                      <td className={css(styles.info)}>
                                        ${numberWithCommas(deal.amount)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className={css(styles.dealTitle)}>
                                        Close Date:
                                      </td>
                                      <td className={css(styles.info)}>
                                        {new Date(
                                          deal.expectedCloseDate.split("T")[0] +
                                            ` 00:00`
                                        ).toDateString()}
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </Row>
                            </div>
                          );
                        })}
                    </Container>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: "0 auto",
    width: "85%",
  },
  backButtonDiv: {
    fontFamily: "Quicksand",
    fontSize: "18px",
    fontWeight: "bold",
    paddingTop: "15px",
    marginLeft: "50px",
    marginBottom: "20px",
  },
  backButton: {
    color: "#25537d !important",
  },
  companyDiv: {
    backgroundColor: "rgb(220, 220, 224)",
    padding: "20px",
    borderRadius: "15px",
  },
  heading: {
    fontWeight: "bold",
    fontSize: "22px",
    color: "#193753",
  },
  companyDetails: {
    fontFamily: "Quicksand",
  },
  companyTitle: {
    fontFamily: "Quicksand",
    fontSize: "36px",
    fontWeight: "bold",
    textAlign: "center",
  },
  detail: {
    paddingTop: "15px",
  },
  title: {
    color: "white",
    fontWeight: "900",
    fontSize: "18px",
  },
  dealTitle: {
    color: "white",
    fontWeight: "900",
    fontSize: "22px",
  },
  info: {
    fontSize: "22px",
  },
  img: {
    width: "40px",
    paddingRight: "5px",
  },
  editButtonDiv: {
    display: "flex",
    justifyContent: "flex-end",
  },
  editCompanyButton: {
    backgroundColor: "#25537d !important",
    fontFamily: "Quicksand ",
    borderColor: "#25537d",
    fontWeight: "bold",
    color: "white",
    ":hover": {
      backgroundColor: "#193753",
    },
  },
  loadingText: {
    fontFamily: "Quicksand",
    fontSize: "20px",
    fontWeight: "bold",
    paddingLeft: "20px",
  },
  spinner: {
    height: "40px",
  },
  companyListImg: {
    height: "40px",
    paddingRight: "10px",
  },
});
