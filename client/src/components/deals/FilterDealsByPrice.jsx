import React from "react";
import { Form, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getDeals } from "../../actions";
import { StyleSheet, css } from "aphrodite";

export default function FilterDealsByPrice() {
  let PriceKey = 0;

  const dispatch = useDispatch();

  const handleSelect = (e) => {
    console.log(e.target.value);
    dispatch(getDeals(e.target.value));
  };

  return (
    <>
      <Col className={css(styles.colCtn)} md={{ span: 3 }}>
        <Form onChange={(e) => handleSelect(e)}>
          <Form.Group
            className={css(styles.filterByPrice)}
            controlId="formPriceRange"
          >
            <Form.Label>Filter Deals By Price</Form.Label>
            <Form.Select id="inlineFormCustomSelect" required>
              <option value="">Show All Prices</option>
              <option key={PriceKey++} value={[0, 100000]}>
                $100,000 or less
              </option>
              <option key={PriceKey++} value={[100001, 200000]}>
                $100,000 - $200,000
              </option>
              <option key={PriceKey++} value={[200001, 2000000000]}>
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
  filterByPrice: {
    fontFamily: "Quicksand",
    fontWeight: "bold",
  },
  colCtn: {
    paddingLeft: 0,
  },
});
