import { useEffect } from "react";
import tmdbLogo from "../assets/tmdb-logo.svg";
import { NavLink } from "react-router-dom";
import aboutBG from "../assets/about-background.jpg";
import popcorn from "../assets/popcorn.jpg";
import { appTitle } from "../utils/global";

function About() {
  // Meta
  useEffect(() => {
  if (appTitle) {
    document.title = `About - ${appTitle}`;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content =
      "Discover the world of movies with Movie Cache. Explore blockbusters hidden gems classics and build your personal must watch list.";

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = "canonical";
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = `https://movie-cache.vincefontabla.com/about`;
  }
}, []);

  return (
    <main className="about-page">
      <section className="about">
        <div className="about-banner">
          <div className="about-image">
            <div className="about-image-overlay"></div>
            <div className="about-backdrop-overlay"></div>
            <img src={popcorn} alt="Popcorn" className="popcorn" />
          </div>
          <div className="about-content">
            <h1 className="about-title">About</h1>
            <p>Your ultimate destination for exploring the world of movies!</p>
            <p>
              Discover the latest blockbusters, hidden gems, and timeless
              classics, all in one place. Browse through categories, find
              detailed info on your favorite films, and build your personal list
              of must-watch favorites. Whether you're a casual viewer or a
              die-hard film buff, there's something here for everyone.
            </p>
            <p>Start exploring now and let the magic of cinema unfold!</p>
            <div className="home-button">
              <NavLink to="/">Home</NavLink>
            </div>
          </div>
        </div>
        <div className="tmdb-disclaimer">
          <img src={tmdbLogo} alt="TMDB Logo" className="tmdb-logo" />
          <p>
            This product uses the TMDb API but is not endorsed or certified by TMDb.
          </p>
        </div>
      </section>
      <div className="about-background">
        <div className="about-background-overlay"></div>
        <div className="about-background-backdrop"></div>
        <img
          src={aboutBG}
          alt="About Background"
          className="about-background-image"
        />
      </div>
    </main>
  );
}

export default About;
