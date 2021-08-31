import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCompanies } from "../../actions";
import { Pagination } from "react-bootstrap";

export default function PageNavigation() {
  const numOfCompanies = useSelector((state) => state.companies.count);
  const numOfPages = Math.ceil(numOfCompanies / 5);
  const dispatch = useDispatch();
  let queryString = `?page=1`;

  //Pagination
  let [activePage, setActivePage] = useState(1);
  let items = [];

  for (let number = 1; number <= numOfPages; number++) {
    items.push(
      <Pagination.Item
        onClick={() => handleClick(number)}
        key={number}
        active={number === activePage}
      >
        {number}
      </Pagination.Item>
    );
  }

  const handleClick = (pageNumber) => {
    queryString = `?page=${pageNumber}`;
    setActivePage(pageNumber);
    dispatch(getCompanies(queryString));
  };

  return (
    <Pagination className={"justify-content-center"} size="sm">
      {items}
    </Pagination>
  );
}
