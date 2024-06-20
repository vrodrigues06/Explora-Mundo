const express = require("express");
const cors = require("cors"); // Importa o pacore cors
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 9000;

app.use(express.json());
app.use(cors()); // Ativa o CORS para todas as rotas e origens

let cities = [
  {
    id: "a7ff",
    cityName: "São Paulo",
    country: "Brasil",
    emoji: "🇧🇷",
    date: "2024-06-14T15:20:23.216Z",
    notes: "Onde eu Moro!",
    position: {
      lat: "-23.553826955799913",
      lng: "-46.63477085732521",
    },
  },
  {
    id: "a821",
    cityName: "Miami",
    country: "Estados Unidos",
    emoji: "🇺🇸",
    date: "2024-06-14T15:22:03.204Z",
    notes: "a Dream",
    position: {
      lat: "25.474486591235365",
      lng: "-80.41962683651477",
    },
  },
];

// Rota para obter a lista de cidades

app.get("/api/cities", (req, res) => {
  res.json(cities);
});

app.get("/api/cities/:id", (req, res) => {
  const city = cities.find((city) => city.id === req.params.id);
  if (city) {
    res.json(city);
  } else {
    res.status(404).json({ message: "Cidade não encontrada" });
  }
});

app.post("/api/cities", (req, res) => {
  const newCity = req.body;
  newCity.id = uuidv4();
  cities.push(newCity);
  res.status(201).json(newCity);
});

app.delete("/api/cities/:id", (req, res) => {
  cities = cities.filter((city) => city.id !== req.params.id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/api/cities`);
});
