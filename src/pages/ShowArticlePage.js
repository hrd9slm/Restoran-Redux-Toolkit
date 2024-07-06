import React from "react";

import { Container } from "react-bootstrap";

import ListeArticles from "../component/ListAricles";

function ShowArticlePage() {
  return (
    <>
      <Container className="m-4 mx-auto">
        <ListeArticles />
      </Container>
    </>
  );
}

export default ShowArticlePage;
