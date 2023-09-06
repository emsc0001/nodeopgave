const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// JSON-fil som datakilde
const dataFilePath = 'artists.json';

// Middleware til at tjekke om JSON-filen eksisterer, hvis ikke, opret en tom liste
app.use((req, res, next) => {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, '[]', 'utf-8');
  }
  next();
});

// GET alle kunstnere
app.get('/artists', (req, res) => {
  const artists = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
  res.json(artists);
});

// GET kunstner ved ID
app.get('/artists/:id', (req, res) => {
  const artists = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
  const artist = artists.find((a) => a.id === req.params.id);

  if (!artist) {
    return res.status(404).json({ error: 'Kunstner ikke fundet' });
  }

  res.json(artist);
});

// POST en ny kunstner
app.post('/artists', (req, res) => {
  const artists = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
  const newArtist = req.body;

  // Tilføj et unikt id til kunstneren
  newArtist.id = Date.now().toString();

  artists.push(newArtist);
  fs.writeFileSync(dataFilePath, JSON.stringify(artists, null, 2), 'utf-8');
  res.status(201).json(newArtist);
});

// PUT/PATCH en eksisterende kunstner ved ID
app.put('/artists/:id', (req, res) => {
  const artists = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
  const updatedArtist = req.body;
  const existingArtistIndex = artists.findIndex((a) => a.id === req.params.id);

  if (existingArtistIndex === -1) {
    return res.status(404).json({ error: 'Kunstner ikke fundet' });
  }

  artists[existingArtistIndex] = updatedArtist;
  fs.writeFileSync(dataFilePath, JSON.stringify(artists, null, 2), 'utf-8');
  res.json(updatedArtist);
});

// DELETE en kunstner ved ID
app.delete('/artists/:id', (req, res) => {
  const artists = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
  const existingArtistIndex = artists.findIndex((a) => a.id === req.params.id);

  if (existingArtistIndex === -1) {
    return res.status(404).json({ error: 'Kunstner ikke fundet' });
  }

  const deletedArtist = artists.splice(existingArtistIndex, 1)[0];
  fs.writeFileSync(dataFilePath, JSON.stringify(artists, null, 2), 'utf-8');
  res.json(deletedArtist);
});

app.listen(port, () => {
  console.log(`Server kører på port ${port}`);
});
