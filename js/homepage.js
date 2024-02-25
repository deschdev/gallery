import { openSlideshow } from "./slideshow.js";

const galleryContainer = document.querySelector(".gallery-container");

/* Main homepage functionality */
export const artGallery = async () => {
  try {
    const response = await fetch("./data.json");
    const json = await response.json();
    
    // giving each art piece it's own anchor element
    json.forEach((art, index) => {
      const anchor = document.createElement("a");
      anchor.className = "artist gallery-artist";
      anchor.innerHTML = `
        <div class="text-wrapper">
          <h3>${art.name}</h3>
          <p>${art.artist.name}</p>
        </div>
        <img src="${art.images.thumbnail}" alt="${art.name}">
      `;

      anchor.addEventListener("click", () => openSlideshow(index));

      galleryContainer.appendChild(anchor);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}