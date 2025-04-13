import "./App.css";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { mockArticles } from "../../utils/constants";
import { useModal } from "../../contexts/ModalContext";
import LoginModal from "../../Modals/LoginModal";
import RegisterModal from "../../Modals/RegisterModal";
import { register, login, checkToken } from "../../utils/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { activeModal, closeModal, openModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    setCurrentUser({ name: "Martin", email: "Martin@example.com" });
    setIsLoggedIn(true);
  }, []);

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    const q = query.toLowerCase();
    const filtered = mockArticles.filter((article) => {
      return (
        article.title.toLowerCase().includes(q) ||
        article.text.toLowerCase().includes(q) ||
        article.source.toLowerCase().includes(q)
      );
    });

    setSearchResults(filtered);
    setHasSearched(true);
  };

  const handleLogin = (email, password, userName) => {
    setIsLoading(true);
    return login(email, password, userName)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        closeActiveModal();
        return Promise.resolve();
      })
      .catch((error) => {
        return Promise.reject(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegister = (email, password, userName) => {
    setIsLoading(true);
    return register(email, password, userName)
      .then(() => handleLogin(email, password))
      .then(() => closeActiveModal())
      .catch((error) => {
        console.error("Registration failed: ", error);
        return Promise.reject(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSaveArticle = (article) => {
    const alreadySaved = savedArticles.some((a) => a.title === article.title);
    if (alreadySaved) return;

    setSavedArticles([...savedArticles, article]);
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}
    >
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header onSearch={handleSearch} />
                  <Hero onSearch={handleSearch} />
                  <Main
                    articles={searchResults}
                    hasSearched={hasSearched}
                    onSaveArticle={handleSaveArticle}
                  />
                  <About />
                  <Footer />
                </>
              }
            />
            <Route
              path="/saved-news"
              element={
                <>
                  <Header />
                  <Main articles={savedArticles} />
                  <About />
                </>
              }
            />
          </Routes>
          <LoginModal
            isOpen={activeModal === "login"}
            closeActiveModal={closeModal}
            setActiveModal={openModal}
            onLogin={handleLogin}
            isLoading={isLoading}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            closeActiveModal={closeModal}
            setActiveModal={openModal}
            onRegister={handleRegister}
            isLoading={isLoading}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
