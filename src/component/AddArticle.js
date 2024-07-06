import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { addArticle } from "../redux/articlesSlice";

function AddArticle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.categories);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState(categories[0]?.title || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newArticle = { title, description, image, category };
    dispatch(addArticle(newArticle));

    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <Container className="mb-3">
      <h2>Ajouter un nouvel article</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formImage" className="mt-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            placeholder="Upload image"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCategory" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3 mb-5">
          Add Article
        </Button>
      </Form>
    </Container>
  );
}

export default AddArticle;
