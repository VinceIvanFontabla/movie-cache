import { IMG_BASE } from "../utils/api";
import { formatDatePretty } from "../utils/tools";
import FavoriteButton from "./FavoriteButton";
import { Link } from "react-router-dom";
import noImage from "../assets/no-image-placeholder.svg";

function MovieCard({ movieData }) {
  return (
    <div className="movie-card-wrapper">
      <div className="movie-card">
        <p className="rating">
          {movieData.vote_average === 0 ? "NY" : movieData.vote_average}
        </p>
        <FavoriteButton movieData={movieData} />
        <Link to={`/movie/${movieData.id}`}>
          <img
            src={
              movieData.poster_path
                ? `${IMG_BASE}/w342/${movieData.poster_path}`
                : noImage
            }
            alt={movieData.title}
          />
        </Link>
        <h3 className="card-title">{movieData.title}</h3>
        <p className="card-date">{formatDatePretty(movieData.release_date)}</p>
      </div>
      <Link to={`/movie/${movieData.id}`}>
        <div className="movie-card-overlay">
          <div className="card-backdrop-overlay"></div>
          <h3>{movieData.title}</h3>
          <p className="card-date-overlay">
            {formatDatePretty(movieData.release_date)}
          </p>
          <p>
            {movieData.overview.length > 150
              ? movieData.overview.slice(0, 150) + "..."
              : movieData.overview}
          </p>
          <p>More Info</p>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
