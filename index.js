const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const moviesRoutes = require("./src/api/routes/movies.routes");

const {connect} = require("./src/util/database");
const PORT = process.env.PORT;
const server = express();


connect()

server.use("/movies", moviesRoutes);

server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
})