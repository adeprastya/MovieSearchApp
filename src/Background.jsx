import backgroundImage from "./assets/backgroundImage.jpg";

const Background = () => {
  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="background" style={divStyle}>
      <h1>
        MOVIE SEARCH APP
      </h1>
    </div>
  );
};

export default Background;
