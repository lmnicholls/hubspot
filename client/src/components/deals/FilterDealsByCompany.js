import React from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getDeals } from "../../actions";

export default function FilterDealsByCompany() {
  const companies = useSelector((state) => state.companies);
  const companyNames = companies?.map((company) => company.companyName);

  let companyKey = 0;

  const dispatch = useDispatch();

  const handleSelect = (e) => {
    console.log(e.target.value);
    dispatch(getDeals(e.target.value));
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={{ span: 3, offset: 1 }}>
            <Form onChange={(e) => handleSelect(e)}>
              <Form.Group className="mb-3" controlId="formCompanyName">
                <Form.Label>Filter Deals By Company</Form.Label>
                <Form.Select id="inlineFormCustomSelect" required>
                  <option value="">Choose A Company...</option>
                  {companyNames?.map((name) => (
                    <option key={companyKey++} value={name}>
                      {name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
