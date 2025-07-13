import { useContext } from "react";
import unfavoriteLogo from "../assets/favorites-toogled.png";
import favoriteLogo from "../assets/favorites-untoogled.png";
import { GlobalContext } from "../context/GlobalContext";

function FavoriteButton({ movieData }) {
  const { isFavorite, addToFavorites, removeFromFavorites } =
    useContext(GlobalContext);

  const isFavorited = isFavorite(movieData.id);

  function handleButtonClick(e) {
    e.preventDefault();
    if (isFavorited) {
      removeFromFavorites(movieData.id);
    } else {
      addToFavorites(movieData);
    }
  }

  return (
    <button className="favorite-button" onClick={handleButtonClick}>
      {isFavorited ? (
        <img src={unfavoriteLogo} alt="Favorite" />
      ) : (
        <img src={favoriteLogo} alt="Favorite" />
      )}
      <p className="fave-text">Add to Favorite</p>
    </button>
  );
}

export default FavoriteButton;
