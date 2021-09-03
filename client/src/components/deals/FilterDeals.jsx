import React, { useState, useEffect } from "react";
import { Form, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getDeals } from "../../actions";
import { StyleSheet, css } from "aphrodite";

export default function FilterDealsByCompany() {
  const companyList = useSelector((state) => state.companies?.companyList);
  const companyListNames = companyList?.map((company) => company.companyName);
  const companyIds = companyList?.map((company) => company._id);

  const [companyId, setCompanyId] = useState("");
  const [priceRange, setPriceRange] = useState(null);

  let companyKey = 0;
  let PriceKey = 0;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDeals(companyId, priceRange));
  }, [companyId, priceRange, dispatch]);

  return (
    <>
      <Col className={css(styles.colCtn)} md={{ span: 4, offset: 1 }}>
        <Form className={css(styles.formCtn)}>
          <Form.Group
            className={css(styles.filterByCompany)}
            controlId="formCompanyName"
          >
            <Form.Label>Filter Deals By Company</Form.Label>
            <Form.Select
              id="inlineFormCustomSelect"
              onChange={(e) => setCompanyId(e.target.value)}
              required
            >
              <option value="">Show All Deals</option>
              {companyListNames?.map((name, idx) => (
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
            <Form.Label>Filter Deals By Price</Form.Label>
            <Form.Select
              id="inlineFormCustomSelect"
              onChange={(e) => setPriceRange(e.target.value)}
              required
            >
              <option value={""}>Show All Prices</option>
              <option key={PriceKey++} value="0,100000">
                $100,000 or less
              </option>
              <option key={PriceKey++} value="100001,200000">
                $100,001 - $200,000
              </option>
              <option key={PriceKey++} value="200001,2000000000">
                more than $200,000
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
    minWidth: "220px",
  },
  filterByPrice: {
    minWidth: "200px",
  },
  colCtn: {
    paddingLeft: 0,
  },
  formCtn: {
    display: "flex",
    flexFlow: "row",
  },
});
