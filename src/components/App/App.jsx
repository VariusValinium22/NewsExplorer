import "./App.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route path="/" element={<Header />}/>
            <Route path="/" element={<Navigation />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
