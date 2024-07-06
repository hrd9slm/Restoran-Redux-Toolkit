import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AproposPage from "./pages/AproposPage";
import ShowArticlePage from "./pages/ShowArticlePage";
import AddArticlePage from "./pages/AddArticlePage";
import ArticleDetails from "./component/ArticleDetalis";
import ListeArticles from "./component/ListAricles";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Navigation from "./component/Navigation";
import Footer from "./component/Footer";
import Login from "./component/Login";

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/apropos" element={<AproposPage />} />
            <Route path="/articles" element={<ShowArticlePage />} />
            <Route path="/add-article" element={<AddArticlePage />} />
            <Route path="/article/:id" element={<ArticleDetails />} />
            <Route path="/articles/:category" element={<GetArticles />} />
            <Route path="/articles/:category" element={<GetArticles />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <ToastContainer />
        </Provider>
        <Footer />
      </Router>
    </>
  );
}

function GetArticles() {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  return <ListeArticles category={category} />;
}

export default App;
