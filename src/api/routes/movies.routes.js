const express = require("express");

const router = express.Router();

const {getAllMovies, getMovieByID, getMovieByTitle} = require("../controllers/mongo_movies.controller");

router.get("/", getAllMovies);
router.get("/id/:id", getMovieByID);
router.get("/title/:title", getMovieByTitle);

module.exports = router;