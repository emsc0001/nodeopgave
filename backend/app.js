import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.get('/artists/data', async (req, res) => {
    const data = await fs.readFile('data/data.json');
    const artists = JSON.parse(data);
    res.json(artists);
});

app.get('/artists/data/:id', async (req, res) => {
    const artistId = Number(req.params.id);
    const data = await fs.readFile('data/data.json');
    const artists = JSON.parse(data);
    const artist = artists.find(artist => artist.id === artistId);
    res.json(artist);
});

app.post('/artists/data', async (req, res) => {
    // get new artist request
        const newArtist = req.body;
        newArtist.id = new Date().getTime();

    // get artist
        const data = await fs.readFile('data/data.json');
        const artists = JSON.parse(data);
        artists.push(newArtist);

    // opdater original fil
        await fs.writeFile('data/data.json', JSON.stringify(artists, null, 2));
        res.json(artists);
});

app.put('/artists/data/:id', async (req,res) => {
    // get ID to update and what to update with
        const artistId = Number(req.params.id);
        const updatedArtistData = req.body;  

    // read existing data
        const data = await fs.readFile('data/data.json');
        const artists = JSON.parse(data);

    // find artist index to match ID
        const artistToUpdate =  artists.find(artist => artist.id === artistId);

        for(const key in artistToUpdate) {
            if(key !== 'id'){
                artistToUpdate[key] = updatedArtistData[key]
            }
        };

    // update the data file with the new data
        await fs.writeFile('data/data.json', JSON.stringify(artists, null, 2));

    // response
        res.json(artists);
});

app.delete('/artists/data/:id', async (req, res) => {
    // get artistID to delete
        const artistId = Number(req.params.id);

    // read the data file
        const data = await fs.readFile('data/data.json');
        const artists = JSON.parse(data);

    // find artist index to match ID
        const results =  artists.filter(a => a.id !==artistId);

    // update the json file
        await fs.writeFile('data/data.json', JSON.stringify(results, null, 2))

        res.json(results);
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});