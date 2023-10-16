function debounce(func, delay) {
  let time;
  return function (...args) {
    clearTimeout(time);
    time = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export default debounce;
