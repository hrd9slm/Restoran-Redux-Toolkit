import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

function Navigation() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    navigate(`/articles?keyword=${e.target.value}`);
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="mb-4">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Restoran
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link
              to="/"
              className="nav-link"
              onClick={() => setSearchKeyword("")}
            >
              Home
            </Link>
            <Link
              to="/apropos"
              className="nav-link"
              onClick={() => setSearchKeyword("")}
            >
              Apropos
            </Link>
            <Link
              to="/articles"
              className="nav-link"
              onClick={() => setSearchKeyword("")}
            >
              Articles
            </Link>
            <Link
              to="/add-article"
              className="nav-link"
              onClick={() => setSearchKeyword("")}
            >
              Add Article
            </Link>
          </Nav>

          <Nav className="ms-auto">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchKeyword}
                onChange={handleSearchChange}
              />
            </Form>
            <Link to="/login" className="nav-link">
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
