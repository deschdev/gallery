
const galleryContainer = document.querySelector(".gallery-container");

export const fetchData = async () => {
  try {
    const response = await fetch("./data.json");
    const json = await response.json();
    
    json.forEach((art, index) => {
      console.log("artist index:", index);
      const div = document.createElement("div");
      div.className = "artist gallery-artist";
      div.innerHTML = `
        <div class="text-wrapper">
          <h3>${art.name}</h3>
          <p>${art.artist.name}</p>
        </div>
        <img src="${art.images.thumbnail}" alt="${art.name}">
      `;
      galleryContainer.appendChild(div);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}