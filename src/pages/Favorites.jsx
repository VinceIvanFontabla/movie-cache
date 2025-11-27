import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import MovieCard from "../components/MovieCard";
import { NavLink } from "react-router-dom";
import backToTop from "../assets/back-to-top.svg";
import { appTitle } from "../utils/global";

function Favorite() {
  const { favorites, removeFromFavorites } = useContext(GlobalContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.title = `${appTitle} - Favorites`;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (favorites.length === 0) {
      document.body.classList.add("no-favorites");
    } else {
      document.body.classList.remove("no-favorites");
    }

    return () => document.body.classList.remove("no-favorites");
  }, [favorites]);

  // Meta
  useEffect(() => {
  if (appTitle) {
    document.title = `Favorites - ${appTitle}`;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content =
      "Explore and manage your saved movies and TV shows on Movie Cache. Quickly access your favorites anytime.";

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = "canonical";
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = `https://movie-cache.vincefontabla.com/favorites`;
  }
}, []);

  return (
    <main>
      <div className="favorite-page">
        <h1>Favorites</h1>
        <div className="favorites-wrapper">
          {favorites.length > 0 ? (
            favorites.map((movieData, index) => (
              <MovieCard
                key={movieData.id}
                movieData={movieData}
                removeFromFavorites={removeFromFavorites}
              />
            ))
          ) : (
            <div className="no-favorite">
              <h2>No Added Favorite</h2>
              <p>
                It looks like you haven't added any movies to your favorites
                yet. Start browsing and click th star icon next to any movie you
                love to keep them in one place
              </p>
              <div className="home-button">
                <NavLink to="/">Home</NavLink>
              </div>
            </div>
          )}
          {visible && (
            <button className="back-top" onClick={scrollToTop}>
              <img src={backToTop} alt="Back to Top" />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default Favorite;
