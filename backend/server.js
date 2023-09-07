import fs from "fs/promises";
import express from "express";
import cors from "cors";

// --- Create express app and set port --- //
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.get('/artists/data', async (req, res) => {
    const data = await fs.readFile(`data.json`);
    const artists = JSON.parse(data);
    res.json(artists);
});

app.get('/artists/data/:id', (req, res) => {
    const result = artists.find(artist => artist.id === Number(req.params.id));
    res.json(result);
});

app.post('/artists/data', async (req, res) => {
    const newArtist = req.body;
    const data = await fs.readFile(`data.json`);
    const artists = JSON.parse(data);
    console.log(newArtist);
    newArtist.id = new Date().getTime();
    artists.push(newArtist);
    fs.writeFile("data.json", JSON.stringify(artists))
    res.json(artists);
});

app.put('/artists/data/:id', async (req, res) => {
    const id = Number(req.params.id);
    const updatedArtist = req.body;

    const data = await fs.readFile(`data.json`);
    const artists = JSON.parse(data);

    const index = artists.findIndex(artist => artist.id === id);

    if (index !== -1) {
        artists[index] = updatedArtist;
        await fs.writeFile("data.json", JSON.stringify(artists));
        res.json(updatedArtist);
    } else {
        res.status(404).json({ error: "Artist not found" });
    }
});

app.delete('/artists/data/:id', async (req, res) => {
    const id = Number(req.params.id);

    const data = await fs.readFile(`data.json`);
    const artists = JSON.parse(data);

    const updatedArtists = artists.filter(artist => artist.id !== id)

    fs.writeFile("data.json", JSON.stringify(updatedArtists))
    res.json(updatedArtists)
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});


______________________________


// import express, { json } from "express";
// import cors from "cors";
// import fs from "fs/promises";

// const app = express();
// // using express and cors features
// app.use(express.json());
// app.use(cors());

// app.get("/artists", async (request, response) => {
//   const data = await fs.readFile("backend/data.json");
//   const parsedData = await JSON.parse(data);
//   response.json(parsedData);
// });

// //empty default responses
// app.get("/", async (request, response) => {
//   response.send("empty get request");
// });
// app.post("/", (request, response) => {
//   response.send("empty post request");
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Serveren kører på: http://localhost:${port}`);
// });