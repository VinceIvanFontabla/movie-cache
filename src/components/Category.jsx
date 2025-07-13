function Category({ setCategory, activeCategory }) {
  return (
    <div className="category-button">
      <button
        className={activeCategory === "now_playing" ? "active" : ""}
        onClick={() => setCategory("now_playing")}
      >
        Now Playing
      </button>
      <button
        className={activeCategory === "popular" ? "active" : ""}
        onClick={() => setCategory("popular")}
      >
        Popular
      </button>
      <button
        className={activeCategory === "top_rated" ? "active" : ""}
        onClick={() => setCategory("top_rated")}
      >
        Top Rated
      </button>
      <button
        className={activeCategory === "upcoming" ? "active" : ""}
        onClick={() => setCategory("upcoming")}
      >
        Upcoming
      </button>
    </div>
  );
}

export default Category;
