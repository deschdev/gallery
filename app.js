import { fetchData } from "./js/homepage.js";
import { slideshowFunctionality } from "./js/slideshow.js"

const init = () => {
  fetchData();
  slideshowFunctionality();
}

init();
