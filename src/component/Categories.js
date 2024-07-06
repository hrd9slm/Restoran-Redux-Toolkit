import React, { useEffect } from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/categoriesSlice";
import ListeArticles from "./ListAricles";

function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  return (
    <section className="m-5">
      <Tab.Container
        id="list-group-tabs-example"
        defaultActiveKey={
          categories.length ? `#${categories[0].title}` : "#Breakfast"
        }
      >
        <Row>
          <Col sm={4}>
            <ListGroup>
              {categories.map((category) => (
                <ListGroup.Item
                  action
                  href={`#${category.title}`}
                  key={category.id}
                >
                  {category.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              {categories.map((category) => (
                <Tab.Pane eventKey={`#${category.title}`} key={category.id}>
                  <ListeArticles category={category.title} />
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </section>
  );
}

export default Categories;
