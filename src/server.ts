import express from "express";

const app = express();

app.get("/games", (request, response) => {
  return response.json([]);
});

app.post("/ads", (request, response) => {
  return response.status(201).json([]);
});

app.get("/games/:id/ads", (request, response) => {
  const gameId = request.params.id;

  // return response.send(gameId);

  return response.json([
    { id: 1, ads: "Anuncio 1" },
    { id: 2, ads: "Anuncio 2" },
    { id: 3, ads: "Anuncio 3" },
    { id: 4, ads: "Anuncio 4" },
    { id: 5, ads: "Anuncio 5" },
  ]);
});

app.get("/ads/:id/discord", (request, response) => {
  const adId = request.params.id;

  // return response.send(gameId);

  return response.json([]);
});

app.listen(3333);
