import express from "express";

const app = express();

app.get("/ads", (request, response) => {
  return response.json([
    { id: 1, ads: "Anuncio 1" },
    { id: 2, ads: "Anuncio 2" },
    { id: 3, ads: "Anuncio 3" },
    { id: 4, ads: "Anuncio 4" },
  ]);
});

app.listen(3333);
