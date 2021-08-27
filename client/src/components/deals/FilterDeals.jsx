import React, { useState, useEffect } from "react";
import { Form, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getDeals } from "../../actions";
import { StyleSheet, css } from "aphrodite";
import moment from "moment";

export default function FilterDealsByCompany() {
  const companies = useSelector((state) => state.companies);
  const companyNames = companies?.map((company) => company.companyName);
  const companyIds = companies?.map((company) => company._id);

  const [companyId, setCompanyId] = useState("");
  const [priceRange, setPriceRange] = useState(null);
  const [dateFilter, setDateFilter] = useState("");

  // find current month
  console.log(moment(new Date(), "M").format("MMMM"));
  // find current day
  console.log(moment(new Date(), "d").format("dddd"));
  // find current year
  console.log(moment(new Date(), "Y").format("YYYY"));

  let companyKey = 0;
  let priceKey = 0;
  let dateKey = 0;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDeals(companyId, priceRange, dateFilter));
  }, [companyId, priceRange, dateFilter, dispatch]);

  return (
    <>
      <Col className={css(styles.colCtn)} md={{ span: 4, offset: 1 }}>
        <Form className={css(styles.formCtn)}>
          <Form.Group
            className={css(styles.filterByCompany)}
            controlId="formCompanyName"
          >
            <Form.Label>Filter By Company</Form.Label>
            <Form.Select
              id="inlineFormCustomSelect"
              onChange={(e) => setCompanyId(e.target.value)}
              required
            >
              <option value="">Show All Companies</option>
              {companyNames?.map((name, idx) => (
                <option key={companyKey++} value={companyIds[idx]}>
                  {name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group
            className={css(styles.filterByPrice)}
            controlId="formPriceRange"
          >
            <Form.Label>Filter By Price</Form.Label>
            <Form.Select
              id="inlineFormCustomSelect"
              onChange={(e) => setPriceRange(e.target.value)}
              required
            >
              <option value={""}>Show All Prices</option>
              <option key={priceKey++} value="0,100000">
                $100,000 or less
              </option>
              <option key={priceKey++} value="100001,200000">
                $100,000 - $200,000
              </option>
              <option key={priceKey++} value="200001,2000000000">
                more than $200,000
              </option>
            </Form.Select>
          </Form.Group>
          <Form.Group
            className={css(styles.filterByPrice)}
            controlId="formPriceRange"
          >
            <Form.Label>Filter By Last Activity Date</Form.Label>
            <Form.Select
              id="inlineFormCustomSelect"
              onChange={(e) => setDateFilter(e.target.value)}
              required
            >
              <option value={""}>Show All Dates</option>
              <option key={dateKey++} value="day">
                Today
              </option>
              <option key={dateKey++} value="month">
                This month
              </option>
              <option key={dateKey++} value="year">
                This year
              </option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Col>
    </>
  );
}

const styles = StyleSheet.create({
  filterByCompany: {
    paddingRight: "30px",
  },
  filterByPrice: {
    paddingRight: "30px",
  },
  colCtn: {
    paddingLeft: 0,
  },
  formCtn: {
    display: "flex",
    flexFlow: "row",
    width: "85vw",
  },
});
