import React from "react";
import { useSelector } from "react-redux";
import { Pagination } from "react-bootstrap";

export default function PageNavigation({ page, setPage }) {
  const numOfCompanies = useSelector((state) => state.companies.count);
  const numOfPages = Math.ceil(numOfCompanies / 5);

  //Pagination
  let items = [];

  for (let number = 1; number <= numOfPages; number++) {
    items.push(
      <Pagination.Item
        onClick={() => handleClick(number)}
        key={number}
        active={number === page}
      >
        {number}
      </Pagination.Item>
    );
  }

  const handleClick = (pageNumber) => {
    page = pageNumber;
    setPage(pageNumber);
  };

  return (
    <Pagination className={"justify-content-center"} size="sm">
      {items}
    </Pagination>
  );
}
