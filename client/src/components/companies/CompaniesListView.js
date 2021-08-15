import React from "react";
import { Table } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";
import "./companies.css";
import { getCompanies } from "../../actions";

export default function CompaniesListView() {
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
              <tr key={company._id}>
                <td>
                  <span>
                    <input type="checkbox" name="something" value="" />
                  </span>
                </td>
                <td>
                  <img
                    src={company.logo}
                    className={css(styles.img)}
                    alt="logo"
                  ></img>
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
  img: {
    width: 20,
    paddingRight: 5,
  },
  thead: {
    backgroundColor: "rgb(220, 220, 224)",
  },
});
