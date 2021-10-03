const { orderBy, queryBuilder } = require("../db/connection");
const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

//adjust is showing = true to show only movie columns
//showing in theaters regardless of the value of the query parameter object
function list(isShowing) {
    return knex("movies as m")
        .select("m.*")
        .modify((queryBuilder) => {
            if(isShowing) {
                queryBuilder
                    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
                    .select("m.*")
                    .where({"mt.is_showing": true})
                    .distinct("m.movie_id")
                    .orderBy("m.movie_id")
            }
    })
}

function read(movieId){
    return knex("movies")
        .select("*")
        .where({movie_id: movieId})
        .first()
}

function movieTheater(movieId) {
    return knex("movies as m")
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
        .join("theaters as t", "t.theater_id", "mt.theater_id")
        .select(
            "t.*",
            "mt.created_at",
            "mt.updated_at",
            "mt.is_showing",
            "m.movie_id"
            )
        .where({"m.movie_id": movieId})
        .where({"mt.is_showing": true})
}


//need to update to add nested critics object
function movieReview(movieId){
    return knex("movies as m")
        .join("reviews as r", "r.movie_id", "m.movie_id")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("r.*")
        .where({"m.movie_id": movieId})
}



 

module.exports = {
    list,
    read,
    movieTheater,
    movieReview

}