import { createContext, useState } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  function addToFavorites(movieData) {
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, movieData];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  }

  function removeFromFavorites(id) {
    const newFavorites = favorites.filter((movie) => {
      return movie.id !== id;
    });
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  }

  function isFavorite(id) {
    return favorites.some((movie) => movie.id === id);
  }

  return (
    <GlobalContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
