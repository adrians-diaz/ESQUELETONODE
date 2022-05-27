const { json } = require("express/lib/response");
const Movie = require("../models/movie.model");

const getAllMovies = async(req, res, next) =>{
    try {
        const allMovies = await Movie.find();
        return res.status(200).json(allMovies);
    } catch (error){
        return res.status(500).json(error);
    }
}

const getMovieByID = async(req, res) =>{
    const id = req.params.id;
    try{
        const movieByID = await Movie.findById(id);
    return res.status(200).json(movieByID);
    } catch (error){
        return res.status(500).json(error);
    }
}

const getMovieByTitle = async (req, res) => {
    const title = req.params.title;
    try{
        const movieByTitle = await Movie.find({title: title});
        return res.status(200).json(movieByTitle);
    } catch (error){
        return res.status(500).json(error);
    }
};

module.exports = {getAllMovies, getMovieByID, getMovieByTitle};