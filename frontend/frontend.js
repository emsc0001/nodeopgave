"use strict";

window.addEventListener("load", start);

import { cancelClicked, cancelClickedInUpdate } from "./modules/submit.js";
import { ShowFavorites, showCreateForm } from "./modules/dialogue.js";
import { showAllArtists, showAllFavorites } from "./modules/display.js";

const endpoint = 'http://localhost:3000'

export async function start() {
    
    const artistData = await getData();

    document.querySelector("#add-new button")
    .addEventListener("click", showCreateForm);

    document.querySelector("#show-favorites-button")
    .addEventListener("click", ShowFavorites);

    document.querySelector("#show-favorites-button")
    .addEventListener('click', showAllFavorites);

    document.querySelector("#cancelButton")
    .addEventListener("click", cancelClicked);

    showAllArtists(artistData);
}

export async function getData() {
    const response = await fetch(`${endpoint}/artists/data`);
    const data = await response.json();
    return data;
}

export async function createNew(newArtist) {
    const json = JSON.stringify(newArtist);
    const response = await fetch(`${endpoint}/artists/data`,
    {   
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        body: json
    });

    if(response.ok) {
       const artists = await response.json();
       showAllArtists(artists);
    }
}

export async function deleteArtist(id) {
    const idAsInteger = Number(id);

    const response = await fetch(`${endpoint}/artists/data/${idAsInteger}`,
    {method: 'DELETE'}
    );

    if(response.ok) {
        const artists = await response.json();
        showAllArtists(artists);
    }
};

export async function updateArtist(artist){
    const idAsInteger = Number(artist.id)
    const json = JSON.stringify(artist);

    const response = await fetch(`${endpoint}/artists/data/${idAsInteger}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PUT',
        body: json,
    });

    if(response.ok) {
        const artists = await response.json();
        showAllArtists(artists);
        cancelClickedInUpdate();
    }
};