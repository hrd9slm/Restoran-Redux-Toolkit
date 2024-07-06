import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../redux/articlesSlice";

function ArticleDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const article = articles.find((article) => article.id === id);

  useEffect(() => {
    if (articles.length === 0) {
      dispatch(fetchArticles());
    }
  }, [dispatch, articles.length]);

  if (!article) {
    return <p>Aucun article trouvé pour l'ID {id}</p>;
  }

  return (
    <Container className="mt-5 p-4 rounded bg-light d-flex justify-content-center">
      <Card style={{ objectFit: "cover", width: "750px" }}>
        <Card.Img variant="top" src={article.image} />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{article.state}</small>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default ArticleDetails;
