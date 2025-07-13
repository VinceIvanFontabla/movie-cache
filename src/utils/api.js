const API_URL = "https://api.themoviedb.org/3/movie";
const API_URL_ALL = "https://api.themoviedb.org/3/discover/movie";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMG_BASE = "https://image.tmdb.org/t/p"


function getMovies(category, page = 1) {
    return fetch(`${API_URL}/${category}?api_key=${API_KEY}&page=${page}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return {
          movies: data.results,
          totalResults: data.total_results, 
        };
      })
      .catch((error) => {
        throw error;
      });
}


function getMovieId(id) {
  return fetch(`${API_URL}/${id}?api_key=${API_KEY}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
}
function getMovieTrailer(id) {
  return fetch(`${API_URL}/${id}/videos?api_key=${API_KEY}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
}

function getCredits(id){
  return fetch(`${API_URL}/${id}/credits?api_key=${API_KEY}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
}

function searchMovies(query, page = 1) {
  return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return {
        movies: data.results,
        totalResults: data.total_results,
      };
    })
    .catch((error) => {
      throw error;
    });
}


export { getMovies, getMovieId, getCredits, getMovieTrailer, searchMovies, IMG_BASE }