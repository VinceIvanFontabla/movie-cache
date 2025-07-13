import { IMG_BASE } from "../utils/api";
import { Link } from "react-router-dom";
import { formatDatePretty, getGenreNames } from "../utils/tools";

function Banner({ movieData }) {
  if (!movieData) return null;

  return (
    <div>
      <div className="movie-poster">
        <img
          className="banner-backdrop-image"
          src={`${IMG_BASE}/w1280/${movieData.backdrop_path}`}
          alt={movieData.title}
        />
        <div className="banner-backdrop"></div>
      </div>
      <div className="banner-info-wrapper">
        <div className="banner-movie-info">
          <h2>{movieData.title}</h2>
          <h3>Overview</h3>
          <p>{formatDatePretty(movieData.release_date)}</p>
          <p className="movie-genre">{getGenreNames(movieData.genre_ids)}</p>
          <div className="banner-overview">
            <p>
              {movieData.overview.length > 100
                ? movieData.overview.slice(0, 100) + "..."
                : movieData.overview}
            </p>
            <Link to={`/movie/${movieData.id}`}>More Info</Link>
          </div>
        </div>
        <div className="banner-image">
          <img
            src={`${IMG_BASE}/w342/${movieData.poster_path}`}
            alt={movieData.title}
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
