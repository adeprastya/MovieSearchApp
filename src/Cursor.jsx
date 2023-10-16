import { useState, useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
const Cursor = ({ size, duration, timingFunction, mobileViewport }) => {
  const [visible, setVisible] = useState(false);
  const cursorRef = useRef(null);

  const cursorStyle = {
    opacity: visible ? "1" : "0",
    position: "fixed",
    zIndex: "9999",
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    background: "#fff",
    boxShadow: "0 0 10px 5px #ff0000, 0 0 1px 1px #ff0000 inset",
    pointerEvents: "none",
  };

  const handleMouseMove = (e) => {
    if (mobileViewport) setVisible(false);
    else setVisible(true);
    const mouseX = e.clientX - size / 2;
    const mouseY = e.clientY - size / 2;

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      cursorRef.current.style.transition = `transform ${duration}ms ${timingFunction}`;
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  });

  return <div className="cursor" style={cursorStyle} ref={cursorRef}></div>;
};

export default Cursor;
