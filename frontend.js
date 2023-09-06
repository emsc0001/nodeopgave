// Kunstnerliste
let artists = [];

// Form til oprettelse af kunstner
const artistForm = document.getElementById("artist-form");
const artistNameInput = document.getElementById("artist-name");
const artistGenreInput = document.getElementById("artist-genre");
const artistList = document.getElementById("artist-list");
const favoritesList = document.getElementById("favorites-list");

// Lyt til indsendelse af kunstnerformularen
artistForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const artistName = artistNameInput.value;
    const artistGenre = artistGenreInput.value;

    if (artistName && artistGenre) {
        const artist = { name: artistName, genre: artistGenre, favorite: false };
        artists.push(artist);
        artistNameInput.value = "";
        artistGenreInput.value = "";
        renderArtists();
    }
});

// Funktion til at vise kunstnere
function renderArtists() {
    artistList.innerHTML = "";

    artists.forEach((artist, index) => {
        const artistItem = document.createElement("div");
        artistItem.classList.add("artist-item");
        artistItem.innerHTML = `
            <span>${artist.name} (${artist.genre})</span>
            <button onclick="toggleFavorite(${index})">${artist.favorite ? "Fjern favorit" : "Favorit"}</button>
            <button onclick="deleteArtist(${index})">Slet</button>
        `;

        artistList.appendChild(artistItem);
    });

    renderFavorites();
}

// Funktion til at markere/fjerne en kunstner som favorit
function toggleFavorite(index) {
    artists[index].favorite = !artists[index].favorite;
    renderArtists();
}

// Funktion til at slette en kunstner
function deleteArtist(index) {
    artists.splice(index, 1);
    renderArtists();
}

// Funktion til at vise favoritkunstnere
function renderFavorites() {
    const favorites = artists.filter((artist) => artist.favorite);
    favoritesList.innerHTML = "";
    favorites.forEach((favorite) => {
        const favoriteItem = document.createElement("li");
        favoriteItem.textContent = `${favorite.name} (${favorite.genre})`;
        favoritesList.appendChild(favoriteItem);
    });
}

// Initial rendering
renderArtists();
