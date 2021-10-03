if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router")

app.use("/movies", moviesRouter)


app.use((req, res, next) => {
    next({status: 404, message: `Not found: ${req.originalUrl}`})
})

app.use((error, req, res, next) => {
    const { status = 500, message = "Something went wrong!"} = error;
    res.status(status).json({error: message})
})

module.exports = app;