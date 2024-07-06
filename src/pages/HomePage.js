import React from "react";

import LastArticle from "../component/LastArticle";
import Categories from "../component/Categories";
import ListCategories from "../component/ListCategories";

function HomePage() {
  return (
    <>
      <LastArticle />
      <ListCategories />
      <Categories />
    </>
  );
}

export default HomePage;
