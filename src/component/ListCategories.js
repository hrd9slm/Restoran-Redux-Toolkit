import React from "react";
import { Row } from "react-bootstrap";
import Category from "./Category";
import { useSelector } from "react-redux";

function ListCategories() {
  const categories = useSelector((state) => state.categories.categories);

  return (
    <div>
      <Row className="m-4">
        {categories.map((category) => (
          <Category key={category.id} category={category} />
        ))}
      </Row>
    </div>
  );
}

export default ListCategories;
