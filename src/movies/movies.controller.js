const moviesService = require("./movies.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next){
    const movieId = Number(req.params.movieId);
    const movie = await moviesService.read(movieId);
    if (movie) {
        res.locals.movie = movie
        next();
    } else {
        next({status: 404, message: "Movie cannot be found"})
    }
}

async function list(req,res,next){
    const data = await moviesService.list(req.query.is_showing);
    res.json({ data });
}

async function read(req, res, next){
    const data = res.locals.movie;
    res.json({ data });
}

async function readTheater(req, res, next){
    const movieId = Number(req.params.movieId);
    const data = await moviesService.readTheater(movieId);
    res.json({ data });
}

async function readReview(req,res,next){
    const movieId = Number(req.params.movieId);
    const data = await moviesService.movieReview(movieId);
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    readTheater: asyncErrorBoundary(readTheater),
    readReview: asyncErrorBoundary(readReview)
};

