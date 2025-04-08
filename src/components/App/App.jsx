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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

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
                  <Main articles={searchResults} hasSearched={hasSearched} />

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
                  <Main articles={mockArticles} />
                  {/* <Main articles={ savedAritcles } /> */}
                  <About />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
