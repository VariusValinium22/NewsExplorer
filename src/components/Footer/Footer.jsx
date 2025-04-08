// src/components/Footer/Footer.jsx
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">© 2025 Supersite, Powered by News API</p>
      <div className="footer__links">
        <a
          href="https://tripleten.com/"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
        >
          TripleTen
        </a>
        <a
          href="https://github.com/yourusername"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}

export default Footer;
