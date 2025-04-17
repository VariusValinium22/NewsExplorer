// src/components/Footer/Footer.jsx
import "./Footer.css";
import GitHubImage from "../../assets/github-icon.svg";
import FacebookImage from "../../assets/Facebook-icon.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">©{new Date().getFullYear()} Supersite, Powered by News API</p>
      <div className="footer__links">
        <a href="/" className="footer__link">Home</a>
        <a
          href="https://tripleten.com/"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
        >
          TripleTen
        </a>
        
        <a
          href="https://github.com/VariusValinium22/NewsExplorer"
          target="_blank"
          rel="noreferrer"
        >
        <img 
        src={GitHubImage} 
        alt="GitHub icon" 
        className="icon__image" 
        />
        </a>
        <a
          href="https://www.facebook.com/share/1APAmGJQoW/"
          target="_blank"
          rel="noreferrer"
        >
        <img 
        src={FacebookImage} 
        alt="facebook icon" 
        className="icon__image" 
        />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
