import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";
import { useHistory } from "react-router-dom";
import "./companies.css";
import spinner from "../../images/Spinner.gif";
import Pagination from "./Pagination";
import { getCompanies } from "../../actions";

export default function CompaniesListView() {
  const companies = useSelector((state) => state.companies.companies);
  const [sortType, setSortType] = useState("companyName");
  const [page, setPage] = useState(1);

  const history = useHistory();

  const handleCompanyClick = (company) => {
    history.push(`/companies/${company._id}`);
  };

  const dispatch = useDispatch();

  const formatter = (value) => {
    if (value)
      return value
        .split(" ")
        .map((word) => {
          return word[0].toUpperCase() + word.substring(1);
        })
        .join(" ");
  };

  useEffect(() => {
    dispatch(getCompanies(page, sortType));
  }, [dispatch, page, sortType]);

  if (!companies) {
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
              NAME{" "}
              <Button
                type="button"
                value="companyName"
                onClick={(e) => setSortType(e.target.value)}
                className={css(styles.sortButton)}
              >
                ⇅
              </Button>
            </th>
            <th>
              COMPANY OWNER{" "}
              <Button
                type="button"
                value="owner"
                onClick={(e) => setSortType(e.target.value)}
                className={css(styles.sortButton)}
              >
                ⇅
              </Button>
            </th>
            <th>
              CREATE DATE{" "}
              <Button
                type="button"
                value="dateCreated"
                onClick={(e) => setSortType(e.target.value)}
                className={css(styles.sortButton)}
              >
                ⇅
              </Button>
            </th>
            <th>
              LAST ACTIVITY DATE{" "}
              <Button
                type="button"
                value="lastActivityDate"
                onClick={(e) => setSortType(e.target.value)}
                className={css(styles.sortButton)}
              >
                ⇅
              </Button>
            </th>
            <th>PHONE NUMBER</th>
            <th>
              CITY{" "}
              <Button
                type="button"
                value="city"
                onClick={(e) => setSortType(e.target.value)}
                className={css(styles.sortButton)}
              >
                ⇅
              </Button>
            </th>
            <th>
              COUNTRY/REGION{" "}
              <Button
                type="button"
                value="state_region"
                onClick={(e) => setSortType(e.target.value)}
                className={css(styles.sortButton)}
              >
                ⇅
              </Button>
            </th>
            <th>
              INDUSTRY{" "}
              <Button
                type="button"
                value="industry"
                onClick={(e) => setSortType(e.target.value)}
                className={css(styles.sortButton)}
              >
                ⇅
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {companies?.map((company) => {
            return (
              <tr
                key={company._id}
                className={css(styles.companyRow)}
                onClick={() => handleCompanyClick(company)}
              >
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
                  {formatter(company.companyName)}
                </td>
                <td>{formatter(company.owner)}</td>
                <td>{new Date(company.dateCreated).toDateString()}</td>
                <td>{new Date(company.lastActivityDate).toDateString()}</td>
                <td>{company.phone}</td>
                <td>{formatter(company.city)}</td>
                <td>{formatter(company.state_region)}</td>
                <td>{formatter(company.industry)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination page={page} setPage={setPage} />
    </>
  );
}

const styles = StyleSheet.create({
  companyTable: {
    fontFamily: "Quicksand !important",
    marginBottom: "50px",
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
  sortButton: {
    padding: "0px",
    border: "none",
    backgroundColor: "rgb(220, 220, 224)",
    color: "black",
    pointer: "cursor",
  },
});
