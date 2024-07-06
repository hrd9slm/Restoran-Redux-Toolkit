import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  fetchArticles,
  deleteArticle,
  updateArticle,
} from "../redux/articlesSlice";
import { setPage } from "../redux/paginationSlice";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ListeArticles({ category }) {
  const dispatch = useDispatch();
  const { articles, status } = useSelector((state) => state.articles);
  const categories = useSelector((state) => state.categories.categories);
  const { currentPage, itemsPerPage } = useSelector(
    (state) => state.pagination
  );
  const query = useQuery();
  const keyword = query.get("keyword");

  const [show, setShow] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchArticles());
    }
  }, [status, dispatch]);

  const handleClose = () => setShow(false);
  const handleShow = (article) => {
    setSelectedArticle(article);
    setShow(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedArticle = {
      id: selectedArticle.id,
      title: e.target.title.value,
      description: e.target.description.value,
      image: selectedArticle.image,
      category: e.target.category.value,
    };

    dispatch(
      updateArticle({ id: selectedArticle.id, updatedArticle, imageFile })
    );
    setShow(false);
  };

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = category ? article.category === category : true;
    const matchesKeyword = keyword
      ? article.title.toLowerCase().includes(keyword.toLowerCase()) ||
        article.description.toLowerCase().includes(keyword.toLowerCase())
      : true;
    return matchesCategory && matchesKeyword;
  });

  // Calculate the articles to display on the current page
  const indexOfLastArticle = currentPage * itemsPerPage;
  const indexOfFirstArticle = indexOfLastArticle - itemsPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  return (
    <>
      <Row className="mb-3">
        {currentArticles.map((article) => (
          <Col key={article.id} md={4} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={article.image}
                className="card-img-top"
                style={{ objectFit: "cover", height: "200px" }}
              />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Link to={`/article/${article.id}`} className="card-link">
                  +View
                </Link>
                <Card.Link href="#" onClick={() => handleShow(article)}>
                  Update
                </Card.Link>
                <Card.Link
                  href="#"
                  onClick={() => dispatch(deleteArticle(article.id))}
                >
                  Delete
                </Card.Link>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* pgination */}
      <Row>
        <Col>
          <nav>
            <ul className="pagination justify-content-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => dispatch(setPage(index + 1))}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedArticle && (
            <Form onSubmit={handleUpdate}>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedArticle.title}
                  name="title"
                />
              </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  defaultValue={selectedArticle.description}
                  name="description"
                />
              </Form.Group>

              <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </Form.Group>

              <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={selectedArticle.category}
                  name="category"
                >
                  {categories.map((cat, index) => (
                    <option key={index} value={cat.title}>
                      {cat.title}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Update Article
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ListeArticles;
