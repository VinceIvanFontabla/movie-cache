import { useEffect, useState } from "react";
import { getMovies, searchMovies } from "../utils/api";
import { appTitle } from "../utils/global";
import MovieCard from "../components/MovieCard";
import Banner from "../components/Banner";
import Category from "../components/Category";
import backToTop from "../assets/back-to-top.svg";

function Home() {
  const [movies, setMovies] = useState([]);
  const [bannerMovie, setBannerMovie] = useState(null);
  const [category, setCategory] = useState("now_playing");
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = `${appTitle}`;
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
    setCurrentPage(1);
  }, [category]);

  useEffect(() => {
    getMovies(category, 1)
      .then((data) => {
        const randomMovie =
          data.movies[Math.floor(Math.random() * data.movies.length)];
        setBannerMovie(randomMovie);
      })
      .catch((error) => alert(error.message));
  }, [category]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      getMovies(category, currentPage)
        .then((data) => {
          if (currentPage === 1) {
            setMovies(data.movies);
          } else {
            setMovies((prevMovies) => [...prevMovies, ...data.movies]);
          }
          setTotalResults(data.totalResults);
        })
        .catch((error) => alert(error.message));
    } else {
      searchMovies(searchQuery.trim(), currentPage)
        .then((data) => {
          if (currentPage === 1) {
            setMovies(data.movies);
          } else {
            setMovies((prevMovies) => [...prevMovies, ...data.movies]);
          }
          setTotalResults(data.totalResults);
        })
        .catch((error) => alert(error.message));
    }
  }, [category, currentPage, searchQuery]);

  function loadMoreMovies() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  }

  return (
    <main id="home" className="home">
      <section className="banner">
        <Banner movieData={bannerMovie} />
      </section>
      <section className="movies">
        <input
          id="search"
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
        <div className="category">
          <Category setCategory={setCategory} activeCategory={category} />
          <p>
            Showing {movies.length} of {totalResults}
          </p>
        </div>
        <div className="movie-wrapper">
          {movies.map((movieData) => (
            <MovieCard key={movieData.id} movieData={movieData} />
          ))}
        </div>
        <button className="load-more" onClick={loadMoreMovies}>
          Load More
        </button>
        {visible && (
          <button className="back-top" onClick={scrollToTop}>
            <img src={backToTop} alt="Back to Top" />
          </button>
        )}
      </section>
    </main>
  );
}

export default Home;
