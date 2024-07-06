import React from "react";

import Container from "react-bootstrap/Container";
import AddArticle from "../component/AddArticle";

function AddArticlePage() {
  return (
    <>
      <Container className="mt-5">
        <AddArticle />
      </Container>
    </>
  );
}

export default AddArticlePage;
