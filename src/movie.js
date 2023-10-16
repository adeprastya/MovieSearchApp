// OMDB API
// export const getMovieList = function (title) {
//   return fetch("http://www.omdbapi.com/?apikey=c9483f04&s=" + title)
//     .then((response) => response.json())
//     .then((data) => data.Search)
//     .catch((error) => {
//       throw new Error("Error getting Movies " + error);
//     });
// };
// export const getMovieData = function (title) {
//   return fetch(
//     "http://www.omdbapi.com/?apikey=c9483f04&t=" + title + "&plot=full"
//   )
//     .then((response) => response.json())
//     .catch((error) => {
//       throw new Error("Error getting Full Data " + error);
//     });
// };
// export const getMovies = function (title) {
//   return fetch("http://www.omdbapi.com/?apikey=c9483f04&s=" + title)
//     .then((response) => response.json())
//     .then((data) => {
//       const moviePromises = data.Search.map((m) => getMovieData(m.Title));
//       return Promise.all(moviePromises);
//     })
//     .catch((error) => {
//       throw new Error("Error getting Movies " + error);
//     });
// };

// TMDB API
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH}`,
  },
};
const queryParams = {
  adult: false,
  video: false,
  page: 1,
};

export const getMovieList = function (title) {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=${queryParams.adult}&include_video=${queryParams.video}&language=en-US&page=${queryParams.page}&sort_by=popularity.desc`,
    options
  )
    .then((response) => response.json())
    .then((response) => response.results)
    .catch((error) => error);
};
export const getMovieData = function (id) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?&append_to_response=videos`,
    options
  )
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => error);
};
export const getMovieActor = function (id) {
  return fetch(`https://api.themoviedb.org/3/movie/${id}/credits?`, options)
    .then((response) => response.json())
    .then((response) => response.cast)
    .catch((error) => error);
};
