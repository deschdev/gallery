const galleryContent = document.querySelector(".gallery-container")
const slideshowContainer = document.querySelector(".slideshow");
const openSlideshowButton = document.querySelector("#start-slideshow");
const closeSlideshowButton = document.querySelector("#stop-slideshow");
const slideshowHeader = document.querySelector("#slideshow-header");

export const slideshowFunctionality = () => {
  openSlideshowButton.addEventListener("click", openSlideshow);
  closeSlideshowButton.addEventListener("click", closeSlideshow);
  artFetch();
}

const openSlideshow = () => {
  if (slideshowContainer) {
    slideshowContainer.classList.remove("hide");
    galleryContent.classList.add("hide");
  }
}

const closeSlideshow = () => {
  if (slideshowContainer) {
    slideshowContainer.classList.add("hide");
    galleryContent.classList.remove("hide");
  }
}

const artFetch = async () => {
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
          <img src="${art.images.hero.small}" alt="art by: ${art.name}">
          <button id="open-lightbox" class="open-lightbox"> <svg width="12" height="12" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M21.7 10.3L16 4.7 4.7 16l5.7 5.7 112 112 0 0-63 63L48 208l11.3 11.3L64 224H208h16V208 64l-4.7-4.7L208 48 196.7 59.3l-63 63 0 0-112-112zm480 11.3l5.7-5.7L496 4.7l-5.7 5.7-112 112 0 0-63-63L304 48 292.7 59.3 288 64V208v16h16H448l4.7-4.7L464 208l-11.3-11.3-63-63 0 0 112-112zm-368 368l63 63L208 464l11.3-11.3L224 448V304 288H208 64l-4.7 4.7L48 304l11.3 11.3 63 63-112 112L4.7 496 16 507.3l5.7-5.7 112-112zm244.7 0l112 112 5.7 5.7L507.3 496l-5.7-5.7-112-112 63-63L464 304l-11.3-11.3L448 288H304 288v16V448l4.7 4.7L304 464l11.3-11.3 63-63zM208 70.6V208H70.6L208 70.6zm0 370.7L70.6 304H208V441.4zM441.4 304L304 441.4V304H441.4zM304 70.6L441.4 208H304V70.6z"/></svg>VIEW IMAGE</button>
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
          <p>${art.description}
            <a href="${art.source}" target="_blank">GO TO SOURCE</a>
          </p>
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

      // Lightbox
      const section = document.createElement("section");
      section.id = "LIGHTBOX";
      section.className = "image-modal hide";
      section.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-image-container">
          <button id="close-lightbox">CLOSE</button>
          <img id="lightbox-image" src="" alt="">
        </div>
      `;
      document.body.appendChild(section);

      const LIGHTBOX = document.querySelector("#LIGHTBOX");
      const openLightbox = document.querySelector("#open-lightbox");
      const closeLightbox = document.querySelector("#close-lightbox");
      const overlay = document.querySelector(".modal-overlay");
      const lightboxImage = document.querySelector("#lightbox-image");

      if (openLightbox) {
        openLightbox.addEventListener("click", () => {
          lightboxImage.src = art.images.gallery;
          lightboxImage.alt = `art by: ${art.artist.name}`;
          LIGHTBOX.classList.remove("hide");
        });
      }

      if (closeLightbox) {
        closeLightbox.addEventListener("click", () => {
          LIGHTBOX.classList.add("hide");
        });
      }

      if (overlay) {
        overlay.addEventListener("click", () => {
          LIGHTBOX.classList.add("hide");
        });
      }

    };

    createSlide(slideCounter);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
