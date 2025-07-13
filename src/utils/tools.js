const GENRES = {
    28: "Action",
    10759: "Action & Adventure",
    12: "Adventure",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
    10762: "Kids",
    10763: "News",
    10764: "Reality",
    10765: "Sci-Fi & Fantasy",
    10766: "Soap",
    10767: "Talk",
    10768: "War & Politics"
  };

function getGenreNames(genre_ids) {
    return genre_ids.map(id => GENRES[id]).join(", ");
  }

  function getIdGenreNames(genres) {
    return genres.map(genre => genre.name).join(', ');
  }

function getDirectorAndWriters(crew) {
  return crew
    .filter(person =>
      person.job === 'Director' || person.job === 'Writer'
    )
    .map(info => ({
      job: info.job,
      name: info.name,
      id: info.id
    }));
}


function formatDatePretty(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long"});
    const year = date.getFullYear();

    const getOrdinal = (n) => {
        if(n >= 11 && n <= 13) return `${n}th`;
        switch(n % 10){
            case 1: return `${n}st`;
            case 2: return `${n}nd`;
            case 3: return `${n}rd`;
            default: return `${n}th`;
        }
    }
    return `${month} ${getOrdinal(day)}, ${year}`;
}

export {formatDatePretty, getGenreNames, getIdGenreNames, getDirectorAndWriters, GENRES}