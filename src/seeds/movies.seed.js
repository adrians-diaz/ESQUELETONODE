const mongoose = require("mongoose");
const Movie = require("../api/models/movie.model");

//Vamos a definir un array de peliculas que se ciñan al modelo Movie
const movies = [
  {
    title: "Star Wars",
    year: 1977,
    poster:
      "https://i.etsystatic.com/14140434/r/il/a66d02/1502637303/il_fullxfull.1502637303_mnu2.jpg",
  },
  {
    title: "Top Gun",
    poster: "https://m.media-amazon.com/images/I/616OBt164PL._AC_SY741_.jpg",
  },
  {
    title: "Desafio Total",
    year: 1990,
    poster: "https://image.posterlounge.es/images/big/1875920.jpg"
  },
];

//Con este mapeo creo muchas peliculas del tipo peliculas recorriendo el array de objetos que he definido
const moviesDocuments = movies.map((movie) => new Movie(movie));

//Vamos a realizar la conexión con MONGO para insertar los documentos
mongoose
  .connect("mongodb://localhost:27017/movies", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    //Mediante el metodo find obtendremos un array con todas las peliculas de mi base de datos
    const allMovies = await Movie.find();
    //Si allMovies tiene longitud borraremos la coleccion entera
    if (allMovies.length) {
      await Movie.collection.drop();
      console.log("Movies DB deleted")
    }
  })
  .catch((error) => console.log("Error deleting movies", error))
  //Si no hay peliculas me insertas cuantas tengas en moviesDocument
  .then(async () => {
    await Movie.insertMany(moviesDocuments);
    console.log("Movies DB created")
  })
  .catch((error) => console.log("Error creating movies", error))
  //Al final del todo nos desconectamos de mongoose
  .finally(() => mongoose.disconnect());
