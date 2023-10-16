/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import errorImage from "./assets/errorImage.jpg";

const ActiveMovie = ({
  backdrop,
  poster,
  genre,
  homepage,
  overview,
  country,
  date,
  runtime,
  language,
  status,
  title,
  vote,
  dataShown,
  setDataShown,
  mobileViewport,
}) => {
  const movieWrapperBackdropStyle = {
    backgroundImage: `linear-gradient(to right, #12121255, #121212cc, #121212), url(https://image.tmdb.org/t/p/original${backdrop})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    animation: `opacity 2s linear`,
  };
  const movieWrapperPosterStyle = {
    backgroundImage: `linear-gradient(to right, #12121255, #12121288, #121212df, #121212, #121212, #121212, #121212), ${
      poster
        ? `url(https://image.tmdb.org/t/p/original${poster})`
        : `url(${errorImage})`
    }`,
    backgroundSize: "auto calc(30vw + 90vh)",
    backgroundRepeat: "no-repeat",
    animation: `opacity 2s linear`,
  };
  const movieGridContainerStyle = {
    width: dataShown ? "85vw" : "60vw",
    maxHeight: "100vh",
    margin: dataShown ? "0 5vw 0 0" : "0 25vw 0 0",
    border: dataShown ? "calc(.1vw + .1vh) solid #dedede33" : "none",
    backdropFilter: dataShown ? "blur(5px)" : "none",
    gap: dataShown ? "5vh 5vw" : "2vh 0",
  };
  const movieGridContainerMobileStyle = {
    width: dataShown ? "90vw" : "80vw",
    maxHeight: "100vh",
    border: dataShown ? "calc(.1vw + .1vh) solid #dedede33" : "none",
    backdropFilter: dataShown ? "blur(5px)" : "none",
    margin: dataShown ? "-7.5vh 0 0 0" : "-20vh 0 0 0",
    gap: dataShown ? "5vh 2.5vw" : "2vh 0",
  };
  const ratingStyle = {
    position: `absolute`,
    width: `calc(${vote ? vote.toFixed(1) : 0} / 10 * 20vw)`,
    height: `calc(.2vw + .2vh)`,
    background: `linear-gradient(to left, var(--clr2), var(--clr3), var(--clr4))`,
    animation: `width 3s ease-out`,
  };
  const ratingBgStyle = {
    width: `calc(20vw)`,
    height: `calc(.2vw + .2vh)`,
    background: `var(--clr1)`,
  };
  const titleStyle = {
    textAlign: dataShown ? "center" : "left",
  };
  const displayNone = {
    width: 0,
    height: 0,
    overflow: "hidden",
  };

  const contVariants = {
    hidden: {
      y: 25,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.3,
      },
    },
  };
  const itemVariants = {
    hidden: {
      x: 25,
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const handleClickButton = () => {
    setDataShown(!dataShown);
  };

  return (
    <div
      className="movie__wrapper"
      style={backdrop ? movieWrapperBackdropStyle : movieWrapperPosterStyle}
    >
      <motion.div
        variants={contVariants}
        initial="hidden"
        animate="visible"
        className="movie-grid-container"
        style={
          mobileViewport
            ? movieGridContainerMobileStyle
            : movieGridContainerStyle
        }
      >
        <motion.h1
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="movie__title"
          style={titleStyle}
        >
          {title}
        </motion.h1>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="date-vote__wrapper"
        >
          <h2 className="movie__date">{date ? date.split("-")[0] : "00"}</h2>
          <span className="movie__vote">
            Vote Average : {vote ? vote.toFixed(1) : "X"}
            <div style={ratingStyle}></div>
            <div style={ratingBgStyle}></div>
          </span>
        </motion.div>

        <div
          className="movie-data__wrapper"
          style={dataShown ? null : displayNone}
        >
          {genre.length > 0 && (
            <motion.p
              variants={itemVariants}
              animate={dataShown ? "visible" : "hidden"}
              className="movie-data movie-prop"
            >
              Genres :
            </motion.p>
          )}
          {genre.length > 0 && (
            <motion.p
              variants={itemVariants}
              animate={dataShown ? "visible" : "hidden"}
              className="movie-data"
            >
              {genre.map((e) => e.name).join(", ")}
            </motion.p>
          )}

          {language.length > 0 && (
            <motion.p
              variants={itemVariants}
              animate={dataShown ? "visible" : "hidden"}
              className="movie-data movie-prop"
            >
              Language :
            </motion.p>
          )}
          {language.length > 0 && (
            <motion.p
              variants={itemVariants}
              animate={dataShown ? "visible" : "hidden"}
              className="movie-data"
            >
              {language.map((e) => e.english_name).join(", ")}
            </motion.p>
          )}

          {country.length > 0 && (
            <motion.p
              variants={itemVariants}
              animate={dataShown ? "visible" : "hidden"}
              className="movie-data movie-prop"
            >
              Country :
            </motion.p>
          )}
          {country.length > 0 && (
            <motion.p
              variants={itemVariants}
              animate={dataShown ? "visible" : "hidden"}
              className="movie-data"
            >
              {country.map((e) => e.name).join(",")}
            </motion.p>
          )}

          {runtime != 0 && (
            <motion.p
              variants={itemVariants}
              animate={dataShown ? "visible" : "hidden"}
              className="movie-data movie-prop"
            >
              Runtime :
            </motion.p>
          )}
          {runtime != 0 && (
            <motion.p
              variants={itemVariants}
              animate={dataShown ? "visible" : "hidden"}
              className="movie-data"
            >
              {runtime + " min"}
            </motion.p>
          )}

          {date != "" && (
            <motion.p
              variants={itemVariants}
              animate={dataShown ? "visible" : "hidden"}
              className="movie-data movie-prop"
            >
              Released :
            </motion.p>
          )}
          {date != "" && (
            <motion.p
              variants={itemVariants}
              animate={dataShown ? "visible" : "hidden"}
              className="movie-data"
            >
              {date}
            </motion.p>
          )}

          {status != "" && (
            <motion.p
              variants={itemVariants}
              animate={dataShown ? "visible" : "hidden"}
              className="movie-data movie-prop"
            >
              Status :
            </motion.p>
          )}
          {status != "" && (
            <motion.p
              variants={itemVariants}
              animate={dataShown ? "visible" : "hidden"}
              className="movie-data"
            >
              {status}
            </motion.p>
          )}

          {homepage != "" && (
            <motion.p
              variants={itemVariants}
              animate={dataShown ? "visible" : "hidden"}
              className="movie-data movie-prop"
            >
              Homepage :
            </motion.p>
          )}
          {homepage != "" && (
            <motion.a
              variants={itemVariants}
              animate={dataShown ? "visible" : "hidden"}
              className="movie-data"
              href={homepage}
              target="_blank"
            >
              {homepage}
            </motion.a>
          )}
        </div>

        <a
          className="movie__button"
          style={dataShown ? { backgroundColor: "transparent" } : {}}
          onClick={handleClickButton}
        >
          {dataShown ? "BACK" : "MORE"}
        </a>

        {overview != "" && (
          <motion.div
            variants={itemVariants}
            animate={dataShown ? "visible" : "hidden"}
            className="movie__plot"
            style={dataShown ? null : displayNone}
          >
            <p className="movie-prop">Overview :</p>
            <p>
              {overview.length > 750
                ? overview.slice(0, 750) + ". . ."
                : overview}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ActiveMovie;
