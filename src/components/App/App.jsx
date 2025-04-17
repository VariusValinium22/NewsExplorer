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
import { useNavigate } from "react-router-dom";

import LoginModal from "../../Modals/LoginModal";
import RegisterModal from "../../Modals/RegisterModal";
import { register, login, checkToken } from "../../utils/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Only need closeModal for closing the handleLogin and handleRegister functions
  /* const { activeModal, closeModal, openModal } = useModal(); */
  const { closeModal } = useModal();

  const [isLoading, setIsLoading] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    setCurrentUser({ name: "Martin", email: "Martin@example.com" });
    setIsLoggedIn(false);
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
    // Uncomment to set up with API
    /* return login(email, password, userName)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        closeModal();
        return Promise.resolve();
      })
      .catch((error) => {
        return Promise.reject(error);
      })
      .finally(() => {
        setIsLoading(false);
      }); */
    // Simulate Registration
    console.log({ email, password, userName });
    setIsLoggedIn(true);
    setCurrentUser({ email: email, name: userName });
    setIsLoading(false);
    closeModal();
  };

  const handleRegister = (email, password, userName) => {
    setIsLoading(true);
    // Uncomment to set up with API
    /* return register(email, password, userName)
      .then(() => handleLogin(email, password))
      .then(() => closeModal())
      .catch((error) => {
        console.error("Registration failed: ", error);
        return Promise.reject(error);
      })
      .finally(() => {
        setIsLoading(false);
      }); */

    // Simulate Registration
    console.log({ email, password, userName });
    setIsLoggedIn(true);
    setCurrentUser({ name: userName, email: email });
    setIsLoading(false);
    closeModal();
  };

  const handleLogout = () => {
    // If using real auth later:
    // localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };
  
  const handleSaveArticle = (article) => {
    const alreadySaved = savedArticles.some((a) => a.title === article.title);
    if (alreadySaved) return;

    setSavedArticles([...savedArticles, article]);
  };

  const handleDeleteArticle = (articleToDelete) => {
    setSavedArticles((prev) =>
      prev.filter((article) => article.title !== articleToDelete.title)
    );
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
                  <div className="hero-section-wrapper">
                    <Header isDark={false} onSearch={handleSearch} onLogout={handleLogout} />
                    <Hero onSearch={handleSearch} />
                  </div>
                  <Main
                    articles={searchResults}
                    hasSearched={hasSearched}
                    onSaveArticle={handleSaveArticle}
                    savedArticles={savedArticles}
                    isSavedPage={false}
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
                  <Header isDark={true} onLogout={handleLogout} />
                  <Main
                    articles={savedArticles}
                    onDeleteArticle={handleDeleteArticle}
                    isSavedPage={true}
                  />
                  <About />
                  <Footer />
                </>
              }
            />
          </Routes>
          <LoginModal
            // deleted because we are using useModal() from ModalContext
            /*   isOpen={activeModal === "login"}
            closeModal={closeModal}
            setActiveModal={openModal} */
            onLogin={handleLogin}
            isLoading={isLoading}
          />
          <RegisterModal
            // deleted because we are using useModal() from ModalContext
            /* isOpen={activeModal === "register"}
            closeModal={closeModal}
            setActiveModal={openModal} */
            onRegister={handleRegister}
            isLoading={isLoading}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
