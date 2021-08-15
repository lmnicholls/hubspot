import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";

export default function CompanyPage() {
  const { id } = useParams();
  const currentCompany = useSelector((state) =>
    state.companies?.find((company) => {
      return company._id === id;
    })
  );

  if (!currentCompany) {
    return <div>Company Not Found</div>;
  }

  console.log(currentCompany);

  return (
    <>
      <div>
        <div className={css(styles.companyTitle)}>
          <img
            src={currentCompany.logo}
            className={css(styles.img)}
            alt="companyLogo"
          />
          {currentCompany.companyName}
        </div>
        <div className={css(styles.companyDetails)}>
          <h6 className={css(styles.heading)}>About this company</h6>
          <div className={css(styles.detail)}>
            <h6 className={css(styles.title)}>Industry</h6>
            <h6 className={css(styles.info)}>{currentCompany.industry}</h6>
          </div>
          <div className={css(styles.detail)}>
            <h6 className={css(styles.title)}>Company Owner</h6>
            <h6 className={css(styles.info)}>{currentCompany.owner}</h6>
          </div>
          <div className={css(styles.detail)}>
            <h6 className={css(styles.title)}>Phone</h6>
            <h6 className={css(styles.info)}>{currentCompany.phone}</h6>
          </div>
          <div className={css(styles.detail)}>
            <h6 className={css(styles.title)}>City</h6>
            <h6 className={css(styles.info)}>{currentCompany.city}</h6>
          </div>
          <div className={css(styles.detail)}>
            <h6 className={css(styles.title)}>State/Region</h6>
            <h6 className={css(styles.info)}>{currentCompany.state_region}</h6>
          </div>
          <div className={css(styles.detail)}>
            <h6 className={css(styles.title)}>Postal Code</h6>
            <h6 className={css(styles.info)}>{currentCompany.postalCode}</h6>
          </div>
          <hr />
          <h6 className={css(styles.heading)}>Deals</h6>
        </div>
      </div>

      {/* <Modal show={props.show} onHide={props.handleClose} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className={css(styles.companyTitle)}>
              <img
                src={currentCompany.logo}
                className={css(styles.img)}
                alt="companyLogo"
              />
              {currentCompany.companyName}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={css(styles.companyDetails)}>
            <h6 className={css(styles.heading)}>About this company</h6>
            <div className={css(styles.detail)}>
              <h6 className={css(styles.title)}>Industry</h6>
              <h6 className={css(styles.info)}>{currentCompany.industry}</h6>
            </div>
            <div className={css(styles.detail)}>
              <h6 className={css(styles.title)}>Company Owner</h6>
              <h6 className={css(styles.info)}>{currentCompany.owner}</h6>
            </div>
            <div className={css(styles.detail)}>
              <h6 className={css(styles.title)}>Phone</h6>
              <h6 className={css(styles.info)}>{currentCompany.phone}</h6>
            </div>
            <div className={css(styles.detail)}>
              <h6 className={css(styles.title)}>City</h6>
              <h6 className={css(styles.info)}>{currentCompany.city}</h6>
            </div>
            <div className={css(styles.detail)}>
              <h6 className={css(styles.title)}>State/Region</h6>
              <h6 className={css(styles.info)}>
                {currentCompany.state_region}
              </h6>
            </div>
            <div className={css(styles.detail)}>
              <h6 className={css(styles.title)}>Postal Code</h6>
              <h6 className={css(styles.info)}>{currentCompany.postalCode}</h6>
            </div>
            <hr />
            <h6 className={css(styles.heading)}>Deals</h6>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Edit</Button>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    fontSize: "18px",
    color: "#193753",
  },
  companyDetails: {
    fontFamily: "Quicksand",
  },
  companyTitle: {
    fontFamily: "Quicksand",
    fontWeight: "bold",
  },
  detail: {
    paddingTop: "15px",
  },
  title: {
    color: "rgb(202, 203, 207)",
    fontWeight: "bold",
    fontSize: "14px",
  },
  info: {
    fontSize: "18px",
  },
  img: {
    width: "30px",
    paddingRight: "5px",
  },
});
