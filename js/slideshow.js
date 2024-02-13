const slideshowContainer = document.querySelector(".slideshow");
const openSlideshowButton = document.querySelector("#start-slideshow");
const closeSlideshowButton = document.querySelector("#stop-slideshow");
const slideshowHeader = document.querySelector("#slideshow-header");

export const slideshowFunctionality = () => {
  openSlideshowButton.addEventListener("click", openSlideshow);
  closeSlideshowButton.addEventListener("click", closeSlideshow);
  fetchData();
}

const openSlideshow = () => {
  if (slideshowContainer) {
    slideshowContainer.classList.remove("hide");
  }
}

const closeSlideshow = () => {
  if (slideshowContainer) {
    slideshowContainer.classList.add("hide");
  }
}

const fetchData = async () => {
  try {
    const response = await fetch("./data.json");
    const json = await response.json();
    
    // Initialize index variable
    let slideCounter = 0;

    // Create slide with the first item
    const createSlide = (index) => {
      const art = json[index];
      const div = document.createElement("div");
      div.className = "slideshow-triple-split";
      div.innerHTML = `
        <div class="left">
          <img src="${art.images.hero.small}" alt="${art.name}">
          <button class="open-lightbox">VIEW IMAGE</button>
        </div>
        <div class="middle">
          <div class="artist-title">
            <h2>${art.name}</h2>
            <h3>${art.artist.name}</h3>
          </div>
          <img src="${art.artist.image}" alt="portrait of ${art.artist.name}">
        </div>
        <div class="right">
          <h2>${art.year}</h2>
          <p>${art.description}</p>
          <a href="${art.source}" target="_blank">GO TO SOURCE</a>
        </div>
        <progress id="progress-bar" value="6" max="100"> 6% </progress>
        <div class="control-display">
          <div class="control-footer">
            <div class="control-text">
              <h3>${art.name}</h3>
              <h4>${art.artist.name}</h4>
            </div>

            <div class="slideshow-controls">
              <button class="prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M16 470.7L0 480V461.5 50.5 32l16 9.3L368.1 246.7 384 256l-15.9 9.3L16 470.7zM352.2 256L16 59.9V452.1L352.2 256z"/></svg></button>
              <button class="next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M16 470.7L0 480V461.5 50.5 32l16 9.3L368.1 246.7 384 256l-15.9 9.3L16 470.7zM352.2 256L16 59.9V452.1L352.2 256z"/></svg></button>
            </div>

          </div>
        </div>
      `;
      // Clear previous slide
      slideshowContainer.innerHTML = '';
      // keeping the header visible when a prev or next slides are clicked
      slideshowContainer.appendChild(slideshowHeader);
      slideshowContainer.appendChild(div);

      const prevSlide = document.querySelector(".prev");
      const nextSlide = document.querySelector(".next");

      prevSlide.addEventListener("click", () => {
        // Handle previous slide functionality
        if (slideCounter === 0) {
          slideCounter = json.length - 1;
        } else {
          slideCounter--;
        }
        createSlide(slideCounter);
      });

      nextSlide.addEventListener("click", () => {
        // Handle next slide functionality
        if (slideCounter === json.length - 1) {
          slideCounter = 0;
        } else {
          slideCounter++;
        }
        createSlide(slideCounter);
      });
    };

    createSlide(slideCounter);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
