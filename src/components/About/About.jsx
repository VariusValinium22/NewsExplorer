import "./About.css";
import authorImage from "../../assets/ProMe2.png";

function About() {
  return (
    <section className="about">
      <img src={authorImage} alt="Author" className="about__image" />
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          My name is Martin Young and I built this NewsExplorer application. I am a Software Developer with experience in MERN stack and also in C#/.NET.
        </p>
        <p className="about__text">
          I can help potential customers add value to their team with my past debugging talents and building their products.
        </p>
      </div>
    </section>
  );
}

export default About;
