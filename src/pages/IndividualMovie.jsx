import { useEffect, useState } from "react";
import {
  getCredits,
  getMovieId,
  getMovieTrailer,
  IMG_BASE,
} from "../utils/api";
import { useParams } from "react-router-dom";
import {
  formatDatePretty,
  getDirectorAndWriters,
  getIdGenreNames,
} from "../utils/tools";
import FavoriteButton from "../components/FavoriteButton";
import backToTop from "../assets/back-to-top.svg";
import { appTitle } from "../utils/global";
import noImage from "../assets/no-image-placeholder.svg";

function IndividualMovie() {
  const [movieData, setMovieData] = useState();
  const [movieTrailer, setMovieTrailer] = useState();
  const { id } = useParams();
  const [genre, setGenre] = useState([]);
  const [credits, setCredits] = useState([]);
  const [cast, setCast] = useState([]);
  const [showAllCast, setShowAllCast] = useState(false);
  const [directorAndWriters, setDirectorAndWriters] = useState([]);
  const [visible, setVisible] = useState(false);

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

  function findExistingPerson(grouped, name) {
    return grouped.find(function (p) {
      return p.name === name;
    });
  }

  useEffect(() => {
    getMovieId(id).then((data) => {
      setMovieData(data);
      setGenre(data.genres);
      document.title = `${appTitle} - ${data.title}`;
    });
    getMovieTrailer(id).then((data) => {
      setMovieTrailer(data);
    });
    getCredits(id)
      .then((data) => {
        const crew = data.crew;
        const cast = data.cast.filter(
          (person) => !person.character.includes("(uncredited)")
        );
        setDirectorAndWriters(getDirectorAndWriters(crew));
        setCast(cast);
      })

      .catch((error) => alert(error.message));
  }, []);

  useEffect(() => {
    getMovieTrailer(id)
      .then((data) => {
        const trailer = data.results?.find((video) => video.type === "Trailer");
        setMovieTrailer(trailer);
      })
      .catch((error) => alert(error.message));
  }, []);

  useEffect(() => {
    const grouped = [];

    directorAndWriters.forEach((person) => {
      const existing = findExistingPerson(grouped, person.name);
      if (existing) {
        if (!existing.jobs.includes(person.job)) {
          existing.jobs.push(person.job);
        }
      } else {
        grouped.push({ name: person.name, jobs: [person.job], id: person.id });
      }
    });

    setCredits(grouped);
  }, [directorAndWriters]);

  return (
    <main id="single-movie-page">
      {movieData && (
        <div className="single-movie">
          <div className="individual-background-poster">
            <img
              className="individual-banner-backdrop-image"
              src={`${IMG_BASE}/w1280/${movieData.backdrop_path}`}
              alt={movieData.title}
            />
            <div className="individual-banner-backdrop"></div>
            <div className="individual-banner-overlay"></div>
          </div>
          <div className="movie-detail">
            <div className="single-banner-poster">
              <div className="title-overview-single">
                <h1 className="movie-title">{movieData.title}</h1>
              </div>
              <div className="individual-movie-poster">
                <img
                  src={`${IMG_BASE}/w500/${movieData.poster_path}`}
                  alt={movieData.title}
                />
              </div>
            </div>
            <h2 className="cast">Overview</h2>
            <div className="detail-wrapper">
              <div className="date-genre">
                <p>{formatDatePretty(movieData.release_date)}</p>
                <p>{getIdGenreNames(genre)}</p>
              </div>
              {movieTrailer && (
                <a
                  className="trailer-link"
                  href={`https://www.youtube.com/watch?v=${movieTrailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Trailer
                </a>
              )}
              <p className="individual-rating">
                {movieData.vote_average === 0 ? "NY" : movieData.vote_average}
              </p>
            </div>
            <p>{movieData.overview}</p>
            <div className="add-to-favorite">
              <FavoriteButton movieData={movieData} />
            </div>
            <div className="credits">
              {credits.map((person, index) => (
                <div key={`credits-${index}`}>
                  <a
                    href={`https://www.themoviedb.org/person/${person.id}`}
                    target="_blank"
                  >
                    <p className="director-writer">{person.name}</p>
                  </a>
                  <p>{person.jobs.join(", ")}</p>
                </div>
              ))}
            </div>
            <div className="cast">
              <h2 className="cast-section">Cast</h2>
              <div className="cast-detail">
                {cast
                  .slice(0, showAllCast ? undefined : 4)
                  .map((person, index) => (
                    <div key={`casts-${index}`} className="cast-card">
                      <div className="cast-image">
                        <a
                          href={`https://www.themoviedb.org/person/${person.id}`}
                          target="_blank"
                        >
                          <img
                            src={
                              person.profile_path
                                ? `${IMG_BASE}/w154/${person.profile_path}`
                                : noImage
                            }
                            alt={`${person.name} Poster`}
                          />
                        </a>
                      </div>
                      <a
                        href={`https://www.themoviedb.org/person/${person.id}`}
                        target="_blank"
                      >
                        <p className="cast-name">{person.name}</p>
                      </a>
                      <p className="character">{person.character}</p>
                    </div>
                  ))}
              </div>
              <div className="view-more-wrapper">
                {!showAllCast && cast.length > 4 && (
                  <button
                    onClick={() => setShowAllCast(true)}
                    className="view-more"
                  >
                    View More
                  </button>
                )}
              </div>
              {visible && (
                <button className="back-top" onClick={scrollToTop}>
                  <img src={backToTop} alt="Back to Top" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default IndividualMovie;
