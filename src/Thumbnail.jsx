/* eslint-disable react/prop-types */
import errorImage from './assets/errorImage.jpg';

const Thumbnail = ({
  movieList,
  activeMovie,
  setActiveMovie,
  dataShown,
  mobileViewport,
}) => {
  const thumbnailStyle = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    animation: "opacity 2s ease-out",
  };

  const activeThumbnailStyle = {
    boxShadow:
      "inset 0 calc(0.4vw + 0.4vh) calc(1.5vw + 1.5vh) calc(0.8vw + 0.8vh) var(--clr-1), 0 0 10px var(--clr2)",
    border: "2px solid var(--clr3)",
    filter: "none",
    transform: "scale(1.025)",
  };

  const activeVoteStyle = {
    left: "calc(-0.75vw + -0.75vh)",
    bottom: "calc(-0.75vw + -0.75vh)",
    transform: "scale(1.2)",
  };

  const handleClick = (id) => {
    setActiveMovie(id);
  };

  return (
    <div
      className="thumbnail__wrapper"
      style={
        mobileViewport
          ? dataShown
            ? {
                bottom: "calc(6vh - 3vw - 18vh)",
                pointerEvents: "none",
                opacity: 0.5,
              }
            : { bottom: "calc(6vh - 3vw)" }
          : dataShown
          ? {
              right: "calc(-3vw - 8vh - 4.5vh)",
              pointerEvents: "none",
              opacity: 0.5,
            }
          : { right: "calc(5vw - 4.5vh)" }
      }
    >
      {movieList.map((movie) => (
        <div
          className="thumbnail__poster"
          key={movie.id}
          style={{
            backgroundImage: `url(${
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : errorImage
            })`,
            ...thumbnailStyle,
            ...(movie.id === activeMovie && activeThumbnailStyle),
          }}
          onClick={() => handleClick(movie.id)}
        >
          <h1 className="thumbnail__title">{movie.title}</h1>
          <div
            className="thumbnail__vote"
            style={movie.id === activeMovie ? activeVoteStyle : null}
          >
            {movie.vote_average == 0 ? "X" : movie.vote_average.toFixed(1)}
          </div>
        </div>
      ))}
    </div>
  );
};




export default Thumbnail;
