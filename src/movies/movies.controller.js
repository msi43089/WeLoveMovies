const moviesService = require("./movies.services");

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
    const showing = Boolean(req.query.is_showing)
    const data = await moviesService.list(showing);
    res.json({ data })
}

async function read(req, res, next){
    const data = res.locals.movie
    res.json({ data })
}

async function readTheater(req, res, next){
    const movieId = Number(req.params.movieId)
    const data = await moviesService.movieTheater(movieId)
    res.json({ data })
}

async function readReview(req,res,next){
    const movieId = Number(req.params.movieId)
    const data = await moviesService.movieReview(movieId)
    res.json({ data })
}

module.exports = {
    list,
    read: [movieExists, read],
    readTheater,
    readReview
}

