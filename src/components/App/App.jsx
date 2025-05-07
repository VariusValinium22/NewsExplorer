import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Hero from '../Hero/Hero.jsx';
import Main from '../Main/Main.jsx';
import About from '../About/About.jsx';
import Footer from '../Footer/Footer.jsx';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import { useModal } from '../../contexts/ModalContext.jsx';

import LoginModal from '../../Modals/LoginModal.jsx';
import RegisterModal from '../../Modals/RegisterModal.jsx';
import fetchNewsArticles from '../../utils/newsApi';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { activeModal, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    /* setCurrentUser({ name: "Martin", email: "Martin@example.com" }); */
    setCurrentUser(null);
    setIsLoggedIn(false);
  }, []);

  const handleSearch = (q) => {
    setIsLoading(true);
    fetchNewsArticles(q)
      .then((data) => {
        setSearchResults(data.articles);
        setHasSearched(true);
      })
      .catch((err) => {
        console.error('Error fetching news articles:', err);
        setSearchResults([]);
        setHasSearched(true);
      })
      .finally(() => setIsLoading(false));
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
    setIsLoggedIn(true);
    setCurrentUser({ email, name: userName });
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
    setIsLoggedIn(true);
    setCurrentUser({ name: userName, email });
    setIsLoading(false);
    closeModal();
  };

  const handleLogout = () => {
    // Simulate Registration/Login
    // localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate('/');
  };

  const handleSaveArticle = (article) => {
    if (!currentUser) {
      return;
    }
    const alreadySaved = savedArticles.some((a) => a.title === article.title);
    if (alreadySaved) return;
    setSavedArticles([...savedArticles, { ...article, keyword: query }]);
  };

  const handleDeleteArticle = (articleToDelete) => {
    setSavedArticles((prev) => prev.filter((article) => article.title !== articleToDelete.title));
  };

  useEffect(() => {
    if (!activeModal) return undefined;

    const handleEscClose = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    const handleOverlayClick = (e) => {
      if (e.target.classList.contains('modal')) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('mousedown', handleOverlayClick);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('mousedown', handleOverlayClick);
    };
  }, [activeModal, closeModal]);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn,
      }}
    >
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="hero__section-wrapper">
                    <Header
                      isDark={false}
                      onSearch={handleSearch}
                      onLogout={handleLogout}
                      activeModal={activeModal}
                    />
                    <Hero
                      onSearch={handleSearch}
                      isLoading={isLoading}
                      query={query}
                      setQuery={setQuery}
                    />
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
                  <Header
                    isDark={true}
                    onLogout={handleLogout}
                    activeModal={activeModal}
                  />
                  <Main
                    articles={savedArticles}
                    onDeleteArticle={handleDeleteArticle}
                    isSavedPage={true}
                    isLoading={isLoading}
                  />
                  <Footer />
                </>
              }
            />
          </Routes>
          <LoginModal onLogin={handleLogin} isLoading={isLoading} />
          <RegisterModal onRegister={handleRegister} isLoading={isLoading} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
