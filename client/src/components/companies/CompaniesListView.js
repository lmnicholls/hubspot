import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import { useHistory } from "react-router-dom";
import "./companies.css";
import spinner from "../../images/Spinner.gif";

export default function CompaniesListView() {
  const companies = useSelector((state) => state.companies);
  const history = useHistory();

  const handleCompanyClick = (company) => {
    history.push(`/companies/${company._id}`);
  };

  if (companies.length === 0) {
    return (
      <div className={css(styles.loadingText)}>
        <img src={spinner} className={css(styles.spinner)} alt="spinner" />
        Loading Companies...
      </div>
    );
  }

  return (
    <>
      <Table responsive hover className={css(styles.companyTable)}>
        <thead className={css(styles.thead)}>
          <tr>
            <th>
              <span>
                <input type="checkbox" name="" value="" />
              </span>
            </th>
            <th>NAME</th>
            <th>COMPANY OWNER</th>
            <th>CREATE DATE</th>
            <th>LAST ACTIVITY DATE</th>
            <th>PHONE NUMBER</th>
            <th>CITY</th>
            <th>COUNTRY/REGION</th>
            <th>INDUSTRY</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => {
            return (
              <tr
                key={company._id}
                className={css(styles.companyRow)}
                onClick={() => handleCompanyClick(company)}
              >
                <td>
                  <span>
                    <input type="checkbox" name="something" value="" />
                  </span>
                </td>
                <td>
                  {company.logo === "" ? (
                    <span></span>
                  ) : (
                    <img
                      src={company.logo}
                      className={css(styles.companyListImg)}
                      alt="logo"
                    ></img>
                  )}
                  {company.companyName}
                </td>
                <td>{company.owner}</td>
                <td>{new Date(company.dateCreated).toDateString()}</td>
                <td>{new Date(company.lastActivityDate).toDateString()}</td>
                <td>{company.phone}</td>
                <td>{company.city}</td>
                <td>{company.state_region}</td>
                <td>{company.industry}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

const styles = StyleSheet.create({
  companyTable: {
    fontFamily: "Quicksand !important",
  },
  companyRow: {
    ":hover": {
      cursor: "pointer",
    },
  },
  companyListImg: {
    width: 20,
    paddingRight: 5,
  },
  thead: {
    backgroundColor: "rgb(220, 220, 224)",
  },
  heading: {
    fontWeight: "bold",
    fontSize: "18px",
    color: "#193753",
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
});
