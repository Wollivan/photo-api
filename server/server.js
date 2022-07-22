"use scrict";

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const { response } = require("express");

const app = express();

app.use(cors()); //middleware

const PORT = process.env.PORT || 3001;

// photo class
class Photo {
  constructor(obj) {
    this.img_url = obj.urls.regular;
    this.original_image = obj.links.self;
    this.photographer = obj.user.name;
  }
}

// root endpoint (for testing)
app.get("/", (request, response) => {
  console.log(response.data);
  response.json({ name: "Munya", age: 31 });
});

// photo endpoint
app.get("/photos", getPhotos);

// photo endpoint CBF
async function getPhotos(request, response) {
  const searchQuery = request.query.searchQuery; // tesla - localhost:3001/photos?searchQuery=tesla

  const API = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${searchQuery}`;

  try {
    const photoResponse = await axios.get(API);
    const photoArray = photoResponse.data.results.map(
      (photo) => new Photo(photo)
    );
    response.status(200).send(photoArray);
  } catch (err) {
    console.log("error from API", err);
    response.status(500).send("server error");
  }
}

app.get("*", notFound);

function notFound(request, response) {
  response.status(404).send("these are not the droids you're looking for");
}

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
