"use strict";

const endpoint = "http://localhost:3000";

async function getArtists() {
  const rawArtists = await fetch(`${endpoint}/artists`);
  const artists = await rawArtists.json();
  console.log(artists);
  return artists;
}
export { getArtists };