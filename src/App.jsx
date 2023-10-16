import { useState, useEffect } from "react";
import { getMovieList, getMovieData } from "./movie.js";
import debounce from "./function.js";
import Background from "./Background.jsx";
import Cursor from "./Cursor.jsx";
import SearchForm from "./SearchForm.jsx";
import Thumbnail from "./Thumbnail.jsx";
import ActiveMovie from "./ActiveMovie.jsx";

const App = () => {
  const [seachQuery, setSearchQuery] = useState(null);
  const [movieList, setMovieList] = useState([]);
  const [loadMovieList, setLoadMovieList] = useState(false);
  const [activeMovie, setActiveMovie] = useState(null);
  const [activeMovieData, setActiveMovieData] = useState(null);
  const [dataShown, setDataShown] = useState(false);
  const [mobileViewport, setMobileViewport] = useState(false);

  const fetchActiveMovie = async (activeMovie) => {
    try {
      const movieData = await getMovieData(activeMovie);
      setActiveMovieData(movieData);
    } catch (error) {
      console.error("Error fetching Movie Data, ", error);
    } finally {
      setLoadMovieList(false);
    }
  };

  useEffect(() => {
    if (activeMovie) fetchActiveMovie(activeMovie);
  }, [activeMovie]);

  const performSearch = (value) => {
    if (value.trim() == "") return;
    if (value == seachQuery) return;
    setSearchQuery(value);
    setLoadMovieList(true);
    setDataShown(false);
    getMovieList(value)
      .then((movieList) => {
        setMovieList(movieList);
        setActiveMovie(movieList[0].id);
      })
      .catch((error) => {
        setLoadMovieList(false);
        console.log("Error fetching Movie List, " + error);
      });
  };

  const handleResize = () => {
    if (window.innerWidth < window.innerHeight) {
      setMobileViewport(true);
    } else {
      setMobileViewport(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {activeMovie == null && <Background />}

      <Cursor
        size={10}
        duration={100}
        timingFunction={"cubic-bezier(.67,.41,.89,1.64)"}
        mobileViewport={mobileViewport}
      />

      <SearchForm
        loadMovieList={loadMovieList}
        handleSearch={debounce(performSearch, 1000)}
      />

      {movieList && (
        <Thumbnail
          movieList={movieList}
          activeMovie={activeMovie}
          setActiveMovie={setActiveMovie}
          dataShown={dataShown}
          mobileViewport={mobileViewport}
        />
      )}

      {activeMovieData && (
        <ActiveMovie
          key={activeMovieData.id}
          backdrop={activeMovieData.backdrop_path}
          poster={activeMovieData.poster_path}
          genre={activeMovieData.genres}
          homepage={activeMovieData.homepage}
          overview={activeMovieData.overview}
          country={activeMovieData.production_countries}
          date={activeMovieData.release_date}
          runtime={activeMovieData.runtime}
          language={activeMovieData.spoken_languages}
          status={activeMovieData.status}
          tagline={activeMovieData.tagline}
          title={activeMovieData.title}
          vote={activeMovieData.vote_average}
          dataShown={dataShown}
          setDataShown={setDataShown}
          mobileViewport={mobileViewport}
        />
      )}
    </>
  );
};

export default App;
