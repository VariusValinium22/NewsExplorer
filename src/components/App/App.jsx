import "./App.css";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useState, useEffect, act } from "react";
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
  const { activeModal, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    /* setCurrentUser({ name: "Martin", email: "Martin@example.com" });*/
    setCurrentUser(null);
    setIsLoggedIn(false);
  }, []);

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    const q = query.toLowerCase();
    // Add setTimeout: Add preloader for filtering data
    setIsLoading(true);
    setTimeout(() => {
    //  
    const filtered = mockArticles.filter((article) => {
      return (
        article.title.toLowerCase().includes(q) ||
        article.text.toLowerCase().includes(q) ||
        article.source.toLowerCase().includes(q)
      );
    });
    setSearchResults(filtered);
    setHasSearched(true);
    // END Timeout: Hide preloader after filtering data
    setIsLoading(false);
  }, 2000);
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
    // Simulate Login
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
    // Simulate Registration/Login
    // localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };
  
  const handleSaveArticle = (article) => {
    if (!currentUser) {
      console.log("Not logged in. Save blocked.");
    return;
    }
    const alreadySaved = savedArticles.some((a) => a.title === article.title);
    if (alreadySaved) return;
    setSavedArticles([...savedArticles, article]);
  };

  const handleDeleteArticle = (articleToDelete) => {
    setSavedArticles((prev) =>
      prev.filter((article) => article.title !== articleToDelete.title)
    );
  };

  useEffect(() => {
    if (!activeModal) return;
  
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
  
    const handleOverlayClick = (e) => {
      if (e.target.classList.contains("modal")) {
        closeModal();
      }
    };
  
    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlayClick);
  
    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, [activeModal, closeModal]);

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
                    <Header isDark={false} onSearch={handleSearch} onLogout={handleLogout} activeModal={activeModal}/>
                    <Hero onSearch={handleSearch} isLoading={isLoading}/>
                  </div>
                  <Main
                    articles={searchResults}
                    hasSearched={hasSearched}
                    onSaveArticle={handleSaveArticle}
                    savedArticles={savedArticles}
                    isSavedPage={false}
                    isLoading={isLoading}
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
                  <Header isDark={true} onLogout={handleLogout} activeModal={activeModal} />
                  <Main
                    articles={savedArticles}
                    onDeleteArticle={handleDeleteArticle}
                    isSavedPage={true}
                    isLoading={isLoading}
                  />
                  <About />
                  <Footer />
                </>
              }
            />
          </Routes>
          <LoginModal
            onLogin={handleLogin}
            isLoading={isLoading}
          />
          <RegisterModal
            onRegister={handleRegister}
            isLoading={isLoading}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
